package com.example.demo.service;

import com.example.demo.dto.ResumenDashboardDTO;
import com.example.demo.models.Venta;

import java.time.LocalDateTime;
import java.util.List;

public interface VentaService {

    List<Venta> listar();

    Venta guardar(Venta venta);

    Venta obtener(Long id);

    Venta actualizar(Long id, Venta venta);

    void eliminar(Long id);

    // Consultas personalizadas

    List<Venta> ventasPorCliente(Long clienteId);

    List<Venta> ventasPorFechas(LocalDateTime inicio, LocalDateTime fin);

    List<Venta> ventasPorMetodoPago(String metodo);

    Double totalVentas();

    Double totalVentasCliente(Long clienteId);

    Long contarVentas();

    ResumenDashboardDTO obtenerResumenDashboard(int anio);

    List<Venta> ultimasVentas(int cantidad);
}