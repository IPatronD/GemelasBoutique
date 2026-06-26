import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../../services/auth';
import { UsuarioService } from '../../../services/usuario';
import { EmpleadoService } from '../../../services/empleado';

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mi-perfil.html',
  styleUrl: './mi-perfil.scss',
  encapsulation: ViewEncapsulation.None
})
export class MiPerfil implements OnInit {

  // Datos del usuario logueado
  perfil: any = null;
  cargando = true;

  // Control del modal de cambiar contraseña
  modalPassword = false;
  formPassword: any = { nueva: '', confirmar: '' };
  errorPassword = '';
  exitoPassword = false;

  // Control del modal de editar perfil
  modalEditar = false;
  formEditar: any = { nombres: '', apellidos: '', correo: '', username: '' };
  errorEditar = '';
  exitoEditar = false;

  constructor(
    private auth: Auth,
    private usuarioService: UsuarioService,
    private empleadoService: EmpleadoService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.cargarPerfil();
  }

  // Trae los datos del usuario logueado desde el backend
  cargarPerfil() {
    this.auth.me().subscribe({
      next: (data) => {
        this.perfil = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  // Convierte el rol técnico a un nombre legible
  getRolLabel(): string {
    const roles: any = {
      'ROLE_ADMIN': 'Administrador',
      'ROLE_SUPERVISORA': 'Supervisora',
      'ROLE_VENDEDORA': 'Vendedora'
    };
    return roles[this.perfil?.rol] || this.perfil?.rol;
  }

  // ── CAMBIAR CONTRASEÑA ──

  // Abre el modal de cambiar contraseña
  abrirCambiarPassword() {
    this.formPassword = { nueva: '', confirmar: '' };
    this.errorPassword = '';
    this.exitoPassword = false;
    this.modalPassword = true;
    this.cdr.detectChanges();
  }

  // Cierra el modal de cambiar contraseña
  cerrarPassword() {
    this.modalPassword = false;
    this.cdr.detectChanges();
  }

  // Valida y envía la nueva contraseña al backend
  cambiarPassword() {
    this.errorPassword = '';
    this.exitoPassword = false;

    // Valida mínimo 6 caracteres
    if (!this.formPassword.nueva || this.formPassword.nueva.length < 6) {
      this.errorPassword = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    // Valida que ambas contraseñas coincidan
    if (this.formPassword.nueva !== this.formPassword.confirmar) {
      this.errorPassword = 'Las contraseñas no coinciden.';
      return;
    }

    const payload = {
      username: this.perfil.username,
      password: this.formPassword.nueva,
      estado: true,
      empleado: { id: this.perfil.empleado.id },
      roles: [{ id: this.perfil.rolId }]
    };

    this.usuarioService.actualizar(this.perfil.id, payload).subscribe({
      next: () => {
        this.exitoPassword = true;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorPassword = 'Error al cambiar la contraseña.';
        this.cdr.detectChanges();
      }
    });
  }

  // ── EDITAR PERFIL ──

  // Abre el modal con los datos actuales del perfil
  abrirEditar() {
    this.formEditar = {
      nombres: this.perfil.empleado.nombres,
      apellidos: this.perfil.empleado.apellidos,
      correo: this.perfil.empleado.correo,
      username: this.perfil.username
    };
    this.errorEditar = '';
    this.exitoEditar = false;
    this.modalEditar = true;
    this.cdr.detectChanges();
  }

  // Cierra el modal de editar perfil
  cerrarEditar() {
    this.modalEditar = false;
    this.cdr.detectChanges();
  }

  // Guarda los cambios del perfil: primero actualiza el empleado, luego el usuario
  guardarPerfil() {
    this.errorEditar = '';

    const payloadEmpleado = {
      nombres: this.formEditar.nombres,
      apellidos: this.formEditar.apellidos,
      correo: this.formEditar.correo,
      dni: this.perfil.empleado.dni,
      estado: true
    };

    // Actualiza los datos del empleado
    this.empleadoService.actualizar(this.perfil.empleado.id, payloadEmpleado).subscribe({
      next: () => {
        const payloadUsuario = {
          username: this.formEditar.username,
          estado: true,
          empleado: { id: this.perfil.empleado.id },
          roles: [{ id: this.perfil.rolId }]
        };

        // Actualiza el username del usuario
        this.usuarioService.actualizar(this.perfil.id, payloadUsuario).subscribe({
          next: () => {
            this.exitoEditar = true;
            this.cdr.detectChanges();

            // Si cambió el username, cierra sesión por seguridad
            if (this.formEditar.username !== this.perfil.username) {
              setTimeout(() => {
                alert('Username actualizado. Por seguridad, vuelve a iniciar sesión.');
                this.auth.logout();
              }, 1500);
            } else {
              this.cargarPerfil();
            }
          },
          error: () => {
            this.errorEditar = 'Error al actualizar username.';
            this.cdr.detectChanges();
          }
        });
      },
      error: () => {
        this.errorEditar = 'Error al actualizar datos.';
        this.cdr.detectChanges();
      }
    });
  }
}