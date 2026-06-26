import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentaService } from '../../../services/venta';

@Component({
  selector: 'app-supervisora',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './supervisora.html',
  styleUrl: './supervisora.scss'
})
export class Supervisora implements OnInit {

  // Datos del resumen que llegan del backend
  resumen: any = null;

  // Controla el spinner de carga
  cargando = true;

  // Año actual para el gráfico de ventas
  anioActual = new Date().getFullYear();

  constructor(
    private ventaService: VentaService, // Servicio de ventas
    private cdr: ChangeDetectorRef      // Fuerza actualización de la vista
  ) { }

  ngOnInit() {
    // Carga el resumen al iniciar el componente
    this.cargarResumen();
  }

  cargarResumen() {
    // Llama al endpoint GET /api/ventas/dashboard/resumen
    this.ventaService.obtenerResumenDashboard(this.anioActual).subscribe({
      next: (data) => {
        this.resumen = data;       // Guarda los datos
        this.cargando = false;     // Oculta el spinner
        this.cdr.detectChanges();  // Actualiza la vista
      },
      error: () => {
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  // Convierte número de mes a nombre abreviado (1 → 'Ene')
  getNombreMes(mes: number): string {
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
      'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return meses[mes - 1] || '';
  }

  // Calcula el porcentaje de altura de cada barra del gráfico
  // basado en el total máximo del año
  getBarraAncho(total: number): string {
    if (!this.resumen?.ventasPorMes?.length) return '0%';
    const max = Math.max(...this.resumen.ventasPorMes.map((v: any) => v.total));
    return max > 0 ? `${(total / max) * 100}%` : '0%';
  }
}