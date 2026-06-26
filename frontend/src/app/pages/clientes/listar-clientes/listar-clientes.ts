import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../../services/cliente';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-listar-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listar-clientes.html',
  styleUrl: './listar-clientes.scss',
  encapsulation: ViewEncapsulation.None // Permite usar estilos globales (modales)
})
export class ListarClientes implements OnInit {

  clientes: any[] = [];          // Lista completa del backend
  clientesFiltrados: any[] = []; // Lista después de aplicar búsqueda
  cargando = true;
  busqueda = '';
  esAdmin = false;     // Determina qué botones mostrar
  esVendedora = false; // La vendedora solo puede crear, no editar ni desactivar

  // Control de modales
  modalFormAbierto = false;
  modalEliminar = false;
  modoEdicion = false;             // true = editar, false = crear
  clienteSeleccionado: any = null; // Cliente siendo editado
  clienteAEliminar: any = null;    // Cliente pendiente de desactivar

  // Campos del formulario
  form: any = {
    tipo: '',
    nombres: '',
    documento: '',
    telefono: '',
    correo: '',
    estado: true
  };

  verInactivos = false; // Controla el toggle Activos/Inactivos

  constructor(
    private clienteService: ClienteService, // Llama al backend
    private auth: Auth,                     // Lee el rol del usuario
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    // Detecta el rol al iniciar para controlar permisos en la vista
    this.esAdmin = this.auth.esAdmin();
    this.esVendedora = this.auth.esVendedora();
    this.cargarClientes();
  }

  cargarClientes() {
    // GET /api/clientes
    this.clienteService.listar().subscribe({
      next: (data) => {
        this.clientes = data;
        this.clientesFiltrados = [...data]; // Copia para no mutar el original
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
    // Busca en nombre, documento o correo
    this.clientesFiltrados = this.clientes.filter(c =>
      c.nombres?.toLowerCase().includes(q) ||
      c.documento?.toLowerCase().includes(q) ||
      c.correo?.toLowerCase().includes(q)
    );
  }

  // Abre el modal en modo CREAR con el form vacío
  abrirNuevo() {
    this.modoEdicion = false;
    this.form = { tipo: '', nombres: '', documento: '', telefono: '', correo: '', estado: true };
    this.modalFormAbierto = true;
    this.document.body.classList.add('modal-open');
    this.cdr.detectChanges();
  }

  // Abre el modal en modo EDITAR con los datos del cliente
  abrirEditar(cliente: any) {
    this.modoEdicion = true;
    this.clienteSeleccionado = cliente;
    this.form = { ...cliente }; // Copia los datos al form
    this.modalFormAbierto = true;
    this.document.body.classList.add('modal-open');
    this.cdr.detectChanges();
  }

  cerrarForm() {
    this.modalFormAbierto = false;
    this.clienteSeleccionado = null;
    this.document.body.classList.remove('modal-open');
    this.cdr.detectChanges();
  }

  guardar() {
    if (this.modoEdicion) {
      // PUT /api/clientes/{id}
      this.clienteService.actualizar(this.clienteSeleccionado.id, this.form).subscribe({
        next: (data) => {
          // Reemplaza solo el cliente modificado en la lista local
          const idx = this.clientes.findIndex(c => c.id === data.id);
          if (idx !== -1) this.clientes[idx] = data;
          this.filtrar();
          this.cerrarForm();
        },
        error: (err) => console.error(err)
      });
    } else {
      // POST /api/clientes
      this.clienteService.guardar(this.form).subscribe({
        next: (data) => {
          this.clientes.unshift(data); // Agrega al inicio de la lista
          this.filtrar();
          this.cerrarForm();
        },
        error: (err) => console.error(err)
      });
    }
  }

  confirmarEliminar(cliente: any) {
    this.clienteAEliminar = cliente;
    this.modalEliminar = true;
    this.document.body.classList.add('modal-open');
    this.cdr.detectChanges();
  }

  eliminar() {
    // DELETE /api/clientes/{id} → en el backend solo cambia estado a false
    this.clienteService.eliminar(this.clienteAEliminar.id).subscribe({
      next: () => {
        // Actualiza el estado localmente sin recargar todo
        const idx = this.clientes.findIndex(c => c.id === this.clienteAEliminar.id);
        if (idx !== -1) this.clientes[idx].estado = false;
        this.filtrar();
        this.modalEliminar = false;
        this.clienteAEliminar = null;
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
    this.clienteAEliminar = null;
    this.document.body.classList.remove('modal-open');
    this.cdr.detectChanges();
  }

  // Solo permite teclas numéricas en campos de documento y teléfono
  soloNumeros(event: KeyboardEvent): boolean {
    return /[0-9]/.test(event.key);
  }

  // Cambia entre ver clientes activos o inactivos
  cambiarVista(inactivos: boolean) {
    this.verInactivos = inactivos;
    this.cdr.detectChanges();
  }

  // Filtra la lista según el toggle Activos/Inactivos
  clientesMostrados(): any[] {
    return this.clientesFiltrados.filter(c =>
      this.verInactivos ? c.estado === false : c.estado === true
    );
  }

  // Reactiva un cliente inactivo → PUT con estado: true
  activar(cliente: any) {
    const actualizado = { ...cliente, estado: true };
    this.clienteService.actualizar(cliente.id, actualizado).subscribe({
      next: (data) => {
        const idx = this.clientes.findIndex(c => c.id === data.id);
        if (idx !== -1) this.clientes[idx].estado = true;
        this.filtrar();
        this.cdr.detectChanges();
      }
    });
  }
}