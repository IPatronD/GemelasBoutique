package com.example.demo.service;

import com.example.demo.models.Empleado;
import java.util.List;

public interface EmpleadoService {

    List<Empleado> listar();

    Empleado guardar(Empleado empleado);

    Empleado obtener(Long id);

    Empleado actualizar(Long id, Empleado empleado);

    void eliminar(Long id);

    // Consultas personalizadas

    Empleado buscarPorDni(String dni);

    Empleado buscarPorCorreo(String correo);

    List<Empleado> buscarPorApellidos(String apellidos);

    List<Empleado> buscarPorNombre(String nombre);

    boolean existeDni(String dni);

    boolean existeCorreo(String correo);
}