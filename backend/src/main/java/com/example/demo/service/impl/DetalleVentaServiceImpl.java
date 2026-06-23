package com.example.demo.service.impl;

import com.example.demo.models.DetalleVenta;
import com.example.demo.repository.DetalleVentaRepository;
import com.example.demo.service.DetalleVentaService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DetalleVentaServiceImpl implements DetalleVentaService {

    private final DetalleVentaRepository repository;

    public DetalleVentaServiceImpl(DetalleVentaRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<DetalleVenta> listar() {
        return repository.findAll();
    }

    @Override
    public DetalleVenta guardar(DetalleVenta detalleVenta) {
        return repository.save(detalleVenta);
    }

    @Override
    public DetalleVenta obtenerPorId(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Detalle de venta no encontrado"));
    }

    @Override
    public DetalleVenta actualizar(Long id, DetalleVenta detalleVentaDetails) {

        DetalleVenta detalleVenta = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Detalle de venta no encontrado"));

        detalleVenta.setVenta(detalleVentaDetails.getVenta());
        detalleVenta.setProducto(detalleVentaDetails.getProducto());
        detalleVenta.setCantidad(detalleVentaDetails.getCantidad());
        detalleVenta.setPrecio(detalleVentaDetails.getPrecio());

        return repository.save(detalleVenta);
    }

    @Override
    public void eliminar(Long id) {

        DetalleVenta detalleVenta = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Detalle de venta no encontrado"));

        repository.delete(detalleVenta);
    }
}