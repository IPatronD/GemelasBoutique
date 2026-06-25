import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmpleadoService } from '../../../services/empleado';

@Component({
  selector: 'app-listar-empleados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listar-empleados.html',
  styleUrl: './listar-empleados.scss',
  encapsulation: ViewEncapsulation.None
})
export class ListarEmpleados implements OnInit {

  empleados: any[] = [];
  empleadosFiltrados: any[] = [];
  cargando = true;
  busqueda = '';
  verInactivos = false;

  modalFormAbierto = false;
  modoEdicion = false;
  empleadoSeleccionado: any = null;
  empleadoADesactivar: any = null;
  modalDesactivar = false;

  form: any = {
    nombres: '',
    apellidos: '',
    dni: '',
    correo: '',
    estado: true
  };

  constructor(
    private empleadoService: EmpleadoService,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    this.cargarEmpleados();
  }

  cargarEmpleados() {
    this.empleadoService.listar().subscribe({
      next: (data) => {
        this.empleados = data;
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
    this.empleadosFiltrados = this.empleados.filter(e => {
      const coincide =
        e.nombres?.toLowerCase().includes(q) ||
        e.apellidos?.toLowerCase().includes(q) ||
        e.dni?.toLowerCase().includes(q) ||
        e.correo?.toLowerCase().includes(q);
      const estadoOk = this.verInactivos ? e.estado === false : e.estado === true;
      return coincide && estadoOk;
    });
  }

  cambiarVista(inactivos: boolean) {
    this.verInactivos = inactivos;
    this.filtrar();
    this.cdr.detectChanges();
  }

  tieneUsuario(empleado: any): boolean {
    return !!empleado.usuario;
  }

  abrirNuevo() {
    this.modoEdicion = false;
    this.form = { nombres: '', apellidos: '', dni: '', correo: '', estado: true };
    this.modalFormAbierto = true;
    this.document.body.classList.add('modal-open');
    this.cdr.detectChanges();
  }

  abrirEditar(empleado: any) {
    this.modoEdicion = true;
    this.empleadoSeleccionado = empleado;
    this.form = {
      nombres: empleado.nombres,
      apellidos: empleado.apellidos,
      dni: empleado.dni,
      correo: empleado.correo,
      estado: empleado.estado
    };
    this.modalFormAbierto = true;
    this.document.body.classList.add('modal-open');
    this.cdr.detectChanges();
  }

  cerrarForm() {
    this.modalFormAbierto = false;
    this.empleadoSeleccionado = null;
    this.document.body.classList.remove('modal-open');
    this.cdr.detectChanges();
  }

  soloNumeros(event: KeyboardEvent): boolean {
    return /[0-9]/.test(event.key);
  }

  guardar() {
    if (this.modoEdicion) {
      this.empleadoService.actualizar(this.empleadoSeleccionado.id, this.form).subscribe({
        next: () => { this.cargarEmpleados(); this.cerrarForm(); },
        error: (err) => console.error(err)
      });
    } else {
      this.empleadoService.guardar(this.form).subscribe({
        next: () => { this.cargarEmpleados(); this.cerrarForm(); },
        error: (err) => console.error(err)
      });
    }
  }

  confirmarDesactivar(empleado: any) {
    this.empleadoADesactivar = empleado;
    this.modalDesactivar = true;
    this.document.body.classList.add('modal-open');
    this.cdr.detectChanges();
  }

  desactivar() {
    this.empleadoService.eliminar(this.empleadoADesactivar.id).subscribe({
      next: () => {
        const idx = this.empleados.findIndex(e => e.id === this.empleadoADesactivar.id);
        if (idx !== -1) this.empleados[idx].estado = false;
        this.filtrar();
        this.modalDesactivar = false;
        this.empleadoADesactivar = null;
        this.document.body.classList.remove('modal-open');
        this.cdr.detectChanges();
      },
      error: () => {
        this.modalDesactivar = false;
        this.document.body.classList.remove('modal-open');
        this.cdr.detectChanges();
      }
    });
  }

  cancelarDesactivar() {
    this.modalDesactivar = false;
    this.empleadoADesactivar = null;
    this.document.body.classList.remove('modal-open');
    this.cdr.detectChanges();
  }

  activar(empleado: any) {
    const payload = { ...empleado, estado: true };
    this.empleadoService.actualizar(empleado.id, payload).subscribe({
      next: () => {
        const idx = this.empleados.findIndex(e => e.id === empleado.id);
        if (idx !== -1) this.empleados[idx].estado = true;
        this.filtrar();
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }
}