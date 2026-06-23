package com.example.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity // Entidad de la BD
@Table(name = "clientes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cliente {

    @Id // Clave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // ID autogenerado (auto-incremental)
    private Long id;

    @NotBlank(message = "El tipo es obligatorio")
    @Size(min = 3, max = 50)
    // Tipo de cliente
    private String tipo;

    @NotBlank(message = "Los nombres son obligatorios")
    @Size(min = 3, max = 100)
    // Nombre del cliente
    private String nombres;

    @NotBlank(message = "El documento es obligatorio")
    @Column(unique = true, length = 15, nullable = false)
    // Documento único
    private String documento;

    @NotBlank(message = "El teléfono es obligatorio")
    @Pattern(regexp = "\\d{9}", message = "Debe tener 9 dígitos")
    @Column(length = 9, nullable = false)
    private String telefono;

    @Email(message = "Correo inválido")
    @Column(unique = true, nullable = false)
    private String correo;

    @Column(nullable = false)
    // Estado del cliente
    private Boolean estado = true;

    @OneToMany(mappedBy = "cliente")
    // Un cliente puede tener muchas ventas
    @JsonIgnore // Evita bucle infinito
    private List<Venta> ventas;
}
