package com.example.demo.controllers;

import com.example.demo.models.Producto;
import com.example.demo.service.ProductoService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Controlador REST
@RestController

// Ruta base
@RequestMapping("/api/productos")
public class ProductoController {

    // Servicio
    private final ProductoService service;

    // Constructor
    public ProductoController(ProductoService service) {
        this.service = service;
    }

    // Listar productos
    @GetMapping
    public ResponseEntity<List<Producto>> listar() {

        return ResponseEntity.ok(service.listar());
    }

    // Guardar producto
    @PostMapping
    public ResponseEntity<Producto> guardar(
            @Valid @RequestBody Producto producto) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.guardar(producto));
    }

    // Buscar producto por id
    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtener(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                service.obtener(id));
    }

    // Actualizar producto
    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody Producto producto) {

        return ResponseEntity.ok(
                service.actualizar(id, producto));
    }

    // Eliminar producto
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(
            @PathVariable Long id) {

        service.eliminar(id);

        return ResponseEntity.noContent().build();
    }
}