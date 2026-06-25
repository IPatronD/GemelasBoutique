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

  perfil: any = null;
  cargando = true;

  modalPassword = false;
  formPassword: any = { nueva: '', confirmar: '' };
  errorPassword = '';
  exitoPassword = false;

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

  getRolLabel(): string {
    const roles: any = {
      'ROLE_ADMIN': 'Administrador',
      'ROLE_SUPERVISORA': 'Supervisora',
      'ROLE_VENDEDORA': 'Vendedora'
    };
    return roles[this.perfil?.rol] || this.perfil?.rol;
  }

  // ── CAMBIAR CONTRASEÑA ──

  abrirCambiarPassword() {
    this.formPassword = { nueva: '', confirmar: '' };
    this.errorPassword = '';
    this.exitoPassword = false;
    this.modalPassword = true;
    this.cdr.detectChanges();
  }

  cerrarPassword() {
    this.modalPassword = false;
    this.cdr.detectChanges();
  }

  cambiarPassword() {
    this.errorPassword = '';
    this.exitoPassword = false;

    if (!this.formPassword.nueva || this.formPassword.nueva.length < 6) {
      this.errorPassword = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }

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

  cerrarEditar() {
    this.modalEditar = false;
    this.cdr.detectChanges();
  }

  guardarPerfil() {
    this.errorEditar = '';

    const payloadEmpleado = {
      nombres: this.formEditar.nombres,
      apellidos: this.formEditar.apellidos,
      correo: this.formEditar.correo,
      dni: this.perfil.empleado.dni,
      estado: true
    };

    this.empleadoService.actualizar(this.perfil.empleado.id, payloadEmpleado).subscribe({
      next: () => {
        const payloadUsuario = {
          username: this.formEditar.username,
          estado: true,
          empleado: { id: this.perfil.empleado.id },
          roles: [{ id: this.perfil.rolId }]
        };

        this.usuarioService.actualizar(this.perfil.id, payloadUsuario).subscribe({
          next: () => {
            this.exitoEditar = true;
            this.cdr.detectChanges();

            // Si cambió el username, cerrar sesión para que vuelva a loguearse
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