package com.example.demo.controllers;

import com.example.demo.models.Permiso;
import com.example.demo.service.PermisoService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
// Habilita Mockito
class PermisoControllerTest {

    @Mock
    // Simula el service
    private PermisoService service;

    @InjectMocks
    // Inyecta el mock en el controller
    private PermisoController controller;

    private Permiso permiso;

    @BeforeEach
    void setUp() {

        permiso = new Permiso();

        permiso.setId(1L);
        permiso.setNombre("CREAR_USUARIO");
    }

    @Test
        // Prueba listar
    void listar() {

        when(service.listar())
                .thenReturn(Arrays.asList(permiso));

        ResponseEntity<List<Permiso>> response =
                controller.listar();

        assertNotNull(response);

        assertEquals(HttpStatus.OK,
                response.getStatusCode());

        assertEquals(1,
                response.getBody().size());

        verify(service).listar();
    }

    @Test
        // Prueba guardar
    void guardar() {

        when(service.guardar(permiso))
                .thenReturn(permiso);

        ResponseEntity<Permiso> response =
                controller.guardar(permiso);

        assertNotNull(response);

        assertEquals(HttpStatus.CREATED,
                response.getStatusCode());

        assertEquals("CREAR_USUARIO",
                response.getBody().getNombre());

        verify(service).guardar(permiso);
    }

    @Test
        // Prueba obtener por id
    void obtenerPorId() {

        when(service.obtenerPorId(1L))
                .thenReturn(permiso);

        ResponseEntity<Permiso> response =
                controller.obtenerPorId(1L);

        assertNotNull(response);

        assertEquals(HttpStatus.OK,
                response.getStatusCode());

        assertEquals(1L,
                response.getBody().getId());

        verify(service).obtenerPorId(1L);
    }

    @Test
        // Prueba actualizar
    void actualizar() {

        when(service.actualizar(1L, permiso))
                .thenReturn(permiso);

        ResponseEntity<Permiso> response =
                controller.actualizar(1L, permiso);

        assertNotNull(response);

        assertEquals(HttpStatus.OK,
                response.getStatusCode());

        assertEquals("CREAR_USUARIO",
                response.getBody().getNombre());

        verify(service).actualizar(1L, permiso);
    }

    @Test
        // Prueba eliminar
    void eliminar() {

        doNothing().when(service).eliminar(1L);

        ResponseEntity<Void> response =
                controller.eliminar(1L);

        assertEquals(HttpStatus.NO_CONTENT,
                response.getStatusCode());

        verify(service).eliminar(1L);
    }
}