package com.example.demo.controllers;

import com.example.demo.models.Cliente;
import com.example.demo.service.ClienteService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
// Habilita Mockito en JUnit 5
class ClienteControllerTest {

    @Mock
    // Mock del servicio
    private ClienteService service;

    @InjectMocks
    // Inyecta el mock en el controlador
    private ClienteController controller;

    @Test
        // Prueba del método listar()
    void listar_DebeRetornarLista() {

        // Simula lista vacía
        when(service.listar())
                .thenReturn(Collections.emptyList());

        // Ejecuta método
        ResponseEntity<List<Cliente>> response =
                controller.listar();

        // Verifica status HTTP
        assertEquals(200,
                response.getStatusCode().value());

        // Verifica body
        assertNotNull(response.getBody());

        // Verifica llamada al servicio
        verify(service, times(1))
                .listar();
    }

    @Test
        // Prueba del método buscar()
    void buscar_DebeRetornarCliente() {

        Cliente c = new Cliente();
        c.setId(1L);

        // Simula búsqueda
        when(service.buscarPorId(1L))
                .thenReturn(c);

        // Ejecuta método
        ResponseEntity<Cliente> response =
                controller.buscar(1L);

        // Verifica status
        assertEquals(200,
                response.getStatusCode().value());

        // Verifica ID
        assertEquals(1L,
                response.getBody().getId());

        verify(service, times(1))
                .buscarPorId(1L);
    }

    @Test
        // Prueba del método guardar()
    void guardar_DebeGuardarCliente() {

        Cliente c = new Cliente();
        c.setId(1L);

        // Simula guardado
        when(service.guardar(c))
                .thenReturn(c);

        // Ejecuta método
        ResponseEntity<Cliente> response =
                controller.guardar(c);

        // Verifica status CREATED
        assertEquals(201,
                response.getStatusCode().value());

        // Verifica body
        assertNotNull(response.getBody());

        // Verifica llamada
        verify(service, times(1))
                .guardar(c);
    }

    @Test
        // Prueba del método actualizar()
    void actualizar_DebeActualizarCliente() {

        Cliente c = new Cliente();
        c.setId(1L);

        // Simula actualización
        when(service.actualizar(1L, c))
                .thenReturn(c);

        // Ejecuta método
        ResponseEntity<Cliente> response =
                controller.actualizar(1L, c);

        // Verifica status
        assertEquals(200,
                response.getStatusCode().value());

        // Verifica body
        assertEquals(1L,
                response.getBody().getId());

        verify(service, times(1))
                .actualizar(1L, c);
    }

    @Test
        // Prueba del método eliminar()
    void eliminar_DebeLlamarService() {

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