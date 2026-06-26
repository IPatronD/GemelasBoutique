import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation, Inject } from '@angular/core';
import { DOCUMENT, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VentaService } from '../../../services/venta';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-listar-ventas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listar-ventas.html',
  styleUrl: './listar-ventas.scss',
  encapsulation: ViewEncapsulation.None
})
export class ListarVentas implements OnInit {

  ventas: any[] = [];          // Lista completa del backend
  ventasFiltradas: any[] = []; // Lista después de aplicar filtros
  ventaDetalle: any = null;    // Venta seleccionada para ver detalle
  cargando = true;
  busqueda = '';               // Filtro por nombre de cliente
  filtroMetodo = '';           // Filtro por método de pago
  modalAbierto = false;        // Controla modal de detalle
  modalEliminar = false;       // Controla modal de confirmación
  ventaAEliminar: any = null;  // Venta pendiente de eliminar
  esAdmin = false;             // Solo el admin puede eliminar ventas

  constructor(
    private ventaService: VentaService,
    private auth: Auth,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    // Detecta el rol para controlar el botón de eliminar
    this.esAdmin = this.auth.esAdmin();
    this.cargarVentas();
  }

  cargarVentas() {
    // GET /api/ventas — trae todas las ventas
    this.ventaService.listar().subscribe({
      next: (data) => {
        // Ordena de más reciente a más antigua
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
      // Filtra por nombre del cliente
      const coincideCliente = v.cliente?.nombres
        ?.toLowerCase().includes(this.busqueda.toLowerCase());
      // Filtra por método de pago (si hay uno seleccionado)
      const coincideMetodo = this.filtroMetodo
        ? v.metodoPago?.nombre === this.filtroMetodo
        : true;
      return coincideCliente && coincideMetodo;
    });
  }

  // Abre el modal con el detalle de la venta seleccionada
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

  // Abre el modal de confirmación para eliminar
  confirmarEliminar(venta: any) {
    this.ventaAEliminar = venta;
    this.modalEliminar = true;
    this.document.body.classList.add('modal-open');
    this.cdr.detectChanges();
  }

  eliminar() {
    if (!this.ventaAEliminar) return;
    // DELETE /api/ventas/{id}
    this.ventaService.eliminar(this.ventaAEliminar.id).subscribe({
      next: () => {
        // Elimina de la lista local sin recargar todo
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

  // Extrae los métodos de pago únicos de la lista para el select de filtros
  getMetodos(): string[] {
    const metodos = this.ventas
      .map(v => v.metodoPago?.nombre)
      .filter(m => !!m); // elimina nulls
    return [...new Set(metodos)]; // elimina duplicados
  }

  // Formatea la fecha al formato peruano con hora
  formatFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-PE', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  }
}