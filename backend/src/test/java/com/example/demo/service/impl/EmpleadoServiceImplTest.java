package com.example.demo.service.impl;

import com.example.demo.models.Empleado;
import com.example.demo.repository.EmpleadoRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
// Habilita Mockito en JUnit 5
class EmpleadoServiceImplTest {

        @Mock // Simula el repositorio
        private EmpleadoRepository repository;

        @InjectMocks // Inyecta el mock en el servicio
        private EmpleadoServiceImpl service;

        // Método helper para crear empleados de prueba
        private Empleado crearEmpleado(Long id) {
                return new Empleado(
                                id,
                                "Diego",
                                "Cabanillas",
                                "12345678",
                                "diego@mail.com",
                                true, // o false según tu lógica
                                null // o un Usuario mock si lo necesitas
                );
        }

        @Test // Prueba listar()
        void listarDebeRetornarListaDeEmpleados() {
                Empleado e1 = crearEmpleado(1L);
                Empleado e2 = crearEmpleado(2L);

                // Simula lista de empleados
                when(repository.findAll()).thenReturn(Arrays.asList(e1, e2));

                List<Empleado> resultado = service.listar();

                // Validaciones
                assertEquals(2, resultado.size());

                // Verifica llamada
                verify(repository, times(1)).findAll();
        }

        @Test // Prueba guardar()
        void guardarDebePersistirEmpleado() {
                Empleado empleado = crearEmpleado(null); // sin ID (nuevo)
                Empleado empleadoGuardado = crearEmpleado(1L); // con ID (guardado)

                // Simula guardado
                when(repository.save(empleado)).thenReturn(empleadoGuardado);

                Empleado resultado = service.guardar(empleado);

                // Validaciones
                assertNotNull(resultado);
                assertEquals(1L, resultado.getId());
                assertEquals("Diego", resultado.getNombres());

                verify(repository, times(1)).save(empleado);
        }

        @Test // Prueba obtener cuando existe
        void obtenerDebeRetornarEmpleadoCuandoExiste() {
                Empleado empleado = crearEmpleado(1L);

                when(repository.findById(1L)).thenReturn(Optional.of(empleado));

                Empleado resultado = service.obtener(1L);

                assertNotNull(resultado);
                assertEquals("Diego", resultado.getNombres());

                verify(repository, times(1)).findById(1L);
        }

        @Test
        // Prueba actualizar empleado
        void actualizarDebeModificarEmpleado() {

                Empleado existente = crearEmpleado(1L);

                Empleado nuevosDatos = new Empleado();
                nuevosDatos.setNombres("Juan");
                nuevosDatos.setApellidos("Perez");
                nuevosDatos.setDni("87654321");
                nuevosDatos.setCorreo("juan@mail.com");

                when(repository.findById(1L))
                                .thenReturn(Optional.of(existente));

                when(repository.save(any(Empleado.class)))
                                .thenReturn(existente);

                Empleado resultado = service.actualizar(1L, nuevosDatos);

                assertNotNull(resultado);
                assertEquals("Juan",
                                resultado.getNombres());

                verify(repository, times(1))
                                .findById(1L);

                verify(repository, times(1))
                                .save(existente);
        }

        @Test
        // Prueba eliminar empleado (borrado lógico)
        void eliminarDebeLlamarAlRepositorio() {

                Empleado empleado = crearEmpleado(1L);
                empleado.setEstado(true); // aseguramos estado inicial

                when(repository.findById(1L))
                                .thenReturn(Optional.of(empleado));

                when(repository.save(empleado))
                                .thenReturn(empleado);

                service.eliminar(1L);

                // Verifica que se buscó el empleado
                verify(repository, times(1))
                                .findById(1L);

                // Verifica que se guardó (no que se eliminó)
                verify(repository, times(1))
                                .save(empleado);

                // Verifica que el estado cambió a false
                assertFalse(empleado.getEstado());
        }
}