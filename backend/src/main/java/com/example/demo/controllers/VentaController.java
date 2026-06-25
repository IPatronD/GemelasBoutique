package com.example.demo.controllers;

import com.example.demo.dto.ResumenDashboardDTO;
import com.example.demo.models.Venta;
import com.example.demo.service.VentaService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ventas")
public class VentaController {

    private final VentaService service;

    public VentaController(VentaService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Venta>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    @PostMapping
    public ResponseEntity<Venta> guardar(@Valid @RequestBody Venta venta) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.guardar(venta));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Venta> obtener(@PathVariable Long id) {
        return ResponseEntity.ok(service.obtener(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    // ← NUEVOS ENDPOINTS PARA EL DASHBOARD

    @GetMapping("/dashboard/resumen")
    public ResponseEntity<ResumenDashboardDTO> resumenDashboard(
            @RequestParam(defaultValue = "2026") int anio) {
        return ResponseEntity.ok(service.obtenerResumenDashboard(anio));
    }

    @GetMapping("/ultimas")
    public ResponseEntity<List<Venta>> ultimasVentas(
            @RequestParam(defaultValue = "5") int cantidad) {
        return ResponseEntity.ok(service.ultimasVentas(cantidad));
    }
}