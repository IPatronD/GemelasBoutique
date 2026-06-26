import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriaService } from '../../../services/categoria';

@Component({
  selector: 'app-listar-categorias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listar-categorias.html',
  styleUrl: './listar-categorias.scss',
  encapsulation: ViewEncapsulation.None // Permite que los estilos globales (modales) funcionen
})
export class ListarCategorias implements OnInit {

  categorias: any[] = [];          // Lista completa de categorías del backend
  categoriasFiltradas: any[] = []; // Lista filtrada por búsqueda
  cargando = true;                 // Controla el spinner
  busqueda = '';                   // Texto del buscador

  // Control de modales
  modalFormAbierto = false;
  modalEliminar = false;
  modoEdicion = false;             // true = editar, false = crear
  categoriaSeleccionada: any = null;  // Categoría en edición
  categoriaAEliminar: any = null;     // Categoría pendiente de eliminar

  // Campos del formulario
  form: any = { nombre: '', descripcion: '' };

  constructor(
    private categoriaService: CategoriaService, // Llama al backend
    private cdr: ChangeDetectorRef,             // Fuerza actualización de vista
    @Inject(DOCUMENT) private document: Document // Para manejar el body (modales)
  ) { }

  // Se ejecuta al abrir la pantalla
  ngOnInit() {
    this.cargarCategorias();
  }

  cargarCategorias() {
    // GET /api/categorias
    this.categoriaService.listar().subscribe({
      next: (data) => {
        this.categorias = data;
        this.filtrar(); // Aplica filtro inicial
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  filtrar() {
    const q = this.busqueda.toLowerCase();
    // Filtra por nombre o descripción
    this.categoriasFiltradas = this.categorias.filter(c =>
      c.nombre?.toLowerCase().includes(q) ||
      c.descripcion?.toLowerCase().includes(q)
    );
  }

  // Abre el modal en modo CREAR
  abrirNuevo() {
    this.modoEdicion = false;
    this.form = { nombre: '', descripcion: '' }; // Limpia el form
    this.modalFormAbierto = true;
    this.document.body.classList.add('modal-open');
    this.cdr.detectChanges();
  }

  // Abre el modal en modo EDITAR con los datos de la categoría
  abrirEditar(categoria: any) {
    this.modoEdicion = true;
    this.categoriaSeleccionada = categoria;
    this.form = { nombre: categoria.nombre, descripcion: categoria.descripcion };
    this.modalFormAbierto = true;
    this.document.body.classList.add('modal-open');
    this.cdr.detectChanges();
  }

  cerrarForm() {
    this.modalFormAbierto = false;
    this.categoriaSeleccionada = null;
    this.document.body.classList.remove('modal-open');
    this.cdr.detectChanges();
  }

  guardar() {
    if (this.modoEdicion) {
      // PUT /api/categorias/{id}
      this.categoriaService.actualizar(this.categoriaSeleccionada.id, this.form).subscribe({
        next: (data) => {
          // Actualiza solo el elemento modificado en la lista local
          const idx = this.categorias.findIndex(c => c.id === data.id);
          if (idx !== -1) this.categorias[idx] = data;
          this.filtrar();
          this.cerrarForm();
        },
        error: (err) => console.error(err)
      });
    } else {
      // POST /api/categorias
      this.categoriaService.guardar(this.form).subscribe({
        next: (data) => {
          this.categorias.push(data); // Agrega la nueva al final de la lista
          this.filtrar();
          this.cerrarForm();
        },
        error: (err) => console.error(err)
      });
    }
  }

  // Abre el modal de confirmación para eliminar
  confirmarEliminar(categoria: any) {
    this.categoriaAEliminar = categoria;
    this.modalEliminar = true;
    this.document.body.classList.add('modal-open');
    this.cdr.detectChanges();
  }

  eliminar() {
    // DELETE /api/categorias/{id}
    this.categoriaService.eliminar(this.categoriaAEliminar.id).subscribe({
      next: () => {
        // Elimina de la lista local sin recargar todo
        this.categorias = this.categorias.filter(c => c.id !== this.categoriaAEliminar.id);
        this.filtrar();
        this.modalEliminar = false;
        this.categoriaAEliminar = null;
        this.document.body.classList.remove('modal-open');
        this.cdr.detectChanges();
      },
      error: () => {
        // Si falla (ej: tiene productos asociados), solo cierra el modal
        this.modalEliminar = false;
        this.document.body.classList.remove('modal-open');
        this.cdr.detectChanges();
      }
    });
  }

  cancelarEliminar() {
    this.modalEliminar = false;
    this.categoriaAEliminar = null;
    this.document.body.classList.remove('modal-open');
    this.cdr.detectChanges();
  }
}