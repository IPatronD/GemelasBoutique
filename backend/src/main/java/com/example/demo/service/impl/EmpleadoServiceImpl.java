package com.example.demo.service.impl;

import com.example.demo.models.Empleado;
import com.example.demo.repository.EmpleadoRepository;
import com.example.demo.service.EmpleadoService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmpleadoServiceImpl implements EmpleadoService {

    private final EmpleadoRepository repository;

    public EmpleadoServiceImpl(EmpleadoRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Empleado> listar() {
        return repository.findAll();
    }

    @Override
    public Empleado guardar(Empleado empleado) {

        // Validar DNI repetido
        if (repository.existsByDni(empleado.getDni())) {
            throw new RuntimeException("El DNI ya existe");
        }

        // Validar correo repetido
        if (repository.existsByCorreo(empleado.getCorreo())) {
            throw new RuntimeException("El correo ya existe");
        }

        return repository.save(empleado);
    }

    @Override
    public Empleado obtener(Long id) {

        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Empleado no encontrado"));
    }

    @Override
    public Empleado actualizar(Long id, Empleado empleado) {

        Empleado existente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Empleado no encontrado"));

        existente.setNombres(empleado.getNombres());
        existente.setApellidos(empleado.getApellidos());
        existente.setDni(empleado.getDni());
        existente.setCorreo(empleado.getCorreo());
        existente.setEstado(empleado.getEstado());

        return repository.save(existente);
    }

    @Override
    public void eliminar(Long id) {

        Empleado empleado = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Empleado no encontrado"));

        repository.delete(empleado);
    }

    // CONSULTAS PERSONALIZADAS

    @Override
    public Empleado buscarPorDni(String dni) {

        return repository.findByDni(dni)
                .orElseThrow(() -> new RuntimeException("Empleado no encontrado"));
    }

    @Override
    public Empleado buscarPorCorreo(String correo) {

        return repository.findByCorreo(correo)
                .orElseThrow(() -> new RuntimeException("Empleado no encontrado"));
    }

    @Override
    public List<Empleado> buscarPorApellidos(String apellidos) {
        return repository.findByApellidosContainingIgnoreCase(apellidos);
    }

    @Override
    public List<Empleado> buscarPorNombre(String nombre) {
        return repository.findByNombresContainingIgnoreCase(nombre);
    }

    @Override
    public boolean existeDni(String dni) {
        return repository.existsByDni(dni);
    }

    @Override
    public boolean existeCorreo(String correo) {
        return repository.existsByCorreo(correo);
    }
}