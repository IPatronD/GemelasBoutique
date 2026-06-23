package com.example.demo.service;

import com.example.demo.models.DetalleVenta;

import java.util.List;

public interface DetalleVentaService {

    List<DetalleVenta> listar();

    DetalleVenta guardar(DetalleVenta detalleVenta);

    DetalleVenta obtenerPorId(Long id);

    DetalleVenta actualizar(Long id, DetalleVenta detalleVentaDetails);

    void eliminar(Long id);
}