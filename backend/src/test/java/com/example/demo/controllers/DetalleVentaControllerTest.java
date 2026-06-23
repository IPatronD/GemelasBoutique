package com.example.demo.controllers;

import com.example.demo.models.DetalleVenta;
import com.example.demo.service.DetalleVentaService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
// Habilita Mockito en JUnit 5
class DetalleVentaControllerTest {

    @Mock
    // Mock del servicio
    private DetalleVentaService service;

    @InjectMocks
    // Inyecta el mock en el controlador
    private DetalleVentaController controller;

    private DetalleVenta detalle;

    @BeforeEach
        // Inicializa datos de prueba
    void setUp() {

        detalle = new DetalleVenta();
        detalle.setId(1L);
    }

    @Test
        // Prueba listar()
    void listar() {

        // Simula lista con un detalle
        when(service.listar())
                .thenReturn(Arrays.asList(detalle));

        // Ejecuta método
        ResponseEntity<List<DetalleVenta>> response =
                controller.listar();

        // Verifica status
        assertEquals(200,
                response.getStatusCode().value());

        // Verifica cantidad
        assertEquals(1,
                response.getBody().size());

        // Verifica llamada
        verify(service, times(1))
                .listar();
    }

    @Test
        // Prueba guardar()
    void guardar() {

        // Simula guardado
        when(service.guardar(detalle))
                .thenReturn(detalle);

        // Ejecuta método
        ResponseEntity<DetalleVenta> response =
                controller.guardar(detalle);

        // Verifica status CREATED
        assertEquals(201,
                response.getStatusCode().value());

        // Verifica body
        assertNotNull(response.getBody());

        // Verifica ID
        assertEquals(1L,
                response.getBody().getId());

        // Verifica llamada
        verify(service, times(1))
                .guardar(detalle);
    }

    @Test
        // Prueba obtenerPorId()
    void obtenerPorId() {

        // Simula búsqueda
        when(service.obtenerPorId(1L))
                .thenReturn(detalle);

        // Ejecuta método
        ResponseEntity<DetalleVenta> response =
                controller.obtenerPorId(1L);

        // Verifica status
        assertEquals(200,
                response.getStatusCode().value());

        // Verifica ID
        assertEquals(1L,
                response.getBody().getId());

        // Verifica llamada
        verify(service, times(1))
                .obtenerPorId(1L);
    }

    @Test
        // Prueba actualizar()
    void actualizar() {

        // Simula actualización
        when(service.actualizar(1L, detalle))
                .thenReturn(detalle);

        // Ejecuta método
        ResponseEntity<DetalleVenta> response =
                controller.actualizar(1L, detalle);

        // Verifica status
        assertEquals(200,
                response.getStatusCode().value());

        // Verifica ID
        assertEquals(1L,
                response.getBody().getId());

        // Verifica llamada
        verify(service, times(1))
                .actualizar(1L, detalle);
    }

    @Test
        // Prueba eliminar()
    void eliminar() {

        doNothing().when(service)
                .eliminar(1L);

        // Ejecuta método
        ResponseEntity<Void> response =
                controller.eliminar(1L);

        // Verifica status NO_CONTENT
        assertEquals(204,
                response.getStatusCode().value());

        // Verifica llamada
        verify(service, times(1))
                .eliminar(1L);
    }
}