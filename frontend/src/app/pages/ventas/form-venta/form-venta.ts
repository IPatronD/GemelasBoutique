import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation, Inject } from '@angular/core';
import { DOCUMENT, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductoService } from '../../../services/producto';
import { ClienteService } from '../../../services/cliente';
import { MetodoPagoService } from '../../../services/metodo-pago';
import { VentaService } from '../../../services/venta';

// Estructura de cada item en el carrito
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

  // Listas cargadas del backend
  productos: any[] = [];
  productosFiltrados: any[] = [];
  clientes: any[] = [];
  clientesFiltrados: any[] = [];
  metodosPago: any[] = [];

  // Texto de búsqueda de productos y clientes
  busquedaProducto = '';
  busquedaCliente = '';
  mostrarListaClientes = false;

  // Datos de la venta en curso
  carrito: ItemCarrito[] = [];
  clienteSeleccionado: any = null;
  metodoPagoId: number | null = null;
  descuentoGlobalPorcentaje = 0;

  // Estados de carga y guardado
  cargando = true;
  guardando = false;
  error = '';

  // Modal para crear un cliente rápido desde la venta
  modalNuevoCliente = false;
  formNuevoCliente: any = {
    tipo: 'Natural', nombres: '', documento: '', telefono: '', correo: ''
  };
  errorNuevoCliente = '';

  // Modal de éxito al confirmar la venta
  modalExito = false;
  ventaCreada: any = null;

  // Error de validación del correo en el modal de nuevo cliente
  errorCorreo = '';

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

  // Carga productos, clientes y métodos de pago en paralelo
  cargarDatos() {
    this.cargando = true;

    this.productoService.listar().subscribe({
      next: (productos) => {
        // Solo muestra productos con stock disponible
        this.productos = productos.filter((p: any) => p.stock > 0);
        this.productosFiltrados = [...this.productos];
        this.verificarCargaCompleta();
      },
      error: () => this.verificarCargaCompleta()
    });

    this.clienteService.listar().subscribe({
      next: (clientes) => {
        // Solo clientes activos
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

  // Contador para saber cuándo terminaron las 3 cargas
  private cargasCompletadas = 0;
  private verificarCargaCompleta() {
    this.cargasCompletadas++;
    if (this.cargasCompletadas >= 3) {
      this.cargando = false;
      this.cdr.detectChanges();
    }
  }

  // ── BÚSQUEDA DE PRODUCTOS ──

  // Filtra productos por nombre o categoría
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

  // Agrega un producto al carrito o aumenta su cantidad si ya existe
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

  // Aumenta la cantidad de un item sin superar el stock
  incrementar(item: ItemCarrito) {
    if (item.cantidad < item.stockDisponible) {
      item.cantidad++;
    } else {
      this.error = `Stock máximo disponible: ${item.stockDisponible}.`;
      setTimeout(() => this.error = '', 3000);
    }
  }

  // Reduce la cantidad — si llega a 0 quita el item del carrito
  decrementar(item: ItemCarrito) {
    if (item.cantidad > 1) {
      item.cantidad--;
    } else {
      this.quitarDelCarrito(item);
    }
  }

  // Elimina un item del carrito
  quitarDelCarrito(item: ItemCarrito) {
    this.carrito = this.carrito.filter(i => i.productoId !== item.productoId);
  }

  // Vacía el carrito y resetea todos los campos de la venta
  limpiarCarrito() {
    this.carrito = [];
    this.clienteSeleccionado = null;
    this.metodoPagoId = null;
    this.descuentoGlobalPorcentaje = 0;
    this.busquedaCliente = '';
  }

  // ── CÁLCULOS (el backend recalcula también, esto es solo para el preview) ──

  // Subtotal de un item con su descuento individual
  getSubtotalItem(item: ItemCarrito): number {
    const bruto = item.cantidad * item.precio;
    const desc = bruto * (item.descuentoPorcentaje / 100);
    return Math.round((bruto - desc) * 100) / 100;
  }

  // Subtotal bruto sin descuentos
  getSubtotalBruto(): number {
    return this.carrito.reduce((acc, i) => acc + (i.cantidad * i.precio), 0);
  }

  // Subtotal neto con descuentos individuales aplicados
  getSubtotalNeto(): number {
    return this.carrito.reduce((acc, i) => acc + this.getSubtotalItem(i), 0);
  }

  // Monto del descuento global en soles
  getDescuentoGlobalMonto(): number {
    return Math.round(this.getSubtotalNeto() * (this.descuentoGlobalPorcentaje / 100) * 100) / 100;
  }

  // Base imponible después de descuento global
  getBaseImponible(): number {
    const base = this.getSubtotalNeto() - this.getDescuentoGlobalMonto();
    return base > 0 ? Math.round(base * 100) / 100 : 0;
  }

  // IVA del 16% sobre la base imponible
  getIva(): number {
    return Math.round(this.getBaseImponible() * 0.16 * 100) / 100;
  }

  // Total final = base imponible + IVA
  getTotal(): number {
    return Math.round((this.getBaseImponible() + this.getIva()) * 100) / 100;
  }

  // ── DESCUENTO GLOBAL: validación estricta 0-100 ──

  // Bloquea teclas que no sean dígitos o que harían superar 100
  bloquearTeclaSiExcede(event: KeyboardEvent) {
    const teclasPermitidas = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'];
    if (teclasPermitidas.includes(event.key) || event.ctrlKey || event.metaKey) return;

    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
      return;
    }

    const input = event.target as HTMLInputElement;
    const valorActual = input.value;
    const cursorPos = input.selectionStart ?? valorActual.length;
    const valorSimulado = valorActual.slice(0, cursorPos) + event.key + valorActual.slice(cursorPos);
    const numeroSimulado = parseInt(valorSimulado, 10);

    if (numeroSimulado > 100) event.preventDefault();
  }

  // Bloquea pegar texto y solo acepta números entre 0 y 100
  bloquearPegado(event: ClipboardEvent) {
    event.preventDefault();
    const texto = event.clipboardData?.getData('text') ?? '';
    const soloNumeros = texto.replace(/[^0-9]/g, '');
    const numero = parseInt(soloNumeros, 10);
    if (!isNaN(numero)) this.descuentoGlobalPorcentaje = Math.min(numero, 100);
    this.cdr.detectChanges();
  }

  // Corrige el valor si está fuera del rango 0-100
  validarDescuento() {
    if (this.descuentoGlobalPorcentaje === null || this.descuentoGlobalPorcentaje === undefined) {
      this.descuentoGlobalPorcentaje = 0;
    } else if (this.descuentoGlobalPorcentaje < 0) {
      this.descuentoGlobalPorcentaje = 0;
    } else if (this.descuentoGlobalPorcentaje > 100) {
      this.descuentoGlobalPorcentaje = 100;
    }
    this.cdr.detectChanges();
  }

  // ── CLIENTE ──

  // Busca clientes activos por nombre o documento
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

  // Selecciona un cliente de la lista
  seleccionarCliente(cliente: any) {
    this.clienteSeleccionado = cliente;
    this.busquedaCliente = cliente.nombres;
    this.mostrarListaClientes = false;
  }

  // Quita el cliente seleccionado
  quitarCliente() {
    this.clienteSeleccionado = null;
    this.busquedaCliente = '';
  }

  // Abre el modal para crear un cliente rápido
  abrirNuevoCliente() {
    this.formNuevoCliente = { tipo: 'Natural', nombres: '', documento: '', telefono: '', correo: '' };
    this.errorNuevoCliente = '';
    this.modalNuevoCliente = true;
    this.mostrarListaClientes = false;
    this.document.body.classList.add('modal-open');
    this.cdr.detectChanges();
  }

  // Cierra el modal de nuevo cliente
  cerrarNuevoCliente() {
    this.modalNuevoCliente = false;
    this.document.body.classList.remove('modal-open');
    this.cdr.detectChanges();
  }

  // Valida y guarda el nuevo cliente, luego lo selecciona automáticamente
  guardarNuevoCliente() {
    this.errorNuevoCliente = '';
    const f = this.formNuevoCliente;

    if (!f.nombres || !f.documento || !f.telefono || !f.correo) {
      this.errorNuevoCliente = 'Completa todos los campos.';
      return;
    }
    if (f.documento.length !== 8) {
      this.errorNuevoCliente = 'El documento debe tener exactamente 8 dígitos.';
      return;
    }
    if (f.telefono.length !== 9) {
      this.errorNuevoCliente = 'El teléfono debe tener exactamente 9 dígitos.';
      return;
    }
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(f.correo)) {
      this.errorNuevoCliente = 'Correo inválido (ej: nombre@dominio.com)';
      return;
    }

    const payload = {
      tipo: f.tipo, nombres: f.nombres, documento: f.documento,
      telefono: f.telefono, correo: f.correo, estado: true
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

  // Verifica que el carrito, cliente y método de pago estén listos
  puedeGuardar(): boolean {
    return this.carrito.length > 0 &&
      !!this.clienteSeleccionado &&
      !!this.metodoPagoId &&
      !this.guardando;
  }

  // Construye el payload y envía la venta al backend
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

  // Cierra el modal de éxito y prepara una nueva venta
  cerrarExitoYNueva() {
    this.modalExito = false;
    this.document.body.classList.remove('modal-open');
    this.limpiarCarrito();
    this.cargarDatos(); // recarga stock actualizado
    this.cdr.detectChanges();
  }

  // Redirige a la caja del día después de confirmar
  irACaja() {
    this.modalExito = false;
    this.document.body.classList.remove('modal-open');
    this.router.navigate(['/vendedora/caja']);
  }

  // Solo permite números en los campos del modal de nuevo cliente
  soloNumerosModal(event: KeyboardEvent): boolean {
    return /[0-9]/.test(event.key);
  }

  // Valida el formato del correo en el modal de nuevo cliente
  validarCorreoModal() {
    const correo = this.formNuevoCliente.correo;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.errorCorreo = correo && !regex.test(correo) ? 'Correo inválido (ej: nombre@dominio.com)' : '';
  }
}