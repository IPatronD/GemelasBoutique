package com.example.demo.service.impl;

import com.example.demo.models.Usuario;
import com.example.demo.repository.UsuarioRepository;
import com.example.demo.service.UsuarioService;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository repository;
    private final BCryptPasswordEncoder encoder;

    public UsuarioServiceImpl(
            UsuarioRepository repository,
            BCryptPasswordEncoder encoder) {

        this.repository = repository;
        this.encoder = encoder;
    }

    @Override
    public List<Usuario> listar() {
        return repository.findAll();
    }

    @Override
    public Usuario guardar(Usuario usuario) {

        if (repository.existsByUsername(usuario.getUsername())) {
            throw new RuntimeException("El username ya existe");
        }

        usuario.setPassword(
                encoder.encode(usuario.getPassword()));

        return repository.save(usuario);
    }

    @Override
    public Usuario obtener(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    @Override
    public Usuario actualizar(Long id, Usuario usuario) {

        Usuario existente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        existente.setUsername(usuario.getUsername());

        if (usuario.getPassword() != null &&
                !usuario.getPassword().isBlank()) {

            existente.setPassword(
                    encoder.encode(usuario.getPassword()));
        }

        existente.setEstado(usuario.getEstado());
        existente.setEmpleado(usuario.getEmpleado());
        existente.setRoles(usuario.getRoles());

        return repository.save(existente);
    }

    @Override
    public void eliminar(Long id) {

        Usuario usuario = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        repository.delete(usuario);
    }

    @Override
    public Usuario buscarPorUsername(String username) {
        return repository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    @Override
    public List<Usuario> buscarPorRol(String rol) {
        return repository.buscarPorRol(rol);
    }

    @Override
    public List<Usuario> listarActivos() {
        return repository.findByEstado(true);
    }

    @Override
    public boolean existeUsername(String username) {
        return repository.existsByUsername(username);
    }
}