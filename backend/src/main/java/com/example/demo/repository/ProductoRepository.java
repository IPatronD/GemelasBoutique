package com.example.demo.repository;

import com.example.demo.models.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductoRepository extends JpaRepository<Producto, Long> {

    // Buscar productos por categoría
    @Query("""
        SELECT p
        FROM Producto p
        JOIN p.categoria c
        WHERE c.nombre = :categoria
    """)
    List<Producto> buscarPorCategoria(String categoria);

    // Productos con stock bajo
    @Query("""
        SELECT p
        FROM Producto p
        WHERE p.stock < :cantidad
    """)
    List<Producto> stockBajo(int cantidad);

    // Buscar producto por nombre
    List<Producto> findByNombreContainingIgnoreCase(String nombre);

    // Verificar nombre repetido
    boolean existsByNombre(String nombre);

    // Productos con stock mayor a cierto valor
    List<Producto> findByStockGreaterThan(int stock);
}