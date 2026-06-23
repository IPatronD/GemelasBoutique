package com.example.demo.service.impl;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import com.example.demo.models.DetalleVenta;
import com.example.demo.repository.DetalleVentaRepository;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
// Habilita Mockito en JUnit 5
class DetalleVentaServiceImplTest {

    @Mock // Simula el repositorio
    private DetalleVentaRepository repository;

    @InjectMocks // Inyecta el mock en el servicio
    private DetalleVentaServiceImpl service;

    private DetalleVenta detalle; // Objeto de prueba

    @BeforeEach // Se ejecuta antes de cada test
    void setUp() {
        detalle = new DetalleVenta();
        detalle.setId(1L);
        detalle.setCantidad(2);
        detalle.setPrecio(50.0);
    }

    @Test // Prueba listar()
    void listar() {
        // Simula lista con un elemento
        when(repository.findAll()).thenReturn(Arrays.asList(detalle));

        var lista = service.listar();

        // Validación
        assertEquals(1, lista.size());

        // Verifica interacción
        verify(repository).findAll();
    }

    @Test // Prueba guardar()
    void guardar() {
        // Simula guardado
        when(repository.save(detalle)).thenReturn(detalle);

        DetalleVenta resultado = service.guardar(detalle);

        // Validaciones
        assertNotNull(resultado);
        assertEquals(2, resultado.getCantidad());

        verify(repository).save(detalle);
    }

    @Test // Prueba obtener por ID
    void obtenerPorId() {
        // Simula búsqueda exitosa
        when(repository.findById(1L)).thenReturn(Optional.of(detalle));

        DetalleVenta resultado = service.obtenerPorId(1L);

        assertEquals(1L, resultado.getId());
        verify(repository).findById(1L);
    }

    @Test
    void eliminar() {

        // Simula búsqueda exitosa
        when(repository.findById(1L))
                .thenReturn(Optional.of(detalle));

        // Ejecuta método
        assertDoesNotThrow(() -> service.eliminar(1L));

        // Verifica interacciones
        verify(repository).findById(1L);
        verify(repository).delete(detalle);
    }
}