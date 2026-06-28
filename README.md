# 👗 Gemelas Boutique

> Sistema web de gestión de ventas e inventario desarrollado como Proyecto Final del curso **Desarrollo Web Integrado** de la **Universidad Tecnológica del Perú (UTP)**.

---

# Descripción

Gemelas Boutique es un sistema web desarrollado para digitalizar y optimizar los procesos administrativos y comerciales de una boutique de ropa. La aplicación permite gestionar productos, clientes, empleados, usuarios, ventas, categorías y métodos de pago desde una plataforma centralizada.

El proyecto fue desarrollado siguiendo una arquitectura **Full Stack**, implementando un backend con **Spring Boot** y un frontend con **Angular**, comunicados mediante una **API REST** protegida con autenticación basada en **JWT (JSON Web Token)**.

La aplicación fue diseñada para reemplazar los procesos manuales de registro de ventas e inventario, proporcionando una solución más segura, organizada y escalable.

---

# Objetivos del proyecto

## Objetivo general

Desarrollar una aplicación web que permita administrar los procesos comerciales de Gemelas Boutique mediante una arquitectura cliente-servidor basada en tecnologías modernas.

## Objetivos específicos

- Automatizar el registro de ventas.
- Gestionar clientes y empleados.
- Administrar el inventario de productos.
- Gestionar categorías y métodos de pago.
- Implementar autenticación segura mediante JWT.
- Controlar el acceso según el rol del usuario.
- Consumir servicios REST desde Angular.
- Aplicar una arquitectura modular basada en componentes.

---

# Problema identificado

Antes del desarrollo del sistema, la boutique realizaba el control de ventas, clientes e inventario de forma manual mediante cuadernos y registros físicos.

Esto ocasionaba problemas como:

- pérdida de información
- errores de digitación
- dificultad para controlar el stock
- ausencia de reportes
- poca seguridad sobre la información
- inexistencia de control de usuarios

Para solucionar estos inconvenientes se desarrolló una aplicación SaaS orientada a centralizar toda la información del negocio.

---

# Arquitectura del proyecto

El sistema sigue una arquitectura cliente-servidor compuesta por tres capas principales.

```text
                   Gemelas Boutique

                 ┌─────────────────┐
                 │     Angular     │
                 │   Frontend SPA  │
                 └────────┬────────┘
                          │
                 HttpClient + JWT
                          │
                          ▼
                 ┌─────────────────┐
                 │   Spring Boot   │
                 │    API REST     │
                 └────────┬────────┘
                          │
                    Spring Data JPA
                          │
                          ▼
                 ┌─────────────────┐
                 │      MySQL      │
                 │   Base de Datos │
                 └─────────────────┘
```

---

# Tecnologías utilizadas

| Tecnología | Descripción |
|------------|-------------|
| Java 21 | Lenguaje utilizado para el backend |
| Spring Boot 3.3.5 | Framework para desarrollar la API REST |
| Spring Security | Seguridad del sistema |
| JWT | Autenticación basada en tokens |
| Spring Data JPA | Persistencia de datos |
| Hibernate | ORM utilizado por JPA |
| Maven | Gestión de dependencias |
| MySQL | Base de datos relacional |
| Angular 21 | Desarrollo del frontend |
| TypeScript | Lenguaje principal del frontend |
| SCSS | Estilos del proyecto |
| Git | Control de versiones |
| GitHub | Repositorio del proyecto |

---

# Funcionalidades implementadas

Actualmente el sistema permite:

- Inicio de sesión mediante JWT.
- Gestión de usuarios.
- Gestión de empleados.
- Gestión de clientes.
- Gestión de productos.
- Gestión de categorías.
- Gestión de métodos de pago.
- Registro de ventas.
- Consulta de historial de ventas.
- Dashboard administrativo.
- Perfil del usuario.
- Control de acceso por roles.

---

# Roles del sistema

El sistema implementa control de acceso basado en roles.

| Rol | Funciones |
|------|-----------|
| Administrador | Acceso completo al sistema |
| Supervisora | Consulta y supervisión de la información |
| Vendedora | Registro de ventas y atención de clientes |

---

# Módulos implementados

| Módulo | Estado |
|---------|:------:|
| Login | ✔ |
| Dashboard | ✔ |
| Ventas | ✔ |
| Clientes | ✔ |
| Productos | ✔ |
| Empleados | ✔ |
| Usuarios | ✔ |
| Categorías | ✔ |
| Métodos de Pago | ✔ |
| Perfil | ✔ |

---

# Base de datos

