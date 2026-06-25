import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../../services/cliente';

@Component({
  selector: 'app-listar-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listar-clientes.html',
  styleUrl: './listar-clientes.scss',
  encapsulation: ViewEncapsulation.None
})
export class ListarClientes implements OnInit {

  clientes: any[] = [];
  clientesFiltrados: any[] = [];
  cargando = true;
  busqueda = '';

  modalFormAbierto = false;
  modalEliminar = false;
  modoEdicion = false;
  clienteSeleccionado: any = null;
  clienteAEliminar: any = null;

  form: any = {
    tipo: '',
    nombres: '',
    documento: '',
    telefono: '',
    correo: '',
    estado: true
  };

  constructor(
    private clienteService: ClienteService,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    this.cargarClientes();
  }

  cargarClientes() {
    this.clienteService.listar().subscribe({
      next: (data) => {
        this.clientes = data;
        this.clientesFiltrados = [...data];
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
    this.clientesFiltrados = this.clientes.filter(c =>
      c.nombres?.toLowerCase().includes(q) ||
      c.documento?.toLowerCase().includes(q) ||
      c.correo?.toLowerCase().includes(q)
    );
  }

  abrirNuevo() {
    this.modoEdicion = false;
    this.form = { tipo: '', nombres: '', documento: '', telefono: '', correo: '', estado: true };
    this.modalFormAbierto = true;
    this.document.body.classList.add('modal-open');
    this.cdr.detectChanges();
  }

  abrirEditar(cliente: any) {
    this.modoEdicion = true;
    this.clienteSeleccionado = cliente;
    this.form = { ...cliente };
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
      this.clienteService.actualizar(this.clienteSeleccionado.id, this.form).subscribe({
        next: (data) => {
          const idx = this.clientes.findIndex(c => c.id === data.id);
          if (idx !== -1) this.clientes[idx] = data;
          this.filtrar();
          this.cerrarForm();
        },
        error: (err) => console.error(err)
      });
    } else {
      this.clienteService.guardar(this.form).subscribe({
        next: (data) => {
          this.clientes.unshift(data);
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
    this.clienteService.eliminar(this.clienteAEliminar.id).subscribe({
      next: () => {
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

  soloNumeros(event: KeyboardEvent): boolean {
    return /[0-9]/.test(event.key);
  }

  verInactivos = false;

  cambiarVista(inactivos: boolean) {
    this.verInactivos = inactivos;
    this.cdr.detectChanges();
  }

  clientesMostrados(): any[] {
    return this.clientesFiltrados.filter(c =>
      this.verInactivos ? c.estado === false : c.estado === true
    );
  }

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