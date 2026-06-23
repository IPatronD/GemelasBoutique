package com.example.demo.service.impl;

import com.example.demo.models.Categoria;
import com.example.demo.repository.CategoriaRepository;

import org.junit.jupiter.api.BeforeEach;
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
class CategoriaServiceImplTest {

    @Mock
    private CategoriaRepository repository;

    @InjectMocks
    private CategoriaServiceImpl service;

    private Categoria categoria;

    @BeforeEach
    void setUp() {

        categoria = new Categoria();
        categoria.setId(1L);
        categoria.setNombre("Electrónica");
        categoria.setDescripcion("Dispositivos electrónicos");
    }

    @Test
    void testListar() {

        when(repository.findAll()).thenReturn(Arrays.asList(categoria));

        List<Categoria> resultado = service.listar();

        assertNotNull(resultado);
        assertEquals(1, resultado.size());

        verify(repository, times(1)).findAll();
    }

    @Test
    void testGuardar() {

        when(repository.save(any(Categoria.class))).thenReturn(categoria);

        Categoria resultado = service.guardar(categoria);

        assertNotNull(resultado);
        assertEquals("Electrónica", resultado.getNombre());

        verify(repository, times(1)).save(categoria);
    }

    @Test
    void testObtener_existente() {

        when(repository.findById(1L)).thenReturn(Optional.of(categoria));

        Categoria resultado = service.obtener(1L);

        assertNotNull(resultado);
        assertEquals(1L, resultado.getId());

        verify(repository, times(1)).findById(1L);
    }

    @Test
    void testObtener_noExistente() {

        when(repository.findById(1L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> service.obtener(1L)
        );

        assertEquals("Categoría no encontrada", exception.getMessage());

        verify(repository, times(1)).findById(1L);
    }

    @Test
    void testActualizar_existente() {

        Categoria nuevosDatos = new Categoria();
        nuevosDatos.setNombre("Hogar");
        nuevosDatos.setDescripcion("Artículos del hogar");

        when(repository.findById(1L)).thenReturn(Optional.of(categoria));
        when(repository.save(any(Categoria.class))).thenReturn(categoria);

        Categoria resultado = service.actualizar(1L, nuevosDatos);

        assertNotNull(resultado);
        assertEquals("Hogar", resultado.getNombre());
        assertEquals("Artículos del hogar", resultado.getDescripcion());

        verify(repository).findById(1L);
        verify(repository).save(categoria);
    }

    @Test
    void testActualizar_noExistente() {

        when(repository.findById(1L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> service.actualizar(1L, categoria)
        );

        assertEquals("Categoría no encontrada", exception.getMessage());

        verify(repository).findById(1L);
        verify(repository, never()).save(any());
    }

    @Test
    void testEliminar() {

        // Simula que la categoría existe
        when(repository.findById(1L)).thenReturn(Optional.of(categoria));

        // Verifica que no lance excepción
        assertDoesNotThrow(() -> service.eliminar(1L));

        // Verifica búsqueda
        verify(repository).findById(1L);

        // Verifica eliminación correcta
        verify(repository).delete(categoria);
    }
}