package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.models.DetalleVenta;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface DetalleVentaRepository extends JpaRepository<DetalleVenta, Long> {

    // Productos más vendidos
    @Query("""
        SELECT d.producto.nombre, SUM(d.cantidad)
        FROM DetalleVenta d
        GROUP BY d.producto.nombre
        ORDER BY SUM(d.cantidad) DESC
    """)

    List<Object[]> productosMasVendidos();

}
