package com.example.demo.controllers;

import com.example.demo.models.Permiso;
import com.example.demo.service.PermisoService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Controlador REST
@RestController

// Ruta base
@RequestMapping("/api/permisos")
public class PermisoController {

    // Servicio
    private final PermisoService service;

    // Constructor
    public PermisoController(PermisoService service) {
        this.service = service;
    }

    // Listar permisos
    @GetMapping
    public ResponseEntity<List<Permiso>> listar() {

        return ResponseEntity.ok(service.listar());
    }

    // Guardar permiso
    @PostMapping
    public ResponseEntity<Permiso> guardar(
            @Valid @RequestBody Permiso permiso) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.guardar(permiso));
    }

    // Buscar permiso por id
    @GetMapping("/{id}")
    public ResponseEntity<Permiso> obtenerPorId(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                service.obtenerPorId(id));
    }

    // Actualizar permiso
    @PutMapping("/{id}")
    public ResponseEntity<Permiso> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody Permiso permiso) {

        return ResponseEntity.ok(
                service.actualizar(id, permiso));
    }

    // Eliminar permiso
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(
            @PathVariable Long id) {

        service.eliminar(id);

        return ResponseEntity.noContent().build();
    }
}