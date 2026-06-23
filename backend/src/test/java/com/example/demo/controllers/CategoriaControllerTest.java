package com.example.demo.controllers;

import com.example.demo.models.Categoria;
import com.example.demo.service.CategoriaService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CategoriaControllerTest {

    @Mock
    private CategoriaService service;

    @InjectMocks
    private CategoriaController controller;

    private Categoria categoria;

    @BeforeEach
    void setUp() {

        MockitoAnnotations.openMocks(this);

        categoria = new Categoria();
        categoria.setId(1L);
        categoria.setNombre("Electrónica");
    }

    @Test
    void testListar() {

        when(service.listar())
                .thenReturn(Arrays.asList(categoria));

        ResponseEntity<List<Categoria>> response =
                controller.listar();

        assertNotNull(response);
        assertEquals(1,
                response.getBody().size());

        verify(service, times(1)).listar();
    }

    @Test
    void testGuardar() {

        when(service.guardar(any(Categoria.class)))
                .thenReturn(categoria);

        ResponseEntity<Categoria> response =
                controller.guardar(categoria);

        assertNotNull(response);
        assertEquals("Electrónica",
                response.getBody().getNombre());

        verify(service, times(1))
                .guardar(categoria);
    }

    @Test
    void testObtener() {

        when(service.obtener(1L))
                .thenReturn(categoria);

        ResponseEntity<Categoria> response =
                controller.obtener(1L);

        assertNotNull(response);
        assertEquals(1L,
                response.getBody().getId());

        verify(service, times(1))
                .obtener(1L);
    }

    @Test
    void testActualizar() {

        when(service.actualizar(eq(1L),
                any(Categoria.class)))
                .thenReturn(categoria);

        ResponseEntity<Categoria> response =
                controller.actualizar(1L, categoria);

        assertNotNull(response);
        assertEquals("Electrónica",
                response.getBody().getNombre());

        verify(service, times(1))
                .actualizar(1L, categoria);
    }

    @Test
    void testEliminar() {

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