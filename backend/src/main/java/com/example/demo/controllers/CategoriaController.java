package com.example.demo.controllers;

import com.example.demo.models.Categoria;
import com.example.demo.service.CategoriaService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Controlador REST
@RestController

// Ruta base
@RequestMapping("/api/categorias")
public class CategoriaController {

    // Servicio de categoria
    private final CategoriaService service;

    // Constructor
    public CategoriaController(CategoriaService service) {
        this.service = service;
    }

    // Listar categorias
    @GetMapping
    public ResponseEntity<List<Categoria>> listar() {

        return ResponseEntity.ok(service.listar());
    }

    // Guardar categoria
    @PostMapping
    public ResponseEntity<Categoria> guardar(
            @Valid @RequestBody Categoria categoria) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.guardar(categoria));
    }

    // Buscar categoria por id
    @GetMapping("/{id}")
    public ResponseEntity<Categoria> obtener(
            @PathVariable Long id) {

        return ResponseEntity.ok(service.obtener(id));
    }

    // Actualizar categoria
    @PutMapping("/{id}")
    public ResponseEntity<Categoria> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody Categoria categoria) {

        return ResponseEntity.ok(
                service.actualizar(id, categoria));
    }

    // Eliminar categoria
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(
            @PathVariable Long id) {

        service.eliminar(id);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/productos-mas-vendidos")
    public ResponseEntity<List<Object[]>> productosMasVendidos() {

        return ResponseEntity.ok(
                service.productosMasVendidos());
    }

}