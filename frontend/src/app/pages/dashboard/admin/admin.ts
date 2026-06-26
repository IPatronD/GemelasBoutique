import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentaService } from '../../../services/venta';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class Admin implements OnInit {

  resumen: any = null;  // Objeto con todos los datos del dashboard
  cargando = true;
  anioActual = new Date().getFullYear(); // Para el gráfico de ventas por mes

  constructor(
    private ventaService: VentaService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.cargarResumen();
  }

  cargarResumen() {
    // GET /api/ventas/dashboard/resumen?anio=2026
    // Trae todo en una sola llamada: tarjetas, gráfico, tablas y alertas
    this.ventaService.obtenerResumenDashboard(this.anioActual).subscribe({
      next: (data) => {
        this.resumen = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando dashboard', err);
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  // Convierte el número de mes (1-12) a su abreviación en español
  getNombreMes(mes: number): string {
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
      'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return meses[mes - 1] || '';
  }

  // Calcula el alto de cada barra del gráfico como % del valor máximo
  // Ej: si el mes con más ventas tiene 1000 y este tiene 500 → retorna "50%"
  getBarraAncho(total: number): string {
    if (!this.resumen?.ventasPorMes?.length) return '0%';
    const max = Math.max(...this.resumen.ventasPorMes.map((v: any) => v.total));
    return max > 0 ? `${(total / max) * 100}%` : '0%';
  }
}