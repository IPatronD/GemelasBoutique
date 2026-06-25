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
  menuAbierto = true;

  constructor(private auth: Auth, private router: Router) {}

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