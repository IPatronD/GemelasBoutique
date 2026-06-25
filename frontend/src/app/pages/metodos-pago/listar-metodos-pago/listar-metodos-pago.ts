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

  metodos: any[] = [];
  metodosFiltrados: any[] = [];
  cargando = true;
  busqueda = '';

  modalFormAbierto = false;
  modalEliminar = false;
  modoEdicion = false;
  metodoSeleccionado: any = null;
  metodoAEliminar: any = null;

  form: any = { nombre: '', descripcion: '' };

  constructor(
    private metodoPagoService: MetodoPagoService,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    this.cargarMetodos();
  }

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

  filtrar() {
    const q = this.busqueda.toLowerCase();
    this.metodosFiltrados = this.metodos.filter(m =>
      m.nombre?.toLowerCase().includes(q) ||
      m.descripcion?.toLowerCase().includes(q)
    );
  }

  abrirNuevo() {
    this.modoEdicion = false;
    this.form = { nombre: '', descripcion: '' };
    this.modalFormAbierto = true;
    this.document.body.classList.add('modal-open');
    this.cdr.detectChanges();
  }

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

  cerrarForm() {
    this.modalFormAbierto = false;
    this.metodoSeleccionado = null;
    this.document.body.classList.remove('modal-open');
    this.cdr.detectChanges();
  }

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

  confirmarEliminar(metodo: any) {
    this.metodoAEliminar = metodo;
    this.modalEliminar = true;
    this.document.body.classList.add('modal-open');
    this.cdr.detectChanges();
  }

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

  cancelarEliminar() {
    this.modalEliminar = false;
    this.metodoAEliminar = null;
    this.document.body.classList.remove('modal-open');
    this.cdr.detectChanges();
  }
}