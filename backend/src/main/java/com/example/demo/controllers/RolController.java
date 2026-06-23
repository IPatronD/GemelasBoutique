package com.example.demo.controllers;

import com.example.demo.models.Rol;
import com.example.demo.service.RolService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Controlador REST
@RestController

// Ruta base
@RequestMapping("/api/roles")
public class RolController {

    // Servicio
    private final RolService service;

    // Constructor
    public RolController(RolService service) {
        this.service = service;
    }

    // Listar roles
    @GetMapping
    public ResponseEntity<List<Rol>> listar() {

        return ResponseEntity.ok(service.listar());
    }

    // Guardar rol
    @PostMapping
    public ResponseEntity<Rol> guardar(
            @Valid @RequestBody Rol rol) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.guardar(rol));
    }

    // Buscar rol por id
    @GetMapping("/{id}")
    public ResponseEntity<Rol> obtenerPorId(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                service.obtenerPorId(id));
    }

    // Actualizar rol
    @PutMapping("/{id}")
    public ResponseEntity<Rol> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody Rol rol) {

        return ResponseEntity.ok(
                service.actualizar(id, rol));
    }

    // Eliminar rol
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(
            @PathVariable Long id) {

        service.eliminar(id);

        return ResponseEntity.noContent().build();
    }
}