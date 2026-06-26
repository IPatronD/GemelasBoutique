import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Auth } from '../../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {

  // Controla si el sidebar está abierto o cerrado
  menuAbierto = true;

  constructor(private auth: Auth, private router: Router) { }

  // Alterna el estado del sidebar
  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

  // Cierra la sesión y redirige al login
  logout() {
    this.auth.logout();
  }

  // Navega a la ruta indicada
  navegarA(ruta: string) {
    this.router.navigate([ruta]);
  }
}