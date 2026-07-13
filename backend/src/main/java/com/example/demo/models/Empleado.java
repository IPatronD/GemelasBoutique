package com.example.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity // Entidad de la BD
@Table(name = "empleados")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Empleado {

    @Id // Clave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Los nombres son obligatorios")
    @Size(min = 3, max = 50)
    // Nombres del empleado
    private String nombres;

    @NotBlank(message = "Los apellidos son obligatorios")
    @Size(min = 3, max = 50)
    // Apellidos del empleado
    private String apellidos;

    @NotBlank(message = "El DNI es obligatorio")
    @Pattern(regexp = "\\d{8}", message = "El DNI debe tener 8 dígitos")
    @Column(unique = true, length = 8, nullable = false)
    // DNI único
    private String dni;

    @NotBlank(message = "El correo es obligatorio")
    @Email(message = "Correo inválido")
    @Column(unique = true, nullable = false)
    // Correo único
    private String correo;

    @Column(nullable = false)
    // Estado del empleado
    private Boolean estado = true;

    @OneToOne(mappedBy = "empleado")
    // Un empleado tiene un usuario
    @JsonIgnore// Evita bucle infinito
    private Usuario usuario;
}