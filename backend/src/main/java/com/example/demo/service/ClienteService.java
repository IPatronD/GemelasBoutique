package com.example.demo.service;

import com.example.demo.models.Cliente;

import java.util.List;

public interface ClienteService {

    List<Cliente> listar();

    Cliente guardar(Cliente cliente);

    Cliente buscarPorId(Long id);

    Cliente actualizar(Long id, Cliente clienteDetails);

    void eliminar(Long id);

    // Consultas personalizadas

    Cliente buscarPorDocumento(String documento);

    Cliente buscarPorCorreo(String correo);

    List<Cliente> buscarPorNombre(String nombre);
}