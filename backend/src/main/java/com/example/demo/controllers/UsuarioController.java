package com.example.demo.controllers;

import com.example.demo.models.Usuario;
import com.example.demo.service.UsuarioService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioService service;

    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    @PostMapping
    public ResponseEntity<Usuario> guardar(@Valid @RequestBody Usuario usuario) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.guardar(usuario));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtener(@PathVariable Long id) {
        return ResponseEntity.ok(service.obtener(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody Usuario usuario) {

        return ResponseEntity.ok(service.actualizar(id, usuario));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    // ✅ SOLO username (sin duplicados)
    @GetMapping("/username/{username}")
    public ResponseEntity<Usuario> buscarPorUsername(
            @PathVariable String username) {

        return ResponseEntity.ok(service.buscarPorUsername(username));
    }

    @GetMapping("/rol/{rol}")
    public ResponseEntity<List<Usuario>> buscarPorRol(
            @PathVariable String rol) {

        return ResponseEntity.ok(service.buscarPorRol(rol));
    }

    @GetMapping("/activos")
    public ResponseEntity<List<Usuario>> listarActivos() {
        return ResponseEntity.ok(service.listarActivos());
    }

    @GetMapping("/existe/{username}")
    public ResponseEntity<Boolean> existeUsername(
            @PathVariable String username) {

        return ResponseEntity.ok(service.existeUsername(username));
    }
}