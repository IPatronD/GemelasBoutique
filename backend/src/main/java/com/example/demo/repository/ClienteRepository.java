package com.example.demo.repository;

import com.example.demo.models.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ClienteRepository extends JpaRepository<Cliente,Long> {

    // Buscar cliente por documento
    Optional<Cliente> findByDocumento(String documento);

    // Buscar cliente por correo
    Optional<Cliente> findByCorreo(String correo);

    // Buscar clientes por nombre
    @Query("""
        SELECT c
        FROM Cliente c
        WHERE LOWER(c.nombres) LIKE LOWER(CONCAT('%', :nombre, '%'))
    """)
    List<Cliente> buscarPorNombre(String nombre);
}
