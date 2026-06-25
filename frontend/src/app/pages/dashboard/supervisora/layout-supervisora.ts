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