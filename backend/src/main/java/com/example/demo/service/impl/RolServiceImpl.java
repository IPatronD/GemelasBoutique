package com.example.demo.service.impl;

import com.example.demo.models.Rol;
import com.example.demo.repository.RolRepository;
import com.example.demo.service.RolService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RolServiceImpl implements RolService {

    private final RolRepository repository;

    public RolServiceImpl(RolRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Rol> listar() {
        return repository.findAll();
    }

    @Override
    public Rol guardar(Rol rol) {
        return repository.save(rol);
    }

    @Override
    public Rol obtenerPorId(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Rol no encontrado"));
    }

    @Override
    public Rol actualizar(Long id, Rol rol) {

        Rol existente = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Rol no encontrado"));

        existente.setNombre(rol.getNombre());

        return repository.save(existente);
    }

    @Override
    public void eliminar(Long id) {

        Rol rol = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Rol no encontrado"));

        repository.delete(rol);
    }
}