package com.example.demo.service.impl;

import com.example.demo.models.Permiso;
import com.example.demo.repository.PermisoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PermisoServiceImplTest {

    @Mock
    private PermisoRepository repository;

    @InjectMocks
    private PermisoServiceImpl service;

    private Permiso permiso;

    @BeforeEach
    void setUp() {
        permiso = new Permiso();
        permiso.setId(1L);
        permiso.setNombre("ADMIN");
    }

    @Test
    void listar() {

        when(repository.findAll()).thenReturn(Arrays.asList(permiso));

        var lista = service.listar();

        assertEquals(1, lista.size());
        assertEquals("ADMIN", lista.get(0).getNombre());

        verify(repository).findAll();
    }

    @Test
    void guardar() {

        when(repository.save(any(Permiso.class))).thenReturn(permiso);

        Permiso resultado = service.guardar(permiso);

        assertNotNull(resultado);
        assertEquals("ADMIN", resultado.getNombre());

        verify(repository).save(permiso);
    }

    @Test
    void obtenerPorId() {

        when(repository.findById(1L)).thenReturn(Optional.of(permiso));

        Permiso resultado = service.obtenerPorId(1L);

        assertNotNull(resultado);
        assertEquals("ADMIN", resultado.getNombre());

        verify(repository).findById(1L);
    }

    @Test
    void actualizar() {

        Permiso nuevo = new Permiso();
        nuevo.setNombre("USER");

        when(repository.findById(1L)).thenReturn(Optional.of(permiso));

        when(repository.save(any(Permiso.class)))
                .thenAnswer(inv -> inv.getArgument(0));

        Permiso resultado = service.actualizar(1L, nuevo);

        assertEquals("USER", resultado.getNombre());

        verify(repository).findById(1L);
        verify(repository).save(permiso);
    }

    @Test
    void eliminar() {

        when(repository.findById(1L))
                .thenReturn(Optional.of(permiso));

        service.eliminar(1L);

        verify(repository).findById(1L);
        verify(repository).delete(permiso);
    }

    @Test
    void obtenerPorIdNoEncontrado() {

        when(repository.findById(1L))
                .thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> service.obtenerPorId(1L)
        );

        assertEquals("Permiso no encontrado", exception.getMessage());

        verify(repository).findById(1L);
    }

    @Test
    void eliminarNoEncontrado() {

        when(repository.findById(1L))
                .thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> service.eliminar(1L)
        );

        assertEquals("Permiso no encontrado", exception.getMessage());

        verify(repository).findById(1L);
    }
}