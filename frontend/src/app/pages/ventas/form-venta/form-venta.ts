import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation, Inject } from '@angular/core';
import { DOCUMENT, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductoService } from '../../../services/producto';
import { ClienteService } from '../../../services/cliente';
import { MetodoPagoService } from '../../../services/metodo-pago';
import { VentaService } from '../../../services/venta';

interface ItemCarrito {
  productoId: number;
  nombre: string;
  precio: number;
  stockDisponible: number;
  cantidad: number;
  descuentoPorcentaje: number;
}

@Component({
  selector: 'app-form-venta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-venta.html',
  styleUrl: './form-venta.scss',
  encapsulation: ViewEncapsulation.None
})
export class FormVenta implements OnInit {

  // Datos cargados
  productos: any[] = [];
  productosFiltrados: any[] = [];
  clientes: any[] = [];
  clientesFiltrados: any[] = [];
  metodosPago: any[] = [];

  // Búsquedas
  busquedaProducto = '';
  busquedaCliente = '';
  mostrarListaClientes = false;

  // Carrito y venta
  carrito: ItemCarrito[] = [];
  clienteSeleccionado: any = null;
  metodoPagoId: number | null = null;
  descuentoGlobalPorcentaje = 0;

  // Estado
  cargando = true;
  guardando = false;
  error = '';

  // Modal nuevo cliente rápido
  modalNuevoCliente = false;
  formNuevoCliente: any = {
    tipo: 'Natural', nombres: '', documento: '', telefono: '', correo: ''
  };
  errorNuevoCliente = '';

  // Modal confirmación / éxito
  modalExito = false;
  ventaCreada: any = null;

  constructor(
    private productoService: ProductoService,
    private clienteService: ClienteService,
    private metodoPagoService: MetodoPagoService,
    private ventaService: VentaService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.cargando = true;

    this.productoService.listar().subscribe({
      next: (productos) => {
        // Solo productos con stock > 0 se muestran para vender
        this.productos = productos.filter((p: any) => p.stock > 0);
        this.productosFiltrados = [...this.productos];
        this.verificarCargaCompleta();
      },
      error: () => this.verificarCargaCompleta()
    });

    this.clienteService.listar().subscribe({
      next: (clientes) => {
        this.clientes = clientes.filter((c: any) => c.estado);
        this.verificarCargaCompleta();
      },
      error: () => this.verificarCargaCompleta()
    });

    this.metodoPagoService.listar().subscribe({
      next: (metodos) => {
        this.metodosPago = metodos;
        this.verificarCargaCompleta();
      },
      error: () => this.verificarCargaCompleta()
    });
  }

  private cargasCompletadas = 0;
  private verificarCargaCompleta() {
    this.cargasCompletadas++;
    if (this.cargasCompletadas >= 3) {
      this.cargando = false;
      this.cdr.detectChanges();
    }
  }

  // ── BÚSQUEDA DE PRODUCTOS ──

  filtrarProductos() {
    const termino = this.busquedaProducto.toLowerCase().trim();
    if (!termino) {
      this.productosFiltrados = [...this.productos];
      return;
    }
    this.productosFiltrados = this.productos.filter(p =>
      p.nombre.toLowerCase().includes(termino) ||
      p.categoria?.nombre?.toLowerCase().includes(termino)
    );
  }

  // ── CARRITO ──

  agregarAlCarrito(producto: any) {
    const yaExiste = this.carrito.find(i => i.productoId === producto.id);

    if (yaExiste) {
      if (yaExiste.cantidad < producto.stock) {
        yaExiste.cantidad++;
      } else {
        this.error = `No hay más stock disponible de "${producto.nombre}".`;
        setTimeout(() => this.error = '', 3000);
      }
    } else {
      this.carrito.push({
        productoId: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        stockDisponible: producto.stock,
        cantidad: 1,
        descuentoPorcentaje: 0
      });
    }
    this.cdr.detectChanges();
  }

  incrementar(item: ItemCarrito) {
    if (item.cantidad < item.stockDisponible) {
      item.cantidad++;
    } else {
      this.error = `Stock máximo disponible: ${item.stockDisponible}.`;
      setTimeout(() => this.error = '', 3000);
    }
  }

  decrementar(item: ItemCarrito) {
    if (item.cantidad > 1) {
      item.cantidad--;
    } else {
      this.quitarDelCarrito(item);
    }
  }

  quitarDelCarrito(item: ItemCarrito) {
    this.carrito = this.carrito.filter(i => i.productoId !== item.productoId);
  }

  limpiarCarrito() {
    this.carrito = [];
    this.clienteSeleccionado = null;
    this.metodoPagoId = null;
    this.descuentoGlobalPorcentaje = 0;
    this.busquedaCliente = '';
  }

  // ── CÁLCULOS (preview en vivo, el backend recalcula igual) ──

  getSubtotalItem(item: ItemCarrito): number {
    const bruto = item.cantidad * item.precio;
    const desc = bruto * (item.descuentoPorcentaje / 100);
    return Math.round((bruto - desc) * 100) / 100;
  }

