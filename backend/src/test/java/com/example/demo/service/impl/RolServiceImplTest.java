package com.example.demo.service.impl;

import com.example.demo.models.Rol;
import com.example.demo.repository.RolRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class RolServiceImplTest {

    @Mock
    private RolRepository repository;

    @InjectMocks
    private RolServiceImpl service;

    private Rol rol;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        rol = new Rol();
        rol.setId(1L);
        rol.setNombre("ADMIN");
    }

    @Test
    void testListar() {

        when(repository.findAll())
                .thenReturn(Arrays.asList(rol));

        List<Rol> resultado = service.listar();

        assertNotNull(resultado);
        assertEquals(1, resultado.size());
        assertEquals("ADMIN", resultado.get(0).getNombre());

        verify(repository, times(1)).findAll();
    }

    @Test
    void testGuardar() {

        when(repository.save(any(Rol.class)))
                .thenReturn(rol);

        Rol resultado = service.guardar(rol);

        assertNotNull(resultado);
        assertEquals("ADMIN", resultado.getNombre());

        verify(repository, times(1)).save(rol);
    }

    @Test
    void testObtenerPorId_existente() {

        when(repository.findById(1L))
                .thenReturn(Optional.of(rol));

        Rol resultado = service.obtenerPorId(1L);

        assertNotNull(resultado);
        assertEquals(1L, resultado.getId());
        assertEquals("ADMIN", resultado.getNombre());

        verify(repository, times(1)).findById(1L);
    }

    @Test
    void testObtenerPorId_noExistente() {

        when(repository.findById(1L))
                .thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> service.obtenerPorId(1L)
        );

        assertEquals("Rol no encontrado", exception.getMessage());

        verify(repository, times(1)).findById(1L);
    }

    @Test
    void testActualizar_existente() {

        Rol nuevosDatos = new Rol();
        nuevosDatos.setNombre("USER");

        when(repository.findById(1L))
                .thenReturn(Optional.of(rol));

        when(repository.save(any(Rol.class)))
                .thenAnswer(inv -> inv.getArgument(0));

        Rol resultado = service.actualizar(1L, nuevosDatos);

        assertNotNull(resultado);
        assertEquals("USER", resultado.getNombre());

        verify(repository).findById(1L);
        verify(repository).save(rol);
    }

    @Test
    void testActualizar_noExistente() {

        when(repository.findById(1L))
                .thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> service.actualizar(1L, rol)
        );

        assertEquals("Rol no encontrado", exception.getMessage());

        verify(repository).findById(1L);
        verify(repository, never()).save(any());
    }

    @Test
    void testEliminar() {

        when(repository.findById(1L))
                .thenReturn(Optional.of(rol));

        doNothing().when(repository).delete(rol);

        service.eliminar(1L);

        verify(repository, times(1)).findById(1L);
        verify(repository, times(1)).delete(rol);
    }

    @Test
    void testEliminar_noExistente() {

        when(repository.findById(1L))
                .thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> service.eliminar(1L)
        );

        assertEquals("Rol no encontrado", exception.getMessage());

        verify(repository).findById(1L);
        verify(repository, never()).delete(any());
    }
}