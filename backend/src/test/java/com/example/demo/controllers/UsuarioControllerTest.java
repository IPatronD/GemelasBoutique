package com.example.demo.controllers;

import com.example.demo.models.Usuario;
import com.example.demo.service.UsuarioService;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UsuarioControllerTest {

    @Mock
    private UsuarioService service;

    @InjectMocks
    private UsuarioController controller;

    // =========================
    // LISTAR
    // =========================
    @Test
    void listar_DebeRetornarLista() {

        when(service.listar()).thenReturn(Collections.emptyList());

        ResponseEntity<List<Usuario>> response = controller.listar();

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(0, response.getBody().size());

        verify(service).listar();
    }

    // =========================
    // OBTENER
    // =========================
    @Test
    void obtener_DebeRetornarUsuario() {

        Usuario u = new Usuario();
        u.setId(1L);

        when(service.obtener(1L)).thenReturn(u);

        ResponseEntity<Usuario> response = controller.obtener(1L);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(1L, response.getBody().getId());

        verify(service).obtener(1L);
    }

    // =========================
    // GUARDAR
    // =========================
    @Test
    void guardar_DebeGuardarUsuario() {

        Usuario u = new Usuario();
        u.setId(1L);

        when(service.guardar(u)).thenReturn(u);

        ResponseEntity<Usuario> response = controller.guardar(u);

        assertNotNull(response);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(1L, response.getBody().getId());

        verify(service).guardar(u);
    }

    // =========================
    // ACTUALIZAR
    // =========================
    @Test
    void actualizar_DebeActualizarUsuario() {

        Usuario u = new Usuario();
        u.setId(1L);

        when(service.actualizar(eq(1L), any(Usuario.class))).thenReturn(u);

        ResponseEntity<Usuario> response = controller.actualizar(1L, u);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(1L, response.getBody().getId());

        verify(service).actualizar(eq(1L), any(Usuario.class));
    }

    // =========================
    // ELIMINAR
    // =========================
    @Test
    void eliminar_DebeLlamarService() {

        controller.eliminar(1L);

        verify(service).eliminar(1L);
    }
}