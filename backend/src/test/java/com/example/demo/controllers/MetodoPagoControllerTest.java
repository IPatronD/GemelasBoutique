package com.example.demo.controllers;

import com.example.demo.models.MetodoPago;
import com.example.demo.service.MetodoPagoService;

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
class MetodoPagoControllerTest {

    @Mock
    private MetodoPagoService service;

    @InjectMocks
    private MetodoPagoController controller;

    private MetodoPago metodo;

    @BeforeEach
    void setUp() {
        metodo = new MetodoPago();
        metodo.setId(1L);
        metodo.setNombre("Efectivo");
    }

    @Test
    void listar() {

        when(service.listar())
                .thenReturn(Arrays.asList(metodo));

        ResponseEntity<List<MetodoPago>> response =
                controller.listar();

        assertEquals(200,
                response.getStatusCode().value());

        assertEquals(1,
                response.getBody().size());

        verify(service, times(1))
                .listar();
    }

    @Test
    void guardar() {

        when(service.guardar(metodo))
                .thenReturn(metodo);

        ResponseEntity<MetodoPago> response =
                controller.guardar(metodo);

        assertEquals(201,
                response.getStatusCode().value());

        assertNotNull(response.getBody());

        verify(service, times(1))
                .guardar(metodo);
    }

    @Test
    void actualizar() {

        when(service.actualizar(1L, metodo))
                .thenReturn(metodo);

        ResponseEntity<MetodoPago> response =
                controller.actualizar(1L, metodo);

        assertEquals(200,
                response.getStatusCode().value());

        assertNotNull(response.getBody());

        verify(service, times(1))
                .actualizar(1L, metodo);
    }

    @Test
    void eliminar() {

        doNothing().when(service)
                .eliminar(1L);

        ResponseEntity<Void> response =
                controller.eliminar(1L);

        assertEquals(204,
                response.getStatusCode().value());

        verify(service, times(1))
                .eliminar(1L);
    }
}