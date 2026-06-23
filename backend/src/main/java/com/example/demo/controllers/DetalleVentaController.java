package com.example.demo.controllers;

import com.example.demo.models.DetalleVenta;
import com.example.demo.service.DetalleVentaService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Controlador REST
@RestController

// Ruta base
@RequestMapping("/api/detalle-ventas")
public class DetalleVentaController {

    // Servicio
    private final DetalleVentaService service;

    // Constructor
    public DetalleVentaController(DetalleVentaService service) {
        this.service = service;
    }

    // Listar detalles
    @GetMapping
    public ResponseEntity<List<DetalleVenta>> listar() {

        return ResponseEntity.ok(service.listar());
    }

    // Guardar detalle
    @PostMapping
    public ResponseEntity<DetalleVenta> guardar(
            @Valid @RequestBody DetalleVenta detalleVenta) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.guardar(detalleVenta));
    }

    // Buscar detalle por id
    @GetMapping("/{id}")
    public ResponseEntity<DetalleVenta> obtenerPorId(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                service.obtenerPorId(id));
    }

    // Actualizar detalle
    @PutMapping("/{id}")
    public ResponseEntity<DetalleVenta> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody DetalleVenta detalleVenta) {

        return ResponseEntity.ok(
                service.actualizar(id, detalleVenta));
    }

    // Eliminar detalle
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(
            @PathVariable Long id) {

        service.eliminar(id);

        return ResponseEntity.noContent().build();
    }
}