  getSubtotalBruto(): number {
    return this.carrito.reduce((acc, i) => acc + (i.cantidad * i.precio), 0);
  }

  getSubtotalNeto(): number {
    return this.carrito.reduce((acc, i) => acc + this.getSubtotalItem(i), 0);
  }

  getDescuentoGlobalMonto(): number {
    return Math.round(this.getSubtotalNeto() * (this.descuentoGlobalPorcentaje / 100) * 100) / 100;
  }

  getBaseImponible(): number {
    const base = this.getSubtotalNeto() - this.getDescuentoGlobalMonto();
    return base > 0 ? Math.round(base * 100) / 100 : 0;
  }

  getIva(): number {
    return Math.round(this.getBaseImponible() * 0.16 * 100) / 100;
  }

  getTotal(): number {
    return Math.round((this.getBaseImponible() + this.getIva()) * 100) / 100;
  }

  // ── CLIENTE ──

  buscarClientes() {
    const termino = this.busquedaCliente.toLowerCase().trim();
    if (!termino) {
      this.clientesFiltrados = [];
      this.mostrarListaClientes = false;
      return;
    }
    this.clientesFiltrados = this.clientes.filter(c =>
      c.nombres.toLowerCase().includes(termino) ||
      c.documento.includes(termino)
    );
    this.mostrarListaClientes = true;
  }

  seleccionarCliente(cliente: any) {
    this.clienteSeleccionado = cliente;
    this.busquedaCliente = cliente.nombres;
    this.mostrarListaClientes = false;
  }

  quitarCliente() {
    this.clienteSeleccionado = null;
    this.busquedaCliente = '';
  }

  abrirNuevoCliente() {
    this.formNuevoCliente = { tipo: 'Natural', nombres: '', documento: '', telefono: '', correo: '' };
    this.errorNuevoCliente = '';
    this.modalNuevoCliente = true;
    this.mostrarListaClientes = false;
    this.document.body.classList.add('modal-open');
    this.cdr.detectChanges();
  }

  cerrarNuevoCliente() {
    this.modalNuevoCliente = false;
    this.document.body.classList.remove('modal-open');
    this.cdr.detectChanges();
  }

  guardarNuevoCliente() {
    this.errorNuevoCliente = '';
    const f = this.formNuevoCliente;

    if (!f.nombres || !f.documento || !f.telefono || !f.correo) {
      this.errorNuevoCliente = 'Completa todos los campos.';
      return;
    }

    const payload = {
      tipo: f.tipo,
      nombres: f.nombres,
      documento: f.documento,
      telefono: f.telefono,
      correo: f.correo,
      estado: true
    };

    this.clienteService.guardar(payload).subscribe({
      next: (clienteCreado) => {
        this.clientes.push(clienteCreado);
        this.seleccionarCliente(clienteCreado);
        this.modalNuevoCliente = false;
        this.document.body.classList.remove('modal-open');
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorNuevoCliente = err?.error?.message || 'Error al registrar cliente. Verifica que el documento/correo no estén repetidos.';
        this.cdr.detectChanges();
      }
    });
  }

  // ── GUARDAR VENTA ──

  puedeGuardar(): boolean {
    return this.carrito.length > 0 &&
      !!this.clienteSeleccionado &&
      !!this.metodoPagoId &&
      !this.guardando;
  }

  confirmarVenta() {
    if (!this.puedeGuardar()) {
      if (this.carrito.length === 0) this.error = 'Agrega al menos un producto.';
      else if (!this.clienteSeleccionado) this.error = 'Selecciona un cliente.';
      else if (!this.metodoPagoId) this.error = 'Selecciona un método de pago.';
      setTimeout(() => this.error = '', 3000);
      return;
    }

    this.guardando = true;
    this.error = '';

    const payload = {
      cliente: { id: this.clienteSeleccionado.id },
      metodoPago: { id: this.metodoPagoId },
      descuentoGlobalPorcentaje: this.descuentoGlobalPorcentaje || 0,
      tasaIva: 16.0,
      detalles: this.carrito.map(item => ({
        producto: { id: item.productoId },
        cantidad: item.cantidad,
        descuentoPorcentaje: item.descuentoPorcentaje || 0
      }))
    };

    this.ventaService.guardar(payload).subscribe({
      next: (ventaCreada) => {
        this.ventaCreada = ventaCreada;
        this.guardando = false;
        this.modalExito = true;
        this.document.body.classList.add('modal-open');
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.guardando = false;
        this.error = err?.error?.message || 'No se pudo registrar la venta. Verifica el stock disponible.';
        this.cdr.detectChanges();
      }
    });
  }

  cerrarExitoYNueva() {
    this.modalExito = false;
    this.document.body.classList.remove('modal-open');
    this.limpiarCarrito();
    this.cargarDatos(); // recarga stock actualizado
    this.cdr.detectChanges();
  }

  irACaja() {
    this.modalExito = false;
    this.document.body.classList.remove('modal-open');
    this.router.navigate(['/vendedora/caja']);
  }
}