package com.example.demo.service.impl;

import com.example.demo.models.Producto;
import com.example.demo.repository.ProductoRepository;
import com.example.demo.service.ProductoService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductoServiceImpl implements ProductoService {

    private final ProductoRepository repository;

    public ProductoServiceImpl(ProductoRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Producto> listar() {
        return repository.findAll();
    }

    @Override
    public Producto guardar(Producto producto) {
        return repository.save(producto);
    }

    @Override
    public Producto obtener(Long id) {

        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    }

    @Override
    public Producto actualizar(Long id, Producto productoDetails) {

        Producto producto = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        producto.setNombre(productoDetails.getNombre());
        producto.setDescripcion(productoDetails.getDescripcion());
        producto.setPrecio(productoDetails.getPrecio());
        producto.setStock(productoDetails.getStock());
        producto.setCategoria(productoDetails.getCategoria());

        return repository.save(producto);
    }

    @Override
    public void eliminar(Long id) {

        Producto producto = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        repository.delete(producto);
    }

    // CONSULTAS PERSONALIZADAS

    @Override
    public List<Producto> buscarPorCategoria(String categoria) {
        return repository.buscarPorCategoria(categoria);
    }

    @Override
    public List<Producto> stockBajo(int cantidad) {
        return repository.stockBajo(cantidad);
    }

    @Override
    public List<Producto> buscarPorNombre(String nombre) {
        return repository.findByNombreContainingIgnoreCase(nombre);
    }
}