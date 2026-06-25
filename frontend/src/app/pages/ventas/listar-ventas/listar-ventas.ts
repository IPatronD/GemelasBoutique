import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VentaService } from '../../../services/venta';

@Component({
  selector: 'app-listar-ventas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listar-ventas.html',
  styleUrl: './listar-ventas.scss',
  encapsulation: ViewEncapsulation.None
})
export class ListarVentas implements OnInit {

  ventas: any[] = [];
  ventasFiltradas: any[] = [];
  ventaDetalle: any = null;
  cargando = true;
  busqueda = '';
  filtroMetodo = '';
  modalAbierto = false;
  modalEliminar = false;
  ventaAEliminar: any = null;

  constructor(
    private ventaService: VentaService,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.cargarVentas();
  }

  cargarVentas() {
    this.ventaService.listar().subscribe({
      next: (data) => {
        this.ventas = data.sort((a: any, b: any) =>
          new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
        this.ventasFiltradas = [...this.ventas];
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  filtrar() {
    this.ventasFiltradas = this.ventas.filter(v => {
      const coincideCliente = v.cliente?.nombres
        ?.toLowerCase().includes(this.busqueda.toLowerCase());
      const coincideMetodo = this.filtroMetodo
        ? v.metodoPago?.nombre === this.filtroMetodo
        : true;
      return coincideCliente && coincideMetodo;
    });
  }

  verDetalle(venta: any) {
    this.ventaDetalle = venta;
    this.modalAbierto = true;
    this.document.body.classList.add('modal-open');
    this.cdr.detectChanges();
  }

  cerrarModal() {
    this.modalAbierto = false;
    this.ventaDetalle = null;
    this.document.body.classList.remove('modal-open');
    this.cdr.detectChanges();
  }

  confirmarEliminar(venta: any) {
    this.ventaAEliminar = venta;
    this.modalEliminar = true;
    this.document.body.classList.add('modal-open');
    this.cdr.detectChanges();
  }

  eliminar() {
    if (!this.ventaAEliminar) return;
    this.ventaService.eliminar(this.ventaAEliminar.id).subscribe({
      next: () => {
        this.ventas = this.ventas.filter(v => v.id !== this.ventaAEliminar.id);
        this.filtrar();
        this.modalEliminar = false;
        this.ventaAEliminar = null;
        this.document.body.classList.remove('modal-open');
        this.cdr.detectChanges();
      },
      error: () => {
        this.modalEliminar = false;
        this.document.body.classList.remove('modal-open');
        this.cdr.detectChanges();
      }
    });
  }

  cancelarEliminar() {
    this.modalEliminar = false;
    this.ventaAEliminar = null;
    this.document.body.classList.remove('modal-open');
    this.cdr.detectChanges();
  }

  getMetodos(): string[] {
    const metodos = this.ventas
      .map(v => v.metodoPago?.nombre)
      .filter(m => !!m);
    return [...new Set(metodos)];
  }

  formatFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-PE', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  }
}