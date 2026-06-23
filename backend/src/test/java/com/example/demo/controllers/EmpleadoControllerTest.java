package com.example.demo.controllers;

import com.example.demo.models.Empleado;
import com.example.demo.service.EmpleadoService;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
// Habilita Mockito en JUnit 5
class EmpleadoControllerTest {

    @Mock
    // Mock del servicio
    private EmpleadoService service;

    @InjectMocks
    // Inyecta el mock en el controlador
    private EmpleadoController controller;

    @Test
        // Prueba listar()
    void listar_DebeRetornarLista() {

        // Simula lista vacía
        when(service.listar())
                .thenReturn(Collections.emptyList());

        // Ejecuta método
        ResponseEntity<List<Empleado>> response =
                controller.listar();

        // Verifica status
        assertEquals(200,
                response.getStatusCode().value());

        // Verifica body
        assertNotNull(response.getBody());

        // Verifica llamada
        verify(service, times(1))
                .listar();
    }

    @Test
        // Prueba obtener()
    void obtener_DebeRetornarEmpleado() {

        Empleado e = new Empleado();
        e.setId(1L);

        // Simula búsqueda
        when(service.obtener(1L))
                .thenReturn(e);

        // Ejecuta método
        ResponseEntity<Empleado> response =
                controller.obtener(1L);

        // Verifica status
        assertEquals(200,
                response.getStatusCode().value());

        // Verifica ID
        assertEquals(1L,
                response.getBody().getId());

        verify(service, times(1))
                .obtener(1L);
    }

    @Test
        // Prueba guardar()
    void guardar_DebeGuardarEmpleado() {

        Empleado e = new Empleado();
        e.setId(1L);

        // Simula guardado
        when(service.guardar(e))
                .thenReturn(e);

        // Ejecuta método
        ResponseEntity<Empleado> response =
                controller.guardar(e);

        // Verifica status CREATED
        assertEquals(201,
                response.getStatusCode().value());

        // Verifica body
        assertNotNull(response.getBody());

        verify(service, times(1))
                .guardar(e);
    }

    @Test
        // Prueba actualizar()
    void actualizar_DebeActualizarEmpleado() {

        Empleado e = new Empleado();
        e.setId(1L);

        // Simula actualización
        when(service.actualizar(eq(1L), any(Empleado.class)))
                .thenReturn(e);

        // Ejecuta método
        ResponseEntity<Empleado> response =
                controller.actualizar(1L, e);

        // Verifica status
        assertEquals(200,
                response.getStatusCode().value());

        // Verifica ID
        assertEquals(1L,
                response.getBody().getId());

        verify(service, times(1))
                .actualizar(eq(1L), any(Empleado.class));
    }

    @Test
        // Prueba eliminar()
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

    @Test
        // Prueba buscarPorDni()
    void buscarPorDni() {

        Empleado e = new Empleado();
        e.setDni("12345678");

        when(service.buscarPorDni("12345678"))
                .thenReturn(e);

        ResponseEntity<Empleado> response =
                controller.buscarPorDni("12345678");

        assertEquals(200,
                response.getStatusCode().value());

        assertEquals("12345678",
                response.getBody().getDni());

        verify(service, times(1))
                .buscarPorDni("12345678");
    }

    @Test
        // Prueba buscarPorCorreo()
    void buscarPorCorreo() {

        Empleado e = new Empleado();
        e.setCorreo("test@gmail.com");

        when(service.buscarPorCorreo("test@gmail.com"))
                .thenReturn(e);

        ResponseEntity<Empleado> response =
                controller.buscarPorCorreo("test@gmail.com");

        assertEquals(200,
                response.getStatusCode().value());

        assertEquals("test@gmail.com",
                response.getBody().getCorreo());

        verify(service, times(1))
                .buscarPorCorreo("test@gmail.com");
    }

    @Test
        // Prueba buscarPorApellidos()
    void buscarPorApellidos() {

        Empleado e = new Empleado();
        e.setApellidos("Perez");

        when(service.buscarPorApellidos("Perez"))
                .thenReturn(List.of(e));

        ResponseEntity<List<Empleado>> response =
                controller.buscarPorApellidos("Perez");

        assertEquals(200,
                response.getStatusCode().value());

        assertEquals(1,
                response.getBody().size());

        verify(service, times(1))
                .buscarPorApellidos("Perez");
    }

    @Test
        // Prueba buscarPorNombre()
    void buscarPorNombre() {

        Empleado e = new Empleado();
        e.setNombres("Juan");

        when(service.buscarPorNombre("Juan"))
                .thenReturn(List.of(e));

        ResponseEntity<List<Empleado>> response =
                controller.buscarPorNombre("Juan");

        assertEquals(200,
                response.getStatusCode().value());

        assertEquals(1,
                response.getBody().size());

        verify(service, times(1))
                .buscarPorNombre("Juan");
    }

    @Test
        // Prueba existeDni()
    void existeDni() {

        when(service.existeDni("12345678"))
                .thenReturn(true);

        ResponseEntity<Boolean> response =
                controller.existeDni("12345678");

        assertEquals(200,
                response.getStatusCode().value());

        assertTrue(response.getBody());

        verify(service, times(1))
                .existeDni("12345678");
    }

    @Test
        // Prueba existeCorreo()
    void existeCorreo() {

        when(service.existeCorreo("test@gmail.com"))
                .thenReturn(true);

        ResponseEntity<Boolean> response =
                controller.existeCorreo("test@gmail.com");

        assertEquals(200,
                response.getStatusCode().value());

        assertTrue(response.getBody());

        verify(service, times(1))
                .existeCorreo("test@gmail.com");
    }
}