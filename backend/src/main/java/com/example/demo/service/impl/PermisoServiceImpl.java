package com.example.demo.service.impl;

import com.example.demo.models.Permiso;
import com.example.demo.repository.PermisoRepository;
import com.example.demo.service.PermisoService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PermisoServiceImpl implements PermisoService {

    private final PermisoRepository repository;

    public PermisoServiceImpl(PermisoRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Permiso> listar() {
        return repository.findAll();
    }

    @Override
    public Permiso guardar(Permiso permiso) {
        return repository.save(permiso);
    }

    @Override
    public Permiso obtenerPorId(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Permiso no encontrado"));
    }

    @Override
    public Permiso actualizar(Long id, Permiso permiso) {

        Permiso existente = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Permiso no encontrado"));

        existente.setNombre(permiso.getNombre());

        return repository.save(existente);
    }

    @Override
    public void eliminar(Long id) {

        Permiso permiso = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Permiso no encontrado"));

        repository.delete(permiso);
    }
}