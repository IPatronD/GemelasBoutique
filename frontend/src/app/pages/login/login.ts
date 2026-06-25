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
  username = '';
  password = '';
  error = '';

  constructor(private auth: Auth, private router: Router) {}

  login() {
    this.auth.login(this.username, this.password).subscribe({
      next: (res) => {
        this.auth.guardarToken(res.token);
        this.auth.guardarRol(res.rol);

        // Redirigir según rol
        if (res.rol === 'ROLE_ADMIN') {
          this.router.navigate(['/admin/dashboard']);
        } else if (res.rol === 'ROLE_SUPERVISORA') {
          this.router.navigate(['/supervisora/dashboard']);
        } else if (res.rol === 'ROLE_VENDEDORA') {
          this.router.navigate(['/vendedora/dashboard']);
        } else {
          this.error = 'Rol no reconocido';
        }
      },
      error: () => {
        this.error = 'Usuario o contraseña incorrectos';
      },
    });
  }
}