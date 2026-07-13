package com.example.demo.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity // Entidad de la BD
@Table(name = "usuarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id // Clave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El username es obligatorio")
    @Column(nullable = false, unique = true, length = 50)
    // Nombre de usuario
    private String username;

    @Column(nullable = false)
    // Contraseña del usuario
    private String password;

    @Column(nullable = false)
    // Estado del usuario
    private Boolean estado = true;

    @OneToOne
    @JoinColumn(name = "empleado_id", unique = true, nullable = false)
    // Un usuario pertenece a un empleado
    private Empleado empleado;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "usuario_roles", joinColumns = @JoinColumn(name = "usuario_id"), inverseJoinColumns = @JoinColumn(name = "rol_id"))
    // Un usuario puede tener muchos roles
    private Set<Rol> roles;
}