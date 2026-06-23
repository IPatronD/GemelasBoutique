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

  constructor(
    private auth: Auth,
    private router: Router,
  ) {}

  login() {
    this.auth.login(this.username, this.password).subscribe({
      next: (res) => {
        this.auth.guardarToken(res.token);
        console.log('Login correcto');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Error login', err);
      },
    });
  }
}
