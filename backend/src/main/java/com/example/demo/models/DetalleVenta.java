package com.example.demo.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Setter // Genera setters
@Getter // Genera getters
@Entity // Entidad de la BD
@Table(name = "detalle_venta")
public class DetalleVenta {

    @Id // Clave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // ID autogenerado (auto-incremental)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "venta_id", nullable = false)
    // Muchos detalles pertenecen a una venta
    private Venta venta;

    @ManyToOne
    @JoinColumn(name = "producto_id", nullable = false)
    // Muchos detalles pueden tener el mismo producto
    private Producto producto;

    private Double descuentoPorcentaje = 0.0; // Porcentaje de descuento por ítem
    private Double descuentoMonto = 0.0; // Monto del descuento calculado
    private Double neto = 0.0; // Subtotal neto por ítem (subtotal - descuentoMonto)
    @Positive(message = "La cantidad debe ser mayor a 0")
    // Cantidad vendida
    private int cantidad; // Cantidad de productos vendidos

    @Positive(message = "El precio debe ser mayor a 0")
    // Precio del producto
    private Double precio; // Precio del producto en la venta

    @Positive(message = "El subtotal debe ser mayor a 0")
    // Total del detalle
    private Double subtotal; // Subtotal por ítem (cantidad * precio)

    // Constructor vacío
    public DetalleVenta() {
    }
}