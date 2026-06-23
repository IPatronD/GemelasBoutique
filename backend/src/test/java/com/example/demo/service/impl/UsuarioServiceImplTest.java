package com.example.demo.service.impl;

import com.example.demo.models.Usuario;
import com.example.demo.repository.UsuarioRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UsuarioServiceImplTest {

    @Mock
    private UsuarioRepository repository;

    @Mock
    private BCryptPasswordEncoder encoder;

    @InjectMocks
    private UsuarioServiceImpl service;

    private Usuario crearUsuario(Long id) {
        return new Usuario(id, "dcabanillas", "123456", true, null, null);
    }

    @Test
    void listarDebeRetornarListaDeUsuarios() {
        when(repository.findAll()).thenReturn(Arrays.asList(crearUsuario(1L), crearUsuario(2L)));
        List<Usuario> resultado = service.listar();
        assertEquals(2, resultado.size());
        verify(repository, times(1)).findAll();
    }

    @Test
    void guardarDebePersistirUsuario() {
        Usuario usuario = crearUsuario(null);
        Usuario usuarioGuardado = crearUsuario(1L);
        when(repository.existsByUsername(usuario.getUsername())).thenReturn(false);
        when(encoder.encode(anyString())).thenReturn("password_encriptado");
        when(repository.save(usuario)).thenReturn(usuarioGuardado);
        Usuario resultado = service.guardar(usuario);
        assertNotNull(resultado);
        assertEquals(1L, resultado.getId());
        verify(repository, times(1)).save(usuario);
    }

    @Test
    void obtenerDebeRetornarUsuarioCuandoExiste() {
        when(repository.findById(1L)).thenReturn(Optional.of(crearUsuario(1L)));
        Usuario resultado = service.obtener(1L);
        assertNotNull(resultado);
        assertEquals("dcabanillas", resultado.getUsername());
        verify(repository, times(1)).findById(1L);
    }

    @Test
    void obtenerDebeLanzarExcepcionCuandoNoExiste() {
        when(repository.findById(1L)).thenReturn(Optional.empty());
        RuntimeException ex = assertThrows(RuntimeException.class, () -> service.obtener(1L));
        assertEquals("Usuario no encontrado", ex.getMessage());
    }

    @Test
    void actualizarDebeModificarUsuarioCuandoExiste() {
        Usuario existente = crearUsuario(1L);
        Usuario nuevosDatos = crearUsuario(null);
        nuevosDatos.setUsername("carlos");
        when(repository.findById(1L)).thenReturn(Optional.of(existente));
        when(encoder.encode(anyString())).thenReturn("password_encriptado");
        when(repository.save(any(Usuario.class))).thenAnswer(inv -> inv.getArgument(0));
        Usuario resultado = service.actualizar(1L, nuevosDatos);
        assertNotNull(resultado);
        assertEquals("carlos", resultado.getUsername());
    }

    @Test
    void actualizarDebeLanzarExcepcionCuandoNoExiste() {
        when(repository.findById(1L)).thenReturn(Optional.empty());
        RuntimeException ex = assertThrows(RuntimeException.class, () -> service.actualizar(1L, crearUsuario(null)));
        assertEquals("Usuario no encontrado", ex.getMessage());
        verify(repository, never()).save(any());
    }

    @Test
    void eliminarDebeLanzarExcepcionCuandoNoExiste() {
        when(repository.findById(1L)).thenReturn(Optional.empty());
        RuntimeException ex = assertThrows(RuntimeException.class, () -> service.eliminar(1L));
        assertEquals("Usuario no encontrado", ex.getMessage());
        verify(repository, never()).deleteById(any());
    }
}