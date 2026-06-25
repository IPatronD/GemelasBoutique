package com.example.demo.controllers;

import com.example.demo.repository.UsuarioRepository;
import com.example.demo.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

        private final JwtUtil jwtUtil;
        private final AuthenticationManager authManager;
        private final UsuarioRepository usuarioRepository;

        public AuthController(JwtUtil jwtUtil, AuthenticationManager authManager,
                        UsuarioRepository usuarioRepository) {
                this.jwtUtil = jwtUtil;
                this.authManager = authManager;
                this.usuarioRepository = usuarioRepository;
        }

        @PostMapping("/login")
        public ResponseEntity<?> login(@RequestBody Map<String, String> datos) {

                String username = datos.get("username");
                String password = datos.get("password");

                authManager.authenticate(
                                new UsernamePasswordAuthenticationToken(username, password));

                String token = jwtUtil.generarToken(username);

                // Obtener el rol del usuario
                String rol = usuarioRepository.findByUsername(username)
                                .map(u -> u.getRoles().stream()
                                                .findFirst()
                                                .map(r -> r.getNombre())
                                                .orElse("SIN_ROL"))
                                .orElse("SIN_ROL");

                return ResponseEntity.ok(Map.of("token", token, "rol", rol));
        }

        @GetMapping("/me")
        public ResponseEntity<?> me(@RequestHeader("Authorization") String authHeader) {
                String token = authHeader.substring(7);
                String username = jwtUtil.extraerUsuario(token);

                return usuarioRepository.findByUsername(username)
                                .map(u -> {
                                        String rol = u.getRoles().stream()
                                                        .findFirst()
                                                        .map(r -> r.getNombre())
                                                        .orElse("SIN_ROL");

                                        return ResponseEntity.ok(Map.of(
                                                        "id", u.getId(),
                                                        "username", u.getUsername(),
                                                        "rol", rol,
                                                        "rolId",
                                                        u.getRoles().stream().findFirst().map(r -> r.getId())
                                                                        .orElse(null),
                                                        "empleado", Map.of(
                                                                        "id", u.getEmpleado().getId(),
                                                                        "nombres", u.getEmpleado().getNombres(),
                                                                        "apellidos", u.getEmpleado().getApellidos(),
                                                                        "correo", u.getEmpleado().getCorreo(),
                                                                        "dni", u.getEmpleado().getDni())));
                                })
                                .orElse(ResponseEntity.notFound().build());
        }
}