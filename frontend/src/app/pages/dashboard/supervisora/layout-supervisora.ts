import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Auth } from '../../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout-supervisora',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './layout-supervisora.html',
  styleUrl: './layout-supervisora.scss'
})
export class LayoutSupervisora {

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