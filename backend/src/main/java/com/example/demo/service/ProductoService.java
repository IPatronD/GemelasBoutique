package com.example.demo.service;

import com.example.demo.models.Producto;

import java.util.List;

public interface ProductoService {

    List<Producto> listar();

    Producto guardar(Producto producto);

    Producto obtener(Long id);

    Producto actualizar(Long id, Producto productoDetails);

    void eliminar(Long id);

    // Consultas personalizadas

    List<Producto> buscarPorCategoria(String categoria);

    List<Producto> stockBajo(int cantidad);

    List<Producto> buscarPorNombre(String nombre);
}