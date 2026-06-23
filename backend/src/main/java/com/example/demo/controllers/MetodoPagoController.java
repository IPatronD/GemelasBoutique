package com.example.demo.controllers;

import com.example.demo.models.MetodoPago;
import com.example.demo.service.MetodoPagoService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Controlador REST
@RestController

// Ruta base
@RequestMapping("/api/metodos-pago")
public class MetodoPagoController {

    // Servicio
    private final MetodoPagoService service;

    // Constructor
    public MetodoPagoController(MetodoPagoService service) {
        this.service = service;
    }

    // Listar métodos de pago
    @GetMapping
    public ResponseEntity<List<MetodoPago>> listar() {

        return ResponseEntity.ok(service.listar());
    }

    // Guardar método de pago
    @PostMapping
    public ResponseEntity<MetodoPago> guardar(
            @Valid @RequestBody MetodoPago metodoPago) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.guardar(metodoPago));
    }

    // Obtener método por id
    @GetMapping("/{id}")
    public ResponseEntity<MetodoPago> obtener(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                service.obtenerPorId(id));
    }

    // Actualizar método de pago
    @PutMapping("/{id}")
    public ResponseEntity<MetodoPago> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody MetodoPago metodoPago) {

        return ResponseEntity.ok(
                service.actualizar(id, metodoPago));
    }

    // Eliminar método de pago
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(
            @PathVariable Long id) {

        service.eliminar(id);

        return ResponseEntity.noContent().build();
    }
}