La aplicación utiliza MySQL como sistema gestor de base de datos.

Las principales entidades implementadas son:

- Usuarios
- Roles
- Permisos
- Empleados
- Clientes
- Productos
- Categorías
- Ventas
- Detalle de Venta
- Métodos de Pago

Entre las relaciones implementadas destacan:

- Usuario → Rol
- Rol → Permisos
- Usuario → Empleado
- Cliente → Venta
- Venta → DetalleVenta
- Producto → Categoría
- Venta → Método de Pago

---

# Backend

El backend fue desarrollado utilizando Spring Boot bajo una arquitectura por capas.

Principales componentes:

- Controllers
- Services
- Repositories
- Models
- DTO
- Security
- Config

Características implementadas:

- API REST
- Spring Security
- JWT
- BCrypt
- Validaciones
- CRUD completos
- Consultas mediante Spring Data JPA
- Manejo global de excepciones

---

# Frontend

El frontend fue desarrollado utilizando Angular 21 con componentes Standalone.

Se implementó:

- Angular Router
- Guards
- Interceptors
- HttpClient
- Reactive Forms
- SCSS
- Componentes reutilizables

Además, cada rol posee su propio dashboard y navegación independiente.

---

# Estructura del proyecto

```text
GemelasBoutique-main
│
├── backend
│   ├── src
│   ├── pom.xml
│   └── README.md
│
├── frontend
│   ├── src
│   ├── package.json
│   └── README.md
│
└── README.md
```

La estructura completa y detallada de cada módulo puede consultarse en sus respectivos archivos README.

---

# Capturas del sistema

El sistema cuenta actualmente con las siguientes vistas implementadas:

- Inicio de sesión
- Dashboard del administrador
- Gestión de ventas
- Gestión de clientes
- Gestión de productos
- Gestión de empleados
- Gestión de usuarios
- Gestión de categorías
- Gestión de métodos de pago
- Perfil del usuario

---

# Instalación

## Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
```

---

## Backend

```bash
cd backend
mvn spring-boot:run
```

Servidor:

```
http://localhost:8080
```

---

## Frontend

```bash
cd frontend
npm install
ng serve
```

Aplicación:

```
http://localhost:4200
```

---

# Credenciales de prueba

El sistema incluye usuarios de prueba asociados a distintos roles.

| Usuario | Rol |
|----------|-----|
| valeria.r | Administrador |
| camila.t | Vendedora |
| fernanda.p | Vendedora |
| daniela.c | Supervisora |

---

# Aprendizajes aplicados

Durante el desarrollo del proyecto se aplicaron los principales temas vistos en el curso Desarrollo Web Integrado:

- Arquitectura basada en componentes.
- Angular Standalone Components.
- Sistema de rutas.
- Guards.
- Interceptors.
- Reactive Forms.
- Validaciones.
- Consumo de APIs REST.
- HttpClient.
- Autenticación mediante JWT.
- Spring Boot.
- Spring Security.
- Arquitectura en capas.
- Persistencia con Spring Data JPA.
- Integración Full Stack.

---

# Equipo de desarrollo

- Diego Rodrigo Cabanillas Llontop
- Fabricio Sebastian Del Castillo Hoyos
- Ainoha Sarita Julian Vargas
- James Brayan Quispe Torres
- Cristhian Alexander Vasquez Pelaez

---

# Información académica

**Universidad:** Universidad Tecnológica del Perú

**Curso:** Desarrollo Web Integrado

**Docente:** Ing. César Eduardo Zavaleta León

---

# Estado del proyecto

**Versión actual:** Avance Final 3

Estado del desarrollo:

- Backend implementado.
- Frontend implementado.
- Integración Angular + Spring Boot.
- Autenticación JWT.
- Gestión por roles.
- API REST funcional.
- Base de datos implementada.
- Sistema completamente navegable.

---
# Requisitos previos

Antes de ejecutar el proyecto asegúrese de tener instalado:

- Java JDK 21
- Apache Maven 3.9 o superior
- Node.js 20 o superior
- Angular CLI 21
- MySQL Server 8.0 o superior
- Git

También es necesario contar con una base de datos MySQL llamada:
GemelasBoutique

---
# Orden de ejecución del proyecto

Para ejecutar correctamente el sistema se recomienda seguir el siguiente orden:

1. Iniciar el servicio de MySQL.
2. Crear o restaurar la base de datos GemelasBoutique.
3. Ejecutar el backend desarrollado con Spring Boot.
4. Ejecutar el frontend desarrollado con Angular.
5. Acceder desde el navegador a:

http://localhost:4200


