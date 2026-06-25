import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario';
import { EmpleadoService } from '../../../services/empleado';
import { RolService } from '../../../services/rol';

@Component({
  selector: 'app-listar-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listar-usuarios.html',
  styleUrl: './listar-usuarios.scss',
  encapsulation: ViewEncapsulation.None
})
export class ListarUsuarios implements OnInit {

  usuarios: any[] = [];
  usuariosFiltrados: any[] = [];
  empleados: any[] = [];
  roles: any[] = [];
  cargando = true;
  busqueda = '';
  verInactivos = false;

  modalFormAbierto = false;
  modalEliminar = false;
  modoEdicion = false;
  usuarioSeleccionado: any = null;
  usuarioAEliminar: any = null;

  form: any = {
    username: '',
    password: '',
    estado: true,
    empleado: null,
    roles: []
  };

  constructor(
    private usuarioService: UsuarioService,
    private empleadoService: EmpleadoService,
    private rolService: RolService,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    this.cargarTodo();
  }

  cargarTodo() {
    this.rolService.listar().subscribe(data => this.roles = data);
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService.listar().subscribe({
      next: (data) => {
        this.usuarios = data;
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
    this.usuariosFiltrados = this.usuarios.filter(u => {
      const coincide = u.username?.toLowerCase().includes(q) ||
        u.empleado?.nombres?.toLowerCase().includes(q);
      const estadoOk = this.verInactivos ? u.estado === false : u.estado === true;
      return coincide && estadoOk;
    });
  }

  cambiarVista(inactivos: boolean) {
    this.verInactivos = inactivos;
    this.filtrar();
    this.cdr.detectChanges();
  }

  getRoles(usuario: any): string {
    return usuario.roles?.map((r: any) => r.nombre).join(', ') || '-';
  }

  rolSeleccionado(rol: any): boolean {
    return this.form.roles?.some((r: any) => r.id === rol.id);
  }

  toggleRol(rol: any) {
    const idx = this.form.roles?.findIndex((r: any) => r.id === rol.id);
    if (idx === -1) {
      this.form.roles = [rol]; // reemplaza, no agrega
    } else {
      this.form.roles = [];
    }
  }

  abrirNuevo() {
    this.modoEdicion = false;
    this.form = { username: '', password: '', estado: true, empleado: null, roles: [] };
    this.empleadoService.listarSinUsuario().subscribe(data => this.empleados = data);
    this.modalFormAbierto = true;
    this.document.body.classList.add('modal-open');
    this.cdr.detectChanges();
  }

  abrirEditar(usuario: any) {
    this.modoEdicion = true;
    this.usuarioSeleccionado = usuario;
    this.form = {
      username: usuario.username,
      password: '',
      estado: usuario.estado,
      empleado: usuario.empleado,
      roles: [...(usuario.roles || [])]
    };
    this.modalFormAbierto = true;
    this.document.body.classList.add('modal-open');
    this.cdr.detectChanges();
  }

  cerrarForm() {
    this.modalFormAbierto = false;
    this.usuarioSeleccionado = null;
    this.document.body.classList.remove('modal-open');
    this.cdr.detectChanges();
  }

  guardar() {
    console.log('form.empleado:', this.form.empleado);
    console.log('empleado id:', this.form.empleado?.id);

    const payload: any = {
      username: this.form.username,
      password: this.form.password,
      estado: this.form.estado,
      empleado: { id: this.form.empleado?.id },
      roles: this.form.roles.map((r: any) => ({ id: r.id }))
    };

    console.log('payload:', JSON.stringify(payload));

    if (this.modoEdicion) {
      if (!payload.password) delete payload.password;
      this.usuarioService.actualizar(this.usuarioSeleccionado.id, payload).subscribe({
        next: () => { this.cargarUsuarios(); this.cerrarForm(); },
        error: (err) => console.error(err)
      });
    } else {
      this.usuarioService.guardar(payload).subscribe({
        next: () => { this.cargarUsuarios(); this.cerrarForm(); },
        error: (err) => console.error(err)
      });
    }
  }

  desactivar(usuario: any) {
    const payload = { ...usuario, estado: false, roles: usuario.roles?.map((r: any) => ({ id: r.id })), empleado: { id: usuario.empleado?.id } };
    this.usuarioService.actualizar(usuario.id, payload).subscribe({
      next: () => { this.cargarUsuarios(); this.cdr.detectChanges(); },
      error: (err) => console.error(err)
    });
  }

  activar(usuario: any) {
    const payload = { ...usuario, estado: true, roles: usuario.roles?.map((r: any) => ({ id: r.id })), empleado: { id: usuario.empleado?.id } };
    this.usuarioService.actualizar(usuario.id, payload).subscribe({
      next: () => { this.cargarUsuarios(); this.cdr.detectChanges(); },
      error: (err) => console.error(err)
    });
  }

  confirmarEliminar(usuario: any) {
    this.usuarioAEliminar = usuario;
    this.modalEliminar = true;
    this.document.body.classList.add('modal-open');
    this.cdr.detectChanges();
  }

  eliminar() {
    this.usuarioService.eliminar(this.usuarioAEliminar.id).subscribe({
      next: () => {
        this.usuarios = this.usuarios.filter(u => u.id !== this.usuarioAEliminar.id);
        this.filtrar();
        this.modalEliminar = false;
        this.usuarioAEliminar = null;
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
    this.usuarioAEliminar = null;
    this.document.body.classList.remove('modal-open');
    this.cdr.detectChanges();
  }

  compararObj(o1: any, o2: any): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  
}