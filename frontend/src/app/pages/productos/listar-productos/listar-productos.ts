import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../../services/producto';
import { CategoriaService } from '../../../services/categoria';

@Component({
  selector: 'app-listar-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listar-productos.html',
  styleUrl: './listar-productos.scss',
  encapsulation: ViewEncapsulation.None
})
export class ListarProductos implements OnInit {

  productos: any[] = [];
  productosFiltrados: any[] = [];
  categorias: any[] = [];
  cargando = true;
  busqueda = '';
  filtroCategoria = '';

  modalFormAbierto = false;
  modalEliminar = false;
  modoEdicion = false;
  productoSeleccionado: any = null;
  productoAEliminar: any = null;

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
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    this.cargarCategorias();
    this.cargarProductos();
  }

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

  cargarCategorias() {
    this.categoriaService.listar().subscribe({
      next: (data) => this.categorias = data,
      error: (err) => console.error(err)
    });
  }

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

  abrirNuevo() {
    this.modoEdicion = false;
    this.form = { nombre: '', descripcion: '', precio: null, stock: null, categoria: null };
    this.modalFormAbierto = true;
    this.document.body.classList.add('modal-open');
    this.cdr.detectChanges();
  }

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

  cerrarForm() {
    this.modalFormAbierto = false;
    this.productoSeleccionado = null;
    this.document.body.classList.remove('modal-open');
    this.cdr.detectChanges();
  }

  getCategoriaSeleccionada(): any {
    return this.categorias.find(c => c.id == this.form.categoria?.id) || null;
  }

  guardar() {
    const payload = {
      ...this.form,
      categoria: { id: this.form.categoria?.id || this.form.categoria }
    };

    if (this.modoEdicion) {
      this.productoService.actualizar(this.productoSeleccionado.id, payload).subscribe({
        next: () => {
          this.cargarProductos();
          this.cerrarForm();
        },
        error: (err) => console.error(err)
      });
    } else {
      this.productoService.guardar(payload).subscribe({
        next: () => {
          this.cargarProductos();
          this.cerrarForm();
        },
        error: (err) => console.error(err)
      });
    }
  }

  confirmarEliminar(producto: any) {
    this.productoAEliminar = producto;
    this.modalEliminar = true;
    this.document.body.classList.add('modal-open');
    this.cdr.detectChanges();
  }

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

  cancelarEliminar() {
    this.modalEliminar = false;
    this.productoAEliminar = null;
    this.document.body.classList.remove('modal-open');
    this.cdr.detectChanges();
  }

  getStockClass(stock: number): string {
    if (stock <= 0) return 'stock-agotado';
    if (stock <= 5) return 'stock-bajo';
    return 'stock-ok';
  }

  compararCategoria(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}