package com.example.demo.service;

import com.example.demo.models.MetodoPago;

import java.util.List;

public interface MetodoPagoService {

    List<MetodoPago> listar();

    MetodoPago guardar(MetodoPago metodoPago);

    MetodoPago obtenerPorId(Long id);

    MetodoPago actualizar(Long id, MetodoPago metodoPago);

    void eliminar(Long id);

    // Consulta personalizada
    MetodoPago buscarPorNombre(String nombre);
}