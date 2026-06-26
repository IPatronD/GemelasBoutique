import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  // Campos del formulario
  username = '';
  password = '';

  // Mensaje de error si el login falla
  error = '';

  constructor(private auth: Auth, private router: Router) { }

  login() {
    this.auth.login(this.username, this.password).subscribe({
      next: (res) => {
        // Guarda el token y el rol en localStorage
        this.auth.guardarToken(res.token);
        this.auth.guardarRol(res.rol);

        // Redirige según el rol del usuario
        if (res.rol === 'ROLE_ADMIN') {
          this.router.navigate(['/admin/dashboard']);
        } else if (res.rol === 'ROLE_SUPERVISORA') {
          this.router.navigate(['/supervisora/dashboard']);
        } else if (res.rol === 'ROLE_VENDEDORA') {
          this.router.navigate(['/vendedora/ventas/nueva']);
        } else {
          this.error = 'Rol no reconocido';
        }
      },
      error: () => {
        // Muestra error si las credenciales son incorrectas
        this.error = 'Usuario o contraseña incorrectos';
      },
    });
  }
}