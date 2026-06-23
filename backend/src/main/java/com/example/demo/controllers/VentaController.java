package com.example.demo.controllers;

import com.example.demo.models.Venta;
import com.example.demo.service.VentaService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Controlador REST
@RestController

// Ruta base
@RequestMapping("/api/ventas")
public class VentaController {

    // Servicio
    private final VentaService service;

    // Constructor
    public VentaController(VentaService service) {
        this.service = service;
    }

    // Listar ventas
    @GetMapping
    public ResponseEntity<List<Venta>> listar() {

        return ResponseEntity.ok(service.listar());
    }

    // Guardar venta
    @PostMapping
    public ResponseEntity<Venta> guardar(
            @Valid @RequestBody Venta venta) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.guardar(venta));
    }

    // Buscar venta por id
    @GetMapping("/{id}")
    public ResponseEntity<Venta> obtener(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                service.obtener(id));
    }

    // Eliminar venta
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(
            @PathVariable Long id) {

        service.eliminar(id);

        return ResponseEntity.noContent().build();
    }
}