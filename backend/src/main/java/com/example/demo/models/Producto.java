package com.example.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
//BY JAMES

@Entity // Entidad de la BD
@Table(name = "productos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Producto {

    @Id // Clave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // ID autogenerado (auto-incremental)
    private Long id;

    @NotBlank(message = "El nombre es obligatorio")
    @Column(nullable = false, unique = true, length = 100)
    // Nombre del producto
    private String nombre;

    @Column(length = 255)
    // Descripción del producto
    private String descripcion;

    @Positive(message = "El precio debe ser mayor a 0")
    @Column(nullable = false)
    // Precio del producto
    private Double precio;

    @PositiveOrZero(message = "El stock no puede ser negativo")
    @Column(nullable = false)
    // Cantidad disponible
    private Integer stock;

    @ManyToOne
    @JoinColumn(name = "categoria_id", nullable = false)
    // Muchos productos pertenecen a una categoría
    private Categoria categoria;

    @OneToMany(mappedBy = "producto")
    // Un producto puede estar en muchos detalles
    @JsonIgnore // Evita bucle infinito
    private List<DetalleVenta> detallesVenta;
}