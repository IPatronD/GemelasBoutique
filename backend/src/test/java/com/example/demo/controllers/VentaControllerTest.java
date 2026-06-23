package com.example.demo.controllers;

import com.example.demo.models.Venta;
import com.example.demo.service.VentaService;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class VentaControllerTest {

    @Mock
    private VentaService service;

    @InjectMocks
    private VentaController ventaController;

    @Test
    void listar() {

        Venta v1 = new Venta();
        v1.setTotal(200.0);

        when(service.listar())
                .thenReturn(List.of(v1));

        ResponseEntity<List<Venta>> response =
                ventaController.listar();

        assertEquals(200,
                response.getStatusCode().value());

        assertEquals(1,
                response.getBody().size());

        verify(service, times(1))
                .listar();
    }

    @Test
    void guardar() {

        Venta venta = new Venta();
        venta.setTotal(500.0);

        when(service.guardar(any(Venta.class)))
                .thenReturn(venta);

        ResponseEntity<Venta> response =
                ventaController.guardar(venta);

        assertEquals(201,
                response.getStatusCode().value());

        assertNotNull(response.getBody());

        assertEquals(500.0,
                response.getBody().getTotal());

        verify(service, times(1))
                .guardar(venta);
    }

    @Test
    void obtener() {

        Long id = 1L;

        Venta venta = new Venta();
        venta.setId(id);
        venta.setTotal(350.0);

        when(service.obtener(id))
                .thenReturn(venta);

        ResponseEntity<Venta> response =
                ventaController.obtener(id);

        assertEquals(200,
                response.getStatusCode().value());

        assertEquals(id,
                response.getBody().getId());

        assertEquals(350.0,
                response.getBody().getTotal());

        verify(service, times(1))
                .obtener(id);
    }

    @Test
    void eliminar() {

        doNothing().when(service)
                .eliminar(1L);

        ResponseEntity<Void> response =
                ventaController.eliminar(1L);

        assertEquals(204,
                response.getStatusCode().value());

        verify(service, times(1))
                .eliminar(1L);
    }
}