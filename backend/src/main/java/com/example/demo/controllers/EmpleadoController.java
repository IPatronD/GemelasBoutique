package com.example.demo.controllers;

import com.example.demo.models.Empleado;
import com.example.demo.service.EmpleadoService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Controlador REST
@RestController

// Ruta base
@RequestMapping("/api/empleados")
public class EmpleadoController {

    // Servicio
    private final EmpleadoService service;

    // Constructor
    public EmpleadoController(EmpleadoService service) {
        this.service = service;
    }

    // CRUD

    // Listar empleados
    @GetMapping
    public ResponseEntity<List<Empleado>> listar() {

        return ResponseEntity.ok(service.listar());
    }

    // Guardar empleado
    @PostMapping
    public ResponseEntity<Empleado> guardar(
            @Valid @RequestBody Empleado empleado) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.guardar(empleado));
    }

    // Buscar empleado por id
    @GetMapping("/{id}")
    public ResponseEntity<Empleado> obtener(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                service.obtener(id));
    }

    // Actualizar empleado
    @PutMapping("/{id}")
    public ResponseEntity<Empleado> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody Empleado empleado) {

        return ResponseEntity.ok(
                service.actualizar(id, empleado));
    }

    // Eliminar empleado
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(
            @PathVariable Long id) {

        service.eliminar(id);

        return ResponseEntity.noContent().build();
    }

    // CONSULTAS PERSONALIZADAS

    // Buscar por DNI
    @GetMapping("/dni/{dni}")
    public ResponseEntity<Empleado> buscarPorDni(
            @PathVariable String dni) {

        return ResponseEntity.ok(
                service.buscarPorDni(dni));
    }

    // Buscar por correo
    @GetMapping("/correo/{correo}")
    public ResponseEntity<Empleado> buscarPorCorreo(
            @PathVariable String correo) {

        return ResponseEntity.ok(
                service.buscarPorCorreo(correo));
    }

    // Buscar por apellidos
    @GetMapping("/apellidos/{apellidos}")
    public ResponseEntity<List<Empleado>> buscarPorApellidos(
            @PathVariable String apellidos) {

        return ResponseEntity.ok(
                service.buscarPorApellidos(apellidos));
    }

    // Buscar por nombre
    @GetMapping("/nombre/{nombre}")
    public ResponseEntity<List<Empleado>> buscarPorNombre(
            @PathVariable String nombre) {

        return ResponseEntity.ok(
                service.buscarPorNombre(nombre));
    }

    // Verificar DNI
    @GetMapping("/existe-dni/{dni}")
    public ResponseEntity<Boolean> existeDni(
            @PathVariable String dni) {

        return ResponseEntity.ok(
                service.existeDni(dni));
    }

    // Verificar correo
    @GetMapping("/existe-correo/{correo}")
    public ResponseEntity<Boolean> existeCorreo(
            @PathVariable String correo) {

        return ResponseEntity.ok(
                service.existeCorreo(correo));
    }
}