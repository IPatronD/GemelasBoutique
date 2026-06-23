package com.example.demo.service.impl;

import com.example.demo.models.Categoria;
import com.example.demo.repository.CategoriaRepository;
import com.example.demo.service.CategoriaService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaServiceImpl implements CategoriaService {

    private final CategoriaRepository repository;

    public CategoriaServiceImpl(CategoriaRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Categoria> listar() {
        return repository.findAll();
    }

    @Override
    public Categoria guardar(Categoria categoria) {

        // Verifica si ya existe el nombre
        if (repository.existsByNombre(categoria.getNombre())) {
            throw new RuntimeException("La categoría ya existe");
        }

        return repository.save(categoria);
    }

    @Override
    public Categoria obtener(Long id) {

        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
    }

    @Override
    public Categoria actualizar(Long id, Categoria categoriaDetails) {

        Categoria categoria = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));

        categoria.setNombre(categoriaDetails.getNombre());
        categoria.setDescripcion(categoriaDetails.getDescripcion());

        return repository.save(categoria);
    }

    @Override
    public void eliminar(Long id) {

        Categoria categoria = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));

        repository.delete(categoria);
    }

    @Override
    public List<Object[]> productosMasVendidos() {
        return repository.productosMasVendidos();
    }
}