package com.example.demo.service.impl;

import com.example.demo.models.Usuario;
import com.example.demo.models.Venta;
import com.example.demo.models.DetalleVenta;
import com.example.demo.models.Producto;
import com.example.demo.repository.VentaRepository;
import com.example.demo.repository.ClienteRepository;
import com.example.demo.repository.ProductoRepository;
import com.example.demo.repository.UsuarioRepository;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class VentaServiceImplTest {

    @Mock
    private VentaRepository repository;

    @Mock
    private ProductoRepository productoRepository;

    @Mock
    private ClienteRepository clienteRepository;

    @Mock
    private UsuarioRepository usuarioRepository; // ← faltaba este mock

    @InjectMocks
    private VentaServiceImpl ventaService;

    // Limpia el contexto de seguridad después de cada test para no afectar a otros
    @AfterEach
    void limpiarContexto() {
        SecurityContextHolder.clearContext();
    }

    @Test
    void listar() {
        Venta v1 = new Venta();
        v1.setTotal(100.0);

        when(repository.findAll()).thenReturn(List.of(v1));

        List<Venta> resultado = ventaService.listar();

        assertNotNull(resultado);
        assertEquals(1, resultado.size());

        verify(repository).findAll();
    }

    @Test
    void guardar() {

        // --- Simula el usuario autenticado en el contexto de seguridad ---
        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn("vendedora1");

        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);

        SecurityContextHolder.setContext(securityContext);

        Usuario usuarioAutenticado = new Usuario();
        usuarioAutenticado.setUsername("vendedora1");

        when(usuarioRepository.findByUsername("vendedora1"))
                .thenReturn(Optional.of(usuarioAutenticado));

        // --- Preparar Datos de Venta ---
        Venta venta = new Venta();
        venta.setDescuentoGlobalPorcentaje(5.0);
        venta.setTasaIva(16.0);

        Producto p1 = new Producto();
        p1.setId(1L);
        p1.setNombre("Vestido Gemelas Elegante");
        p1.setPrecio(200.0);
        p1.setStock(10); // ← necesario para pasar la validación de stock

        Producto p2 = new Producto();
        p2.setId(2L);
        p2.setNombre("Blusa Casual");
        p2.setPrecio(100.0);
        p2.setStock(10); // ← necesario para pasar la validación de stock

        DetalleVenta d1 = new DetalleVenta();
        d1.setProducto(p1);
        d1.setCantidad(2);
        d1.setDescuentoPorcentaje(10.0);

        DetalleVenta d2 = new DetalleVenta();
        d2.setProducto(p2);
        d2.setCantidad(3);
        d2.setDescuentoPorcentaje(5.0);

        venta.setDetalles(List.of(d1, d2));

        when(productoRepository.findById(1L)).thenReturn(Optional.of(p1));
        when(productoRepository.findById(2L)).thenReturn(Optional.of(p2));

        when(repository.save(any(Venta.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // --- Ejecuta el método ---
        Venta resultado = ventaService.guardar(venta);

        assertNotNull(resultado);

        assertEquals(400.0, resultado.getDetalles().get(0).getSubtotal());
        assertEquals(40.0, resultado.getDetalles().get(0).getDescuentoMonto());
        assertEquals(360.0, resultado.getDetalles().get(0).getNeto());

        assertEquals(300.0, resultado.getDetalles().get(1).getSubtotal());
        assertEquals(15.0, resultado.getDetalles().get(1).getDescuentoMonto());
        assertEquals(285.0, resultado.getDetalles().get(1).getNeto());

        assertEquals(700.0, resultado.getSubtotalBruto());
        assertEquals(55.0, resultado.getTotalDescItems());
        assertEquals(645.0, resultado.getSubtotalNeto());
        assertEquals(32.25, resultado.getDescuento());
        assertEquals(612.75, resultado.getBaseImponible());
        assertEquals(612.75, resultado.getSubtotal());
        assertEquals(98.04, resultado.getIva());
        assertEquals(710.79, resultado.getTotal());

        // Verifica que también se descontó el stock correctamente
        assertEquals(8, p1.getStock()); // 10 - 2
        assertEquals(7, p2.getStock()); // 10 - 3

        verify(productoRepository).findById(1L);
        verify(productoRepository).findById(2L);
        verify(usuarioRepository).findByUsername("vendedora1");
        verify(repository).save(venta);
    }

    @Test
    void obtener() {
        Long id = 1L;

        Venta venta = new Venta();
        venta.setId(id);

        when(repository.findById(id)).thenReturn(Optional.of(venta));

        Venta resultado = ventaService.obtener(id);

        assertNotNull(resultado);
        assertEquals(id, resultado.getId());

        verify(repository).findById(id);
    }
}