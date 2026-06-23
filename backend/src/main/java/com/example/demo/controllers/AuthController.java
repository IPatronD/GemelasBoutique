package com.example.demo.controllers;

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

    public AuthController(JwtUtil jwtUtil, AuthenticationManager authManager) {
        this.jwtUtil = jwtUtil;
        this.authManager = authManager;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> datos) {

        String username = datos.get("username");
        String password = datos.get("password");

        // AQUÍ SE VALIDA CON TU BD
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password));

        String token = jwtUtil.generarToken(username);

        return ResponseEntity.ok(Map.of("token", token));
    }
}