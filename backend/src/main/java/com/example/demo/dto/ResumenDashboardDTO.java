package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResumenDashboardDTO {

    // Tarjetas principales
    private Double totalVentasHoy;
    private Double totalVentasMes;
    private Long cantidadVentasHoy;
    private Long totalClientes;
    private Long productosStockBajo;

    // Gráfico de ventas por mes
    private List<VentaMensualDTO> ventasPorMes;

    // Gráfico de métodos de pago
    private List<MetodoPagoResumenDTO> ventasPorMetodoPago;

    // Tabla últimas ventas
    private List<UltimaVentaDTO> ultimasVentas;

    // Tabla productos más vendidos
    private List<ProductoVendidoDTO> masVendidos;

    // Tabla stock bajo
    private List<ProductoStockDTO> alertasStock;

    // ===== DTOs internos =====

    @Data
    @AllArgsConstructor
    public static class VentaMensualDTO {
        private int mes;
        private Double total;
    }

    @Data
    @AllArgsConstructor
    public static class MetodoPagoResumenDTO {
        private String metodo;
        private Long cantidad;
        private Double total;
    }

    @Data
    @AllArgsConstructor
    public static class UltimaVentaDTO {
        private Long id;
        private String fecha;
        private Double total;
        private String cliente;
        private String metodoPago;
    }

    @Data
    @AllArgsConstructor
    public static class ProductoVendidoDTO {
        private String nombre;
        private Long cantidadVendida;
        private Double totalGenerado;
    }

    @Data
    @AllArgsConstructor
    public static class ProductoStockDTO {
        private Long id;
        private String nombre;
        private Integer stock;
        private String categoria;
    }
}