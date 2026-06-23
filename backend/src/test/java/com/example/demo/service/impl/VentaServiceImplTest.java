package com.example.demo.service.impl;

import com.example.demo.models.Venta;
import com.example.demo.models.DetalleVenta;
import com.example.demo.models.Producto;
import com.example.demo.repository.VentaRepository;
import com.example.demo.repository.ProductoRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
// Habilita Mockito en JUnit 5
class VentaServiceImplTest {

    @Mock // Simula el repositorio de ventas
    private VentaRepository repository;

    @Mock // Simula el repositorio de productos
    private ProductoRepository productoRepository;

    @InjectMocks // Inyecta los mocks en el servicio
    private VentaServiceImpl ventaService;

    @Test // Prueba del método listar()
    void listar() {

        Venta v1 = new Venta(); // Objeto de prueba
        v1.setTotal(100.0);

        // Simula que el repositorio devuelve una lista con una venta
        when(repository.findAll()).thenReturn(List.of(v1));

        // Ejecuta el método del servicio
        List<Venta> resultado = ventaService.listar();

        // Validaciones
        assertNotNull(resultado); // No debe ser null
        assertEquals(1, resultado.size()); // Debe tener 1 elemento

        // Verifica que se llamó al repositorio
        verify(repository).findAll();
    }

    @Test // Prueba del método guardar() con los nuevos cálculos de boutique
    void guardar() {
        // Preparar Datos de Venta
        Venta venta = new Venta();
        venta.setDescuentoGlobalPorcentaje(5.0);
        venta.setTasaIva(16.0);

        // Producto 1: Vestido Gemelas Elegante (200.0)
        Producto p1 = new Producto();
        p1.setId(1L);
        p1.setNombre("Vestido Gemelas Elegante");
        p1.setPrecio(200.0);

        // Producto 2: Blusa Casual (100.0)
        Producto p2 = new Producto();
        p2.setId(2L);
        p2.setNombre("Blusa Casual");
        p2.setPrecio(100.0);

        // Detalle 1: 2 Vestidos con 10% de descuento
        DetalleVenta d1 = new DetalleVenta();
        d1.setProducto(p1);
        d1.setCantidad(2);
        d1.setDescuentoPorcentaje(10.0);

        // Detalle 2: 3 Blusas con 5% de descuento
        DetalleVenta d2 = new DetalleVenta();
        d2.setProducto(p2);
        d2.setCantidad(3);
        d2.setDescuentoPorcentaje(5.0);

        venta.setDetalles(List.of(d1, d2));

        // Simula búsquedas de productos
        when(productoRepository.findById(1L)).thenReturn(Optional.of(p1));
        when(productoRepository.findById(2L)).thenReturn(Optional.of(p2));

        // Simula guardado devolviendo el mismo objeto venta procesado
        when(repository.save(any(Venta.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Ejecuta el método
        Venta resultado = ventaService.guardar(venta);

        // Validaciones
        assertNotNull(resultado);

        // Validaciones por Ítem
        assertEquals(400.0, resultado.getDetalles().get(0).getSubtotal());
        assertEquals(40.0, resultado.getDetalles().get(0).getDescuentoMonto());
        assertEquals(360.0, resultado.getDetalles().get(0).getNeto());

        assertEquals(300.0, resultado.getDetalles().get(1).getSubtotal());
        assertEquals(15.0, resultado.getDetalles().get(1).getDescuentoMonto());
        assertEquals(285.0, resultado.getDetalles().get(1).getNeto());

        // Validaciones Generales de la Venta
        assertEquals(700.0, resultado.getSubtotalBruto());
        assertEquals(55.0, resultado.getTotalDescItems());
        assertEquals(645.0, resultado.getSubtotalNeto());
        assertEquals(32.25, resultado.getDescuento());
        assertEquals(612.75, resultado.getBaseImponible());
        assertEquals(612.75, resultado.getSubtotal()); // Compatibilidad
        assertEquals(98.04, resultado.getIva());
        assertEquals(710.79, resultado.getTotal());

        // Verifica llamadas a repositorios
        verify(productoRepository).findById(1L);
        verify(productoRepository).findById(2L);
        verify(repository).save(venta);
    }

    @Test // Prueba del método obtener()
    void obtener() {

        Long id = 1L;

        Venta venta = new Venta(); // Objeto de prueba
        venta.setId(id);

        // Simula búsqueda por ID
        when(repository.findById(id)).thenReturn(Optional.of(venta));

        // Ejecuta el método
        Venta resultado = ventaService.obtener(id);

        // Validaciones
        assertNotNull(resultado);
        assertEquals(id, resultado.getId());

        // Verifica que se llamó al repositorio
        verify(repository).findById(id);
    }
}