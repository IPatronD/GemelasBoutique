package com.example.demo.service;

import com.example.demo.models.Categoria;
import java.util.List;

public interface CategoriaService {

    List<Categoria> listar();

    Categoria guardar(Categoria categoria);

    Categoria obtener(Long id);

    Categoria actualizar(Long id, Categoria categoriaDetails);

    void eliminar(Long id);

    List<Object[]> productosMasVendidos();
}