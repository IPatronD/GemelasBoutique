package com.example.demo.service.impl;

import com.example.demo.models.Venta;
import com.example.demo.dto.ResumenDashboardDTO;
import com.example.demo.models.DetalleVenta;
import com.example.demo.models.Producto;
import com.example.demo.repository.VentaRepository;
import com.example.demo.repository.ClienteRepository;
import com.example.demo.repository.ProductoRepository;
import com.example.demo.service.VentaService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class VentaServiceImpl implements VentaService {

    private final VentaRepository repository;
    private final ProductoRepository productoRepository; // ← mueve aquí
    private final ClienteRepository clienteRepository;

    public VentaServiceImpl(VentaRepository repository, ProductoRepository productoRepository,
            ClienteRepository clienteRepository) {
        this.repository = repository;
        this.productoRepository = productoRepository;
        this.clienteRepository = clienteRepository; // ← por constructor
    }

    // Elimina el @Autowired suelto

    @Override
    public List<Venta> listar() {
        return repository.findAll();
    }

    @Override
    @Transactional
    public Venta guardar(Venta venta) {
        if (venta.getFecha() == null) {
            venta.setFecha(LocalDateTime.now());
        }

        double subtotalBrutoAcumulado = 0.0;
        double totalDescItemsAcumulado = 0.0;

        if (venta.getDescuentoGlobalPorcentaje() == null) {
            venta.setDescuentoGlobalPorcentaje(0.0);
        }

        if (venta.getTasaIva() == null) {
            venta.setTasaIva(16.0); // 16% de IVA por defecto
        }

        if (venta.getDetalles() != null) {
            for (DetalleVenta detalle : venta.getDetalles()) {
                if (detalle.getProducto() == null || detalle.getProducto().getId() == null) {
                    throw new IllegalArgumentException("Cada detalle de venta debe tener un producto válido.");
                }

                // 1. Obtener precio oficial desde la base de datos
                Producto producto = productoRepository.findById(detalle.getProducto().getId())
                        .orElseThrow(() -> new IllegalArgumentException(
                                "Producto no encontrado con ID: " + detalle.getProducto().getId()));

                // 2. Asignar el precio real
                detalle.setPrecio(producto.getPrecio());

                // 3. Asignar porcentaje de descuento por ítem (por defecto 0.0 si es nulo)
                if (detalle.getDescuentoPorcentaje() == null) {
                    detalle.setDescuentoPorcentaje(0.0);
                }

                // 4. Calcular subtotal por ítem: cantidad * precio
                double subtotalItem = detalle.getCantidad() * producto.getPrecio();
                detalle.setSubtotal(Math.round(subtotalItem * 100.0) / 100.0);

                // 5. Calcular descuento por ítem
                double descItem = subtotalItem * (detalle.getDescuentoPorcentaje() / 100.0);
                detalle.setDescuentoMonto(Math.round(descItem * 100.0) / 100.0);

                // 6. Calcular neto por ítem: subtotal - descuentoMonto
                double netoItem = detalle.getSubtotal() - detalle.getDescuentoMonto();
                detalle.setNeto(Math.round(netoItem * 100.0) / 100.0);

                // 7. Acumular totales
                subtotalBrutoAcumulado += detalle.getSubtotal();
                totalDescItemsAcumulado += detalle.getDescuentoMonto();

                // Estructurar relación bidireccional
                detalle.setVenta(venta);
            }
        }

        // Redondear acumuladores iniciales
        double subtotalBrutoFinal = Math.round(subtotalBrutoAcumulado * 100.0) / 100.0;
        double totalDescItemsFinal = Math.round(totalDescItemsAcumulado * 100.0) / 100.0;
        double subtotalNetoFinal = Math.round((subtotalBrutoFinal - totalDescItemsFinal) * 100.0) / 100.0;

        // Descuento global
        double descGlobal = subtotalNetoFinal * (venta.getDescuentoGlobalPorcentaje() / 100.0);
        double descGlobalFinal = Math.round(descGlobal * 100.0) / 100.0;

        // Base Imponible: subtotalNeto - descuentoGlobal
        double baseImponibleFinal = Math.round((subtotalNetoFinal - descGlobalFinal) * 100.0) / 100.0;
        if (baseImponibleFinal < 0) {
            baseImponibleFinal = 0.0;
        }

        // IVA 16%: baseImponible * (tasaIva / 100)
        double calculoIva = baseImponibleFinal * (venta.getTasaIva() / 100.0);
        double calculoIvaFinal = Math.round(calculoIva * 100.0) / 100.0;

        // Total Final = Base Imponible + IVA
        double totalFinal = baseImponibleFinal + calculoIvaFinal;
        double totalFinalRedondeado = Math.round(totalFinal * 100.0) / 100.0;

        // Guardar valores calculados en la entidad
        venta.setSubtotalBruto(subtotalBrutoFinal);
        venta.setTotalDescItems(totalDescItemsFinal);
        venta.setSubtotalNeto(subtotalNetoFinal);
        venta.setDescuento(descGlobalFinal); // Guarda en 'descuento' (monto global)
        venta.setBaseImponible(baseImponibleFinal);
        venta.setSubtotal(baseImponibleFinal); // Compatibilidad con 'subtotal' anterior
        venta.setIva(calculoIvaFinal);
        venta.setTotal(totalFinalRedondeado);

        return repository.save(venta);
    }

    @Override
    public Venta obtener(Long id) {

        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Venta no encontrada"));
    }

    @Override
    @Transactional
    public Venta actualizar(Long id, Venta venta) {

        Venta existente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Venta no encontrada"));

        existente.setFecha(venta.getFecha());
        existente.setTotal(venta.getTotal());
        existente.setCliente(venta.getCliente());
        existente.setUsuario(venta.getUsuario());
        existente.setMetodoPago(venta.getMetodoPago());

        return repository.save(existente);
    }

    @Override
    @Transactional
    public void eliminar(Long id) {

        Venta venta = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Venta no encontrada"));

        repository.delete(venta);
    }

    // CONSULTAS PERSONALIZADAS

    @Override
    public List<Venta> ventasPorCliente(Long clienteId) {
        return repository.ventasPorCliente(clienteId);
    }

    @Override
    public List<Venta> ventasPorFechas(LocalDateTime inicio, LocalDateTime fin) {
        return repository.ventasPorFechas(inicio, fin);
    }

    @Override
    public List<Venta> ventasPorMetodoPago(String metodo) {
        return repository.ventasPorMetodoPago(metodo);
    }

    @Override
    public Double totalVentas() {
        return repository.totalVentas();
    }

    @Override
    public Double totalVentasCliente(Long clienteId) {
        return repository.totalVentasCliente(clienteId);
    }

    @Override
    public Long contarVentas() {
        return repository.contarVentas();
    }

    
    @Override
    public ResumenDashboardDTO obtenerResumenDashboard(int anio) {

        // Fechas de hoy
        LocalDateTime inicioDia = LocalDate.now().atStartOfDay();
        LocalDateTime finDia = inicioDia.plusDays(1);

        // Fechas del mes actual
        LocalDateTime inicioMes = LocalDate.now().withDayOfMonth(1).atStartOfDay();
        LocalDateTime finMes = inicioMes.plusMonths(1);

        // Tarjetas
        Double totalHoy = repository.totalVentasHoy(inicioDia, finDia);
        Double totalMes = repository.totalVentasMes(inicioMes, finMes);
        Long cantidadHoy = (long) repository.ventasDeHoy(inicioDia, finDia).size();
        Long totalClientes = clienteRepository.count();
        Long stockBajo = (long) productoRepository.productosStockBajo(5).size();

        // Ventas por mes
        List<ResumenDashboardDTO.VentaMensualDTO> ventasPorMes = repository
                .consolidadoMensual(anio)
                .stream()
                .map(row -> new ResumenDashboardDTO.VentaMensualDTO(
                        ((Number) row[0]).intValue(),
                        ((Number) row[1]).doubleValue()))
                .toList();

        // Métodos de pago
        List<ResumenDashboardDTO.MetodoPagoResumenDTO> metodosPago = repository
                .ventasPorMetodoPagoResumen()
                .stream()
                .map(row -> new ResumenDashboardDTO.MetodoPagoResumenDTO(
                        (String) row[0],
                        ((Number) row[1]).longValue(),
                        ((Number) row[2]).doubleValue()))
                .toList();

        // Últimas 5 ventas
        List<ResumenDashboardDTO.UltimaVentaDTO> ultimasVentas = repository
                .ultimasVentas(org.springframework.data.domain.PageRequest.of(0, 5))
                .stream()
                .map(v -> new ResumenDashboardDTO.UltimaVentaDTO(
                        v.getId(),
                        v.getFecha().toString(),
                        v.getTotal(),
                        v.getCliente() != null ? v.getCliente().getNombres() : "Sin cliente",
                        v.getMetodoPago() != null ? v.getMetodoPago().getNombre() : "Sin método"))
                .toList();

        // Más vendidos top 5
        List<ResumenDashboardDTO.ProductoVendidoDTO> masVendidos = productoRepository
                .masVendidos(org.springframework.data.domain.PageRequest.of(0, 5))
                .stream()
                .map(row -> new ResumenDashboardDTO.ProductoVendidoDTO(
                        (String) row[0],
                        ((Number) row[1]).longValue(),
                        ((Number) row[2]).doubleValue()))
                .toList();

        // Alertas de stock bajo
        List<ResumenDashboardDTO.ProductoStockDTO> alertasStock = productoRepository
                .productosStockBajo(5)
                .stream()
                .map(p -> new ResumenDashboardDTO.ProductoStockDTO(
                        p.getId(),
                        p.getNombre(),
                        p.getStock(),
                        p.getCategoria() != null ? p.getCategoria().getNombre() : "Sin categoría"))
                .toList();

        return new ResumenDashboardDTO(
                totalHoy, totalMes, cantidadHoy, totalClientes, stockBajo,
                ventasPorMes, metodosPago, ultimasVentas, masVendidos, alertasStock);
    }

    @Override
    public List<Venta> ultimasVentas(int cantidad) {
        return repository.ultimasVentas(
                org.springframework.data.domain.PageRequest.of(0, cantidad));
    }
}