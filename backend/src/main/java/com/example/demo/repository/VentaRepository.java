package com.example.demo.repository;

import com.example.demo.models.Venta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface VentaRepository extends JpaRepository<Venta, Long> {

    // Ventas por cliente
    @Query("""
        SELECT v
        FROM Venta v
        JOIN v.cliente c
        WHERE c.id = :clienteId
        ORDER BY v.fecha DESC
    """)
    List<Venta> ventasPorCliente(Long clienteId);

    // Ventas entre fechas
    @Query("""
        SELECT v
        FROM Venta v
        WHERE v.fecha BETWEEN :inicio AND :fin
    """)
    List<Venta> ventasPorFechas(LocalDateTime inicio, LocalDateTime fin);

    // Total vendido
    @Query("""
        SELECT SUM(v.total)
        FROM Venta v
    """)
    Double totalVentas();

    // Ventas por método de pago
    @Query("""
        SELECT v
        FROM Venta v
        JOIN v.metodoPago m
        WHERE m.nombre = :metodo
    """)
    List<Venta> ventasPorMetodoPago(String metodo);

    // Cantidad total de ventas
    @Query("""
        SELECT COUNT(v)
        FROM Venta v
    """)
    Long contarVentas();

    // Total vendido por cliente
    @Query("""
        SELECT SUM(v.total)
        FROM Venta v
        WHERE v.cliente.id = :clienteId
    """)
    Double totalVentasCliente(Long clienteId);

    // Ventas de hoy
    @Query("""
                SELECT v
                FROM Venta v
                WHERE v.fecha >= :inicio AND v.fecha < :fin
                ORDER BY v.fecha DESC
            """)
    List<Venta> ventasDeHoy(LocalDateTime inicio, LocalDateTime fin);

    // Total vendido hoy
    @Query("""
                SELECT COALESCE(SUM(v.total), 0)
                FROM Venta v
                WHERE v.fecha >= :inicio AND v.fecha < :fin
            """)
    Double totalVentasHoy(LocalDateTime inicio, LocalDateTime fin);

    // Total vendido en el mes
    @Query("""
                SELECT COALESCE(SUM(v.total), 0)
                FROM Venta v
                WHERE v.fecha >= :inicio AND v.fecha < :fin
            """)
    Double totalVentasMes(LocalDateTime inicio, LocalDateTime fin);

    // Últimas N ventas
    @Query("""
                SELECT v
                FROM Venta v
                ORDER BY v.fecha DESC
            """)
    List<Venta> ultimasVentas(org.springframework.data.domain.Pageable pageable);

    // Consolidado mensual por año
    @Query("""
                SELECT MONTH(v.fecha), SUM(v.total)
                FROM Venta v
                WHERE YEAR(v.fecha) = :anio
                GROUP BY MONTH(v.fecha)
                ORDER BY MONTH(v.fecha) ASC
            """)
    List<Object[]> consolidadoMensual(int anio);

    // Ventas por método de pago con conteo
    @Query("""
                SELECT m.nombre, COUNT(v), SUM(v.total)
                FROM Venta v
                JOIN v.metodoPago m
                GROUP BY m.nombre
            """)
    List<Object[]> ventasPorMetodoPagoResumen();
}