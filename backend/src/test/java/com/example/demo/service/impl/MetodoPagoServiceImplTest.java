package com.example.demo.service.impl;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.demo.models.MetodoPago;
import com.example.demo.repository.MetodoPagoRepository;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
// Habilita Mockito en JUnit 5
class MetodoPagoServiceImplTest {

    @Mock // Simula el repositorio
    private MetodoPagoRepository repository;

    @InjectMocks // Inyecta el mock en el servicio
    private MetodoPagoServiceImpl service;

    private MetodoPago metodo; // Objeto de prueba

    @BeforeEach // Se ejecuta antes de cada test
    void setUp() {
        metodo = new MetodoPago();
        metodo.setId(1L);
        metodo.setNombre("Efectivo");
    }

    @Test // Prueba listar()
    void listar() {
        // Simula lista con un elemento
        when(repository.findAll()).thenReturn(Arrays.asList(metodo));

        var lista = service.listar();

        // Validación
        assertEquals(1, lista.size());

        verify(repository).findAll();
    }

    @Test // Prueba guardar()
    void guardar() {
        // Mejor usar any() para mayor flexibilidad
        when(repository.save(any(MetodoPago.class))).thenReturn(metodo);

        MetodoPago resultado = service.guardar(metodo);

        // Validaciones
        assertNotNull(resultado);
        assertEquals("Efectivo", resultado.getNombre());

        verify(repository).save(metodo);
    }

    @Test // Prueba actualizar()
    void actualizar() {
        MetodoPago nuevo = new MetodoPago();
        nuevo.setNombre("Yape");

        // Simula que encuentra el método existente
        when(repository.findById(1L)).thenReturn(Optional.of(metodo));

        // Devolver el mismo objeto actualizado
        when(repository.save(any(MetodoPago.class))).thenAnswer(inv -> inv.getArgument(0));

        MetodoPago resultado = service.actualizar(1L, nuevo);

        // Validaciones
        assertEquals("Yape", resultado.getNombre());

        verify(repository).findById(1L);
        verify(repository).save(metodo);
    }

    @Test // Prueba eliminar()
    void eliminar() {

        // Simula que el método existe
        when(repository.findById(1L))
                .thenReturn(Optional.of(metodo));

        // Simula eliminación
        doNothing().when(repository)
                .delete(metodo);

        service.eliminar(1L);

        // Verificaciones
        verify(repository).findById(1L);
        verify(repository).delete(metodo);
    }
}