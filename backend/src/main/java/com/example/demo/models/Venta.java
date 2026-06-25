package com.example.demo.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "ventas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Venta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime fecha;

    @Column(nullable = false)
    private Double total;

    // ====== CAMPOS DE NEGOCIO ======
    private Double subtotal; // Base imponible (compatibilidad)

    private Double descuento = 0.0; // descuento global en dinero
    private Double iva; // monto de IVA

    private Double subtotalBruto = 0.0; // suma precio * cantidad
    private Double totalDescItems = 0.0; // descuentos por ítems
    private Double subtotalNeto = 0.0; // bruto - desc ítems

    private Double descuentoGlobalPorcentaje = 0.0; // %
    private Double baseImponible = 0.0; // neto - descuento global

    private Double tasaIva = 16.0; // %

    // ====== RELACIONES ======

    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "metodo_pago_id", nullable = false)
    private MetodoPago metodoPago;

    @OneToMany(mappedBy = "venta", cascade = CascadeType.ALL)
    @com.fasterxml.jackson.annotation.JsonManagedReference
    private List<DetalleVenta> detalles;
}