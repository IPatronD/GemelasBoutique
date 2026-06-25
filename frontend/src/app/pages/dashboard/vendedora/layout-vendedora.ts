import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Auth } from '../../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout-vendedora',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './layout-vendedora.html',
  styleUrl: './layout-vendedora.scss'
})
export class LayoutVendedora {
  menuAbierto = true;

  constructor(private auth: Auth, private router: Router) { }

  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

  logout() {
    this.auth.logout();
  }

  navegarA(ruta: string) {
    this.router.navigate([ruta]);
  }
}