import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VentaService } from '../../services/venta';

@Component({
  selector: 'app-caja',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './caja.html',
  styleUrl: './caja.scss'
})
export class Caja implements OnInit {

  ventas: any[] = [];
  cargando = true;

  constructor(
    private ventaService: VentaService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.cargarVentasHoy();
  }

  cargarVentasHoy() {
    this.ventaService.ventasDeHoy().subscribe({
      next: (data) => {
        this.ventas = data.sort((a: any, b: any) =>
          new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  getTotalDia(): number {
    return this.ventas.reduce((acc, v) => acc + (v.total || 0), 0);
  }

  getCantidadVentas(): number {
    return this.ventas.length;
  }

  formatFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-PE', {
      hour: '2-digit', minute: '2-digit'
    });
  }

  irANuevaVenta() {
    this.router.navigate(['/vendedora/ventas/nueva']);
  }
}