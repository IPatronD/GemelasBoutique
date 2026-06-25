package com.example.demo.repository;

import com.example.demo.models.Empleado;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EmpleadoRepository extends JpaRepository<Empleado, Long> {

    // Buscar empleado por DNI
    Optional<Empleado> findByDni(String dni);

    // Buscar empleado por correo
    Optional<Empleado> findByCorreo(String correo);

    // Buscar por apellidos
    List<Empleado> findByApellidosContainingIgnoreCase(String apellidos);

    // Buscar por nombres
    List<Empleado> findByNombresContainingIgnoreCase(String nombres);

    // Buscar empleados activos/inactivos
    List<Empleado> findByEstado(boolean estado);

    // Verificar DNI repetido
    boolean existsByDni(String dni);

    // Verificar correo repetido
    boolean existsByCorreo(String correo);

    List<Empleado> findByUsuarioIsNull();
}