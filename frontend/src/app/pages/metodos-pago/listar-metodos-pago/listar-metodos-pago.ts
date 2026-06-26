import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MetodoPagoService } from '../../../services/metodo-pago';

@Component({
  selector: 'app-listar-metodos-pago',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listar-metodos-pago.html',
  styleUrl: './listar-metodos-pago.scss',
  encapsulation: ViewEncapsulation.None
})
export class ListarMetodosPago implements OnInit {

  // Lista completa y lista filtrada de métodos de pago
  metodos: any[] = [];
  metodosFiltrados: any[] = [];

  // Estado de carga
  cargando = true;

  // Texto de búsqueda
  busqueda = '';

  // Control de modales
  modalFormAbierto = false;
  modalEliminar = false;
  modoEdicion = false;

  // Método que se está editando o eliminando
  metodoSeleccionado: any = null;
  metodoAEliminar: any = null;

  // Datos del formulario
  form: any = { nombre: '', descripcion: '' };

  constructor(
    private metodoPagoService: MetodoPagoService,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    this.cargarMetodos();
  }

  // Trae todos los métodos de pago del backend
  cargarMetodos() {
    this.metodoPagoService.listar().subscribe({
      next: (data) => {
        this.metodos = data;
        this.filtrar();
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  // Filtra por nombre o descripción
  filtrar() {
    const q = this.busqueda.toLowerCase();
    this.metodosFiltrados = this.metodos.filter(m =>
      m.nombre?.toLowerCase().includes(q) ||
      m.descripcion?.toLowerCase().includes(q)
    );
  }

  // Abre el modal para crear un nuevo método
  abrirNuevo() {
    this.modoEdicion = false;
    this.form = { nombre: '', descripcion: '' };
    this.modalFormAbierto = true;
    this.document.body.classList.add('modal-open');
    this.cdr.detectChanges();
  }

  // Abre el modal con los datos del método a editar
  abrirEditar(metodo: any) {
    this.modoEdicion = true;
    this.metodoSeleccionado = metodo;
    this.form = {
      nombre: metodo.nombre,
      descripcion: metodo.descripcion || ''
    };
    this.modalFormAbierto = true;
    this.document.body.classList.add('modal-open');
    this.cdr.detectChanges();
  }

  // Cierra el modal del formulario
  cerrarForm() {
    this.modalFormAbierto = false;
    this.metodoSeleccionado = null;
    this.document.body.classList.remove('modal-open');
    this.cdr.detectChanges();
  }

  // Guarda o actualiza según el modo
  guardar() {
    if (this.modoEdicion) {
      this.metodoPagoService.actualizar(this.metodoSeleccionado.id, this.form).subscribe({
        next: (data) => {
          const idx = this.metodos.findIndex(m => m.id === data.id);
          if (idx !== -1) this.metodos[idx] = data;
          this.filtrar();
          this.cerrarForm();
        },
        error: (err) => console.error(err)
      });
    } else {
      this.metodoPagoService.guardar(this.form).subscribe({
        next: (data) => {
          this.metodos.push(data);
          this.filtrar();
          this.cerrarForm();
        },
        error: (err) => console.error(err)
      });
    }
  }

  // Abre el modal de confirmación para eliminar
  confirmarEliminar(metodo: any) {
    this.metodoAEliminar = metodo;
    this.modalEliminar = true;
    this.document.body.classList.add('modal-open');
    this.cdr.detectChanges();
  }

  // Elimina el método del backend y lo quita de la lista
  eliminar() {
    this.metodoPagoService.eliminar(this.metodoAEliminar.id).subscribe({
      next: () => {
        this.metodos = this.metodos.filter(m => m.id !== this.metodoAEliminar.id);
        this.filtrar();
        this.modalEliminar = false;
        this.metodoAEliminar = null;
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
    this.metodoAEliminar = null;
    this.document.body.classList.remove('modal-open');
    this.cdr.detectChanges();
  }
}