package com.example.demo.service;

import com.example.demo.models.Rol;

import java.util.List;

public interface RolService {

    List<Rol> listar();

    Rol guardar(Rol rol);

    Rol obtenerPorId(Long id);

    Rol actualizar(Long id, Rol rol);

    void eliminar(Long id);
}