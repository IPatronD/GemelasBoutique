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

  resumen: any = null;
  cargando = true;
  anioActual = new Date().getFullYear();

  constructor(
    private ventaService: VentaService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.cargarResumen();
  }

  cargarResumen() {
    this.ventaService.obtenerResumenDashboard(this.anioActual).subscribe({
      next: (data) => {
        this.resumen = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  getNombreMes(mes: number): string {
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
      'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return meses[mes - 1] || '';
  }

  getBarraAncho(total: number): string {
    if (!this.resumen?.ventasPorMes?.length) return '0%';
    const max = Math.max(...this.resumen.ventasPorMes.map((v: any) => v.total));
    return max > 0 ? `${(total / max) * 100}%` : '0%';
  }
}