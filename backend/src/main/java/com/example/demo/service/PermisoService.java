package com.example.demo.service;

import com.example.demo.models.Permiso;

import java.util.List;

public interface PermisoService {

    List<Permiso> listar();

    Permiso guardar(Permiso permiso);

    Permiso obtenerPorId(Long id);

    Permiso actualizar(Long id, Permiso permiso);

    void eliminar(Long id);
}