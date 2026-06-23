package com.example.demo.repository;

import com.example.demo.models.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
//BY JAMES

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

    // Productos más vendidos
    @Query("""
        SELECT d.producto.nombre, SUM(d.cantidad)
        FROM DetalleVenta d
        GROUP BY d.producto.nombre
        ORDER BY SUM(d.cantidad) DESC
    """)
    List<Object[]> productosMasVendidos();

    boolean existsByNombre(String nombre);

}
