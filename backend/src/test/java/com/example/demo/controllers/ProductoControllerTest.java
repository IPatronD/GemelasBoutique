package com.example.demo.controllers;

import com.example.demo.models.Producto;
import com.example.demo.service.ProductoService;

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
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductoControllerTest {

    @Mock
    private ProductoService service;

    @InjectMocks
    private ProductoController controller;

    private Producto producto;

    @BeforeEach
    void setUp() {

        producto = new Producto();
        producto.setId(1L);
        producto.setNombre("Laptop");
        producto.setDescripcion("Laptop Gamer");
    }

    @Test
    void listar() {

        when(service.listar())
                .thenReturn(Arrays.asList(producto));

        ResponseEntity<List<Producto>> response =
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

        when(service.guardar(any(Producto.class)))
                .thenReturn(producto);

        ResponseEntity<Producto> response =
                controller.guardar(producto);

        assertEquals(201,
                response.getStatusCode().value());

        assertNotNull(response.getBody());

        assertEquals("Laptop",
                response.getBody().getNombre());

        verify(service, times(1))
                .guardar(producto);
    }

    @Test
    void obtener() {

        when(service.obtener(1L))
                .thenReturn(producto);

        ResponseEntity<Producto> response =
                controller.obtener(1L);

        assertEquals(200,
                response.getStatusCode().value());

        assertEquals(1L,
                response.getBody().getId());

        verify(service, times(1))
                .obtener(1L);
    }

    @Test
    void actualizar() {

        when(service.actualizar(eq(1L), any(Producto.class)))
                .thenReturn(producto);

        ResponseEntity<Producto> response =
                controller.actualizar(1L, producto);

        assertEquals(200,
                response.getStatusCode().value());

        assertEquals("Laptop",
                response.getBody().getNombre());

        verify(service, times(1))
                .actualizar(1L, producto);
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