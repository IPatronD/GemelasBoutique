package com.example.demo.service.impl;

import com.example.demo.models.Producto;
import com.example.demo.repository.ProductoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProductoServiceImplTest {

    @Mock // Simula el repositorio
    private ProductoRepository repository;

    @InjectMocks // Inyecta el mock en el servicio
    private ProductoServiceImpl service;

    private Producto producto; // Objeto base de prueba

    @BeforeEach // Se ejecuta antes de cada test
    void setUp() {
        MockitoAnnotations.openMocks(this);

        producto = new Producto();
        producto.setId(1L);
        producto.setNombre("Laptop");
        producto.setDescripcion("Laptop Gamer");
        producto.setPrecio(2500.0);
        producto.setStock(10);
        producto.setCategoria(null); // puedes mockear Categoria si quieres subir nivel
    }

    @Test // Prueba listar()
    void testListar() {
        when(repository.findAll()).thenReturn(Arrays.asList(producto));

        List<Producto> resultado = service.listar();

        assertNotNull(resultado);
        assertEquals(1, resultado.size());

        verify(repository, times(1)).findAll();
    }

    @Test // Prueba guardar()
    void testGuardar() {
        when(repository.save(any(Producto.class))).thenReturn(producto);

        Producto resultado = service.guardar(producto);

        assertNotNull(resultado);
        assertEquals("Laptop", resultado.getNombre());

        verify(repository, times(1)).save(producto);
    }

    @Test // Prueba obtener cuando existe
    void testObtener_existente() {
        when(repository.findById(1L)).thenReturn(Optional.of(producto));

        Producto resultado = service.obtener(1L);

        assertNotNull(resultado);
        assertEquals(1L, resultado.getId());

        verify(repository, times(1)).findById(1L);
    }

    @Test // Prueba obtener cuando NO existe
    void testObtener_noExistente() {

        when(repository.findById(1L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> service.obtener(1L)
        );

        assertEquals("Producto no encontrado", exception.getMessage());

        verify(repository, times(1)).findById(1L);
    }

    @Test // Prueba actualizar cuando existe
    void testActualizar_existente() {
        Producto nuevosDatos = new Producto();
        nuevosDatos.setNombre("PC");
        nuevosDatos.setDescripcion("PC de escritorio");
        nuevosDatos.setPrecio(1800.0);
        nuevosDatos.setStock(5);
        nuevosDatos.setCategoria(null);

        when(repository.findById(1L)).thenReturn(Optional.of(producto));

        // 🔥 CORRECCIÓN IMPORTANTE:
        // devolver el objeto actualizado, no el viejo
        when(repository.save(any(Producto.class))).thenAnswer(inv -> inv.getArgument(0));

        Producto resultado = service.actualizar(1L, nuevosDatos);

        // Validaciones
        assertNotNull(resultado);
        assertEquals("PC", resultado.getNombre());
        assertEquals("PC de escritorio", resultado.getDescripcion());
        assertEquals(1800.0, resultado.getPrecio());
        assertEquals(5, resultado.getStock());

        verify(repository).findById(1L);
        verify(repository).save(producto);
    }

    @Test // Prueba actualizar cuando NO existe
    void testActualizar_noExistente() {

        when(repository.findById(1L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> service.actualizar(1L, producto)
        );

        assertEquals("Producto no encontrado", exception.getMessage());

        verify(repository).findById(1L);
        verify(repository, never()).save(any());
    }

    @Test // Prueba eliminar()
    void testEliminar() {

        when(repository.findById(1L))
                .thenReturn(Optional.of(producto));

        doNothing().when(repository).delete(producto);

        service.eliminar(1L);

        verify(repository, times(1)).findById(1L);
        verify(repository, times(1)).delete(producto);
    }
}