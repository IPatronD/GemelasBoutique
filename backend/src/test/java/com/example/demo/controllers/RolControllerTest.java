package com.example.demo.controllers;

import com.example.demo.models.Rol;
import com.example.demo.service.RolService;

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
class RolControllerTest {

    @Mock
    // Simula el service
    private RolService service;

    @InjectMocks
    // Inyecta el mock en el controller
    private RolController controller;

    private Rol rol;

    @BeforeEach
    void setUp() {

        rol = new Rol();

        rol.setId(1L);
        rol.setNombre("ADMIN");
    }

    @Test
        // Prueba listar
    void listar() {

        when(service.listar())
                .thenReturn(Arrays.asList(rol));

        ResponseEntity<List<Rol>> response =
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

        when(service.guardar(rol))
                .thenReturn(rol);

        ResponseEntity<Rol> response =
                controller.guardar(rol);

        assertNotNull(response);

        assertEquals(HttpStatus.CREATED,
                response.getStatusCode());

        assertEquals("ADMIN",
                response.getBody().getNombre());

        verify(service).guardar(rol);
    }

    @Test
        // Prueba obtener por id
    void obtenerPorId() {

        when(service.obtenerPorId(1L))
                .thenReturn(rol);

        ResponseEntity<Rol> response =
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

        when(service.actualizar(1L, rol))
                .thenReturn(rol);

        ResponseEntity<Rol> response =
                controller.actualizar(1L, rol);

        assertNotNull(response);

        assertEquals(HttpStatus.OK,
                response.getStatusCode());

        assertEquals("ADMIN",
                response.getBody().getNombre());

        verify(service).actualizar(1L, rol);
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