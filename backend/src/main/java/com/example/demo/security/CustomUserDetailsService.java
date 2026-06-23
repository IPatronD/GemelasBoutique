package com.example.demo.security;

import com.example.demo.models.Usuario;
import com.example.demo.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import org.springframework.security.core.userdetails.User;

import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.security.core.userdetails.UserDetailsService;

import org.springframework.security.core.userdetails.UsernameNotFoundException;

import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

// Servicio de autenticación personalizado
@Service
public class CustomUserDetailsService
                implements UserDetailsService {

        // Repositorio
        @Autowired
        private UsuarioRepository repository;

        // Buscar usuario por username
        @Override
        public UserDetails loadUserByUsername(
                        String username)

                        throws UsernameNotFoundException {

                // Buscar usuario
                Usuario usuario = repository
                                .findByUsername(username)
                                .orElseThrow(() -> new UsernameNotFoundException(
                                                "Usuario no encontrado"));

                // Retornar usuario de Spring Security
                return new User(

                                // Username
                                usuario.getUsername(),

                                // Password
                                usuario.getPassword(),

                                // Roles convertidos a authorities
                                usuario.getRoles()
                                                .stream()
                                                .flatMap(rol -> {

                                                        // authorities del rol
                                                        var roles = java.util.stream.Stream.of(
                                                                        new SimpleGrantedAuthority(
                                                                                        rol.getNombre()));

                                                        // authorities de permisos
                                                        var permisos = rol.getPermisos()
                                                                        .stream()
                                                                        .map(permiso -> new SimpleGrantedAuthority(
                                                                                        permiso.getNombre()));

                                                        return java.util.stream.Stream
                                                                        .concat(roles, permisos);

                                                })
                                                .collect(Collectors.toList()));
        }
}
