package com.example.demo.service.impl;

import com.example.demo.models.MetodoPago;
import com.example.demo.repository.MetodoPagoRepository;
import com.example.demo.service.MetodoPagoService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MetodoPagoServiceImpl implements MetodoPagoService {

    private final MetodoPagoRepository repository;

    public MetodoPagoServiceImpl(MetodoPagoRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<MetodoPago> listar() {
        return repository.findAll();
    }

    @Override
    public MetodoPago guardar(MetodoPago metodoPago) {

        // Validar nombre repetido
        if (repository.findByNombre(metodoPago.getNombre()).isPresent()) {
            throw new RuntimeException("El método de pago ya existe");
        }

        return repository.save(metodoPago);
    }

    @Override
    public MetodoPago obtenerPorId(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Método de pago no encontrado"));
    }

    @Override
    public MetodoPago actualizar(Long id, MetodoPago metodoPago) {

        MetodoPago existente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Método de pago no encontrado"));

        existente.setNombre(metodoPago.getNombre());
        existente.setDescripcion(metodoPago.getDescripcion());

        return repository.save(existente);
    }

    @Override
    public void eliminar(Long id) {

        MetodoPago metodoPago = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Método de pago no encontrado"));

        repository.delete(metodoPago);
    }

    // CONSULTA PERSONALIZADA

    @Override
    public MetodoPago buscarPorNombre(String nombre) {

        return repository.findByNombre(nombre)
                .orElseThrow(() ->
                        new RuntimeException("Método de pago no encontrado"));
    }
}