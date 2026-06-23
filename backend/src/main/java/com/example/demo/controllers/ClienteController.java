package com.example.demo.controllers;

import com.example.demo.models.Cliente;
import com.example.demo.service.ClienteService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Controlador REST
@RestController

// Ruta base
@RequestMapping("/api/clientes")
public class ClienteController {

    // Servicio de cliente
    private final ClienteService service;

    // Constructor
    public ClienteController(ClienteService service) {
        this.service = service;
    }

    // Listar clientes
    @GetMapping
    public ResponseEntity<List<Cliente>> listar() {

        return ResponseEntity.ok(service.listar());
    }

    // Guardar cliente
    @PostMapping
    public ResponseEntity<Cliente> guardar(
            @Valid @RequestBody Cliente cliente) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.guardar(cliente));
    }

    // Buscar cliente por id
    @GetMapping("/{id}")
    public ResponseEntity<Cliente> buscar(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                service.buscarPorId(id));
    }

    // Actualizar cliente
    @PutMapping("/{id}")
    public ResponseEntity<Cliente> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody Cliente cliente) {

        return ResponseEntity.ok(
                service.actualizar(id, cliente));
    }

    // Eliminar cliente
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(
            @PathVariable Long id) {

        service.eliminar(id);

        return ResponseEntity.noContent().build();
    }
}