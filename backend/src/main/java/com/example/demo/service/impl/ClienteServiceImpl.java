package com.example.demo.service.impl;

import com.example.demo.models.Cliente;
import com.example.demo.repository.ClienteRepository;
import com.example.demo.service.ClienteService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteServiceImpl implements ClienteService {

    private final ClienteRepository repository;

    public ClienteServiceImpl(ClienteRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Cliente> listar() {
        return repository.findAll();
    }

    @Override
    public Cliente guardar(Cliente cliente) {

        // Validar documento repetido
        if (repository.findByDocumento(cliente.getDocumento()).isPresent()) {
            throw new RuntimeException("El documento ya existe");
        }

        // Validar correo repetido
        if (cliente.getCorreo() != null &&
                repository.findByCorreo(cliente.getCorreo()).isPresent()) {

            throw new RuntimeException("El correo ya existe");
        }

        return repository.save(cliente);
    }

    @Override
    public Cliente buscarPorId(Long id) {

        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
    }

    @Override
    public Cliente actualizar(Long id, Cliente clienteDetails) {

        Cliente cliente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

        cliente.setTipo(clienteDetails.getTipo());
        cliente.setNombres(clienteDetails.getNombres());
        cliente.setDocumento(clienteDetails.getDocumento());
        cliente.setTelefono(clienteDetails.getTelefono());
        cliente.setCorreo(clienteDetails.getCorreo());
        cliente.setEstado(clienteDetails.getEstado());

        return repository.save(cliente);
    }

    @Override
    public void eliminar(Long id) {

        Cliente cliente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

        repository.delete(cliente);
    }

    // CONSULTAS PERSONALIZADAS

    @Override
    public Cliente buscarPorDocumento(String documento) {

        return repository.findByDocumento(documento)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
    }

    @Override
    public Cliente buscarPorCorreo(String correo) {

        return repository.findByCorreo(correo)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
    }

    @Override
    public List<Cliente> buscarPorNombre(String nombre) {
        return repository.buscarPorNombre(nombre);
    }
}