package com.example.demo.repository;

import com.example.demo.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByUsername(String username);

    List<Usuario> findByEstado(boolean estado);

    boolean existsByUsername(String username);

    @Query("""
                SELECT u
                FROM Usuario u
                JOIN u.roles r
                WHERE r.nombre = :rol
            """)
    List<Usuario> buscarPorRol(String rol);

    Optional<Usuario> findByEmpleadoId(Long empleadoId);
}