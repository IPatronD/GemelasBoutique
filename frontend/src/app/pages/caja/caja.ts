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

  ventas: any[] = [];   // Lista de ventas del día
  cargando = true;      // Controla el spinner de carga

  constructor(
    private ventaService: VentaService,  // Llama al backend
    private router: Router,              // Para navegar entre rutas
    private cdr: ChangeDetectorRef       // Fuerza actualización de la vista
  ) { }

  // Se ejecuta automáticamente al abrir la pantalla
  ngOnInit() {
    this.cargarVentasHoy();
  }

  cargarVentasHoy() {
    // Llama al endpoint GET /api/ventas/hoy
    this.ventaService.ventasDeHoy().subscribe({
      next: (data) => {
        // Ordena de más reciente a más antigua
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

  // Suma todos los totales de las ventas del día
  getTotalDia(): number {
    return this.ventas.reduce((acc, v) => acc + (v.total || 0), 0);
  }

  // Devuelve cuántas ventas se hicieron hoy
  getCantidadVentas(): number {
    return this.ventas.length;
  }

  // Formatea la fecha al formato peruano con hora y minutos
  formatFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-PE', {
      hour: '2-digit', minute: '2-digit'
    });
  }

  // Navega a la pantalla de registrar venta
  irANuevaVenta() {
    this.router.navigate(['/vendedora/ventas/nueva']);
  }
}