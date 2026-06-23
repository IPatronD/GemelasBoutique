package com.example.demo.service.impl;

import com.example.demo.models.Cliente;
import com.example.demo.repository.ClienteRepository;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
// Habilita Mockito en JUnit 5
class ClienteServiceImplTest {

    @Mock // Simula el repositorio
    private ClienteRepository repository;

    @InjectMocks // Inyecta el mock en el servicio
    private ClienteServiceImpl service;

    @Test // Prueba listar()
    void listar_DebeRetornarLista() {
        // Simula que el repositorio devuelve una lista
        when(repository.findAll()).thenReturn(Arrays.asList(new Cliente()));

        // Ejecuta el método
        List<Cliente> response = service.listar();

        // Validación
        assertNotNull(response);

        // Verifica que se llamó al repositorio
        verify(repository).findAll();
    }

    @Test // Prueba guardar()
    void guardar_DebeGuardarCliente() {
        Cliente cliente = new Cliente();
        cliente.setId(1L);

        // Simula guardado
        when(repository.save(cliente)).thenReturn(cliente);

        // Ejecuta el método
        Cliente response = service.guardar(cliente);

        // Validaciones
        assertNotNull(response);
        assertEquals(1L, response.getId());

        // Verifica llamada
        verify(repository).save(cliente);
    }

    @Test // Prueba buscar por ID cuando existe
    void buscarPorId_DebeRetornarCliente() {
        Cliente cliente = new Cliente();
        cliente.setId(1L);

        // Simula búsqueda exitosa
        when(repository.findById(1L)).thenReturn(Optional.of(cliente));

        Cliente response = service.buscarPorId(1L);

        // Validaciones
        assertNotNull(response);
        assertEquals(1L, response.getId());
    }

    @Test
    void buscarPorId_NoExiste_DebeLanzarExcepcion() {

        when(repository.findById(1L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> service.buscarPorId(1L)
        );

        assertEquals("Cliente no encontrado", exception.getMessage());

        verify(repository).findById(1L);
    }

    @Test
    void eliminar_DebeLlamarRepository() {

        Cliente cliente = new Cliente();
        cliente.setId(1L);

        // Simula que el cliente existe
        when(repository.findById(1L)).thenReturn(Optional.of(cliente));

        // Ejecuta
        assertDoesNotThrow(() -> service.eliminar(1L));

        // Verificaciones
        verify(repository).findById(1L);
        verify(repository).delete(cliente);
    }
}