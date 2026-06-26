import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../../services/producto';
import { CategoriaService } from '../../../services/categoria';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-listar-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listar-productos.html',
  styleUrl: './listar-productos.scss',
  encapsulation: ViewEncapsulation.None
})
export class ListarProductos implements OnInit {

  // Lista completa y lista filtrada de productos
  productos: any[] = [];
  productosFiltrados: any[] = [];

  // Lista de categorías para el filtro y el formulario
  categorias: any[] = [];

  // Estado de carga
  cargando = true;

  // Texto de búsqueda y categoría seleccionada en el filtro
  busqueda = '';
  filtroCategoria = '';

  // Permisos según el rol del usuario
  esAdmin = false;
  esSupervisora = false;

  // Control de modales
  modalFormAbierto = false;
  modalEliminar = false;
  modoEdicion = false;

  // Producto que se está editando o eliminando
  productoSeleccionado: any = null;
  productoAEliminar: any = null;

  // Datos del formulario
  form: any = {
    nombre: '',
    descripcion: '',
    precio: null,
    stock: null,
    categoria: null
  };

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private auth: Auth,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    // Detecta el rol para mostrar u ocultar botones
    this.esAdmin = this.auth.esAdmin();
    this.esSupervisora = this.auth.esSupervisora();
    this.cargarCategorias();
    this.cargarProductos();
  }

  // Trae todos los productos del backend
  cargarProductos() {
    this.productoService.listar().subscribe({
      next: (data) => {
        this.productos = data;
        this.productosFiltrados = [...data];
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  // Trae las categorías para el select del formulario y el filtro
  cargarCategorias() {
    this.categoriaService.listar().subscribe({
      next: (data) => this.categorias = data,
      error: (err) => console.error(err)
    });
  }

  // Filtra por nombre y categoría
  filtrar() {
    const q = this.busqueda.toLowerCase();
    this.productosFiltrados = this.productos.filter(p => {
      const coincideNombre = p.nombre?.toLowerCase().includes(q);
      const coincideCategoria = this.filtroCategoria
        ? p.categoria?.id == this.filtroCategoria
        : true;
      return coincideNombre && coincideCategoria;
    });
  }

  // Abre el modal para crear un nuevo producto
  abrirNuevo() {
    this.modoEdicion = false;
    this.form = { nombre: '', descripcion: '', precio: null, stock: null, categoria: null };
    this.modalFormAbierto = true;
    this.document.body.classList.add('modal-open');
    this.cdr.detectChanges();
  }

  // Abre el modal con los datos del producto a editar
  abrirEditar(producto: any) {
    this.modoEdicion = true;
    this.productoSeleccionado = producto;
    this.form = {
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      stock: producto.stock,
      categoria: producto.categoria
    };
    this.modalFormAbierto = true;
    this.document.body.classList.add('modal-open');
    this.cdr.detectChanges();
  }

  // Cierra el modal del formulario
  cerrarForm() {
    this.modalFormAbierto = false;
    this.productoSeleccionado = null;
    this.document.body.classList.remove('modal-open');
    this.cdr.detectChanges();
  }

  // Guarda o actualiza según el modo
  guardar() {
    const payload = {
      ...this.form,
      categoria: { id: this.form.categoria?.id || this.form.categoria }
    };

    if (this.modoEdicion) {
      this.productoService.actualizar(this.productoSeleccionado.id, payload).subscribe({
        next: () => { this.cargarProductos(); this.cerrarForm(); },
        error: (err) => console.error(err)
      });
    } else {
      this.productoService.guardar(payload).subscribe({
        next: () => { this.cargarProductos(); this.cerrarForm(); },
        error: (err) => console.error(err)
      });
    }
  }

  // Abre el modal de confirmación para eliminar
  confirmarEliminar(producto: any) {
    this.productoAEliminar = producto;
    this.modalEliminar = true;
    this.document.body.classList.add('modal-open');
    this.cdr.detectChanges();
  }

  // Elimina el producto del backend y lo quita de la lista
  eliminar() {
    this.productoService.eliminar(this.productoAEliminar.id).subscribe({
      next: () => {
        this.productos = this.productos.filter(p => p.id !== this.productoAEliminar.id);
        this.filtrar();
        this.modalEliminar = false;
        this.productoAEliminar = null;
        this.document.body.classList.remove('modal-open');
        this.cdr.detectChanges();
      },
      error: () => {
        this.modalEliminar = false;
        this.document.body.classList.remove('modal-open');
        this.cdr.detectChanges();
      }
    });
  }

  // Cancela la eliminación y cierra el modal
  cancelarEliminar() {
    this.modalEliminar = false;
    this.productoAEliminar = null;
    this.document.body.classList.remove('modal-open');
    this.cdr.detectChanges();
  }

  // Devuelve la clase CSS según el nivel de stock
  getStockClass(stock: number): string {
    if (stock <= 0) return 'stock-agotado';
    if (stock <= 5) return 'stock-bajo';
    return 'stock-ok';
  }

  // Compara categorías por id para el select del formulario
  compararCategoria(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}