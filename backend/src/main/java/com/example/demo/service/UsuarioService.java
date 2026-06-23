package com.example.demo.service;

import com.example.demo.models.Usuario;
import java.util.List;

public interface UsuarioService {

    List<Usuario> listar();

    Usuario guardar(Usuario usuario);

    Usuario obtener(Long id);

    Usuario actualizar(Long id, Usuario usuario);

    void eliminar(Long id);

    Usuario buscarPorUsername(String username);

    List<Usuario> buscarPorRol(String rol);

    List<Usuario> listarActivos();

    boolean existeUsername(String username);
}