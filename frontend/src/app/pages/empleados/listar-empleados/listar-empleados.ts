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

  // Lista completa y lista filtrada de empleados
  empleados: any[] = [];
  empleadosFiltrados: any[] = [];

  // Estado de carga
  cargando = true;

  // Texto de búsqueda
  busqueda = '';

  // Controla si se ven activos o inactivos
  verInactivos = false;

  // Control de modales
  modalFormAbierto = false;
  modoEdicion = false;

  // Empleado que se está editando o desactivando
  empleadoSeleccionado: any = null;
  empleadoADesactivar: any = null;
  modalDesactivar = false;

  // Datos del formulario
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

  // Trae todos los empleados del backend
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

  // Filtra por nombre, apellido, DNI o correo y por estado activo/inactivo
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

  // Cambia entre ver activos e inactivos
  cambiarVista(inactivos: boolean) {
    this.verInactivos = inactivos;
    this.filtrar();
    this.cdr.detectChanges();
  }

  // Verifica si el empleado ya tiene usuario asignado
  tieneUsuario(empleado: any): boolean {
    return !!empleado.usuario;
  }

  // Abre el modal para crear un nuevo empleado
  abrirNuevo() {
    this.modoEdicion = false;
    this.form = { nombres: '', apellidos: '', dni: '', correo: '', estado: true };
    this.modalFormAbierto = true;
    this.document.body.classList.add('modal-open');
    this.cdr.detectChanges();
  }

  // Abre el modal con los datos del empleado a editar
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

  // Cierra el modal del formulario
  cerrarForm() {
    this.modalFormAbierto = false;
    this.empleadoSeleccionado = null;
    this.document.body.classList.remove('modal-open');
    this.cdr.detectChanges();
  }

  // Permite solo números en el campo DNI
  soloNumeros(event: KeyboardEvent): boolean {
    return /[0-9]/.test(event.key);
  }

  // Guarda o actualiza según el modo
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

  // Abre el modal de confirmación para desactivar
  confirmarDesactivar(empleado: any) {
    this.empleadoADesactivar = empleado;
    this.modalDesactivar = true;
    this.document.body.classList.add('modal-open');
    this.cdr.detectChanges();
  }

  // Desactiva el empleado en el backend y actualiza la lista
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

  // Cancela la desactivación y cierra el modal
  cancelarDesactivar() {
    this.modalDesactivar = false;
    this.empleadoADesactivar = null;
    this.document.body.classList.remove('modal-open');
    this.cdr.detectChanges();
  }

  // Reactiva un empleado inactivo
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