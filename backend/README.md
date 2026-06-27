# 🚀 Backend - Gemelas Boutique

Backend desarrollado con **Spring Boot 3.3.5** para el sistema de gestión de ventas e inventario **Gemelas Boutique**.

Implementa una **API REST** protegida mediante **Spring Security** y autenticación basada en **JWT (JSON Web Token)**, siguiendo una arquitectura por capas para garantizar escalabilidad, mantenibilidad y separación de responsabilidades.

---

# Descripción

El backend constituye el núcleo de la aplicación, siendo responsable de procesar toda la lógica de negocio, administrar la información almacenada en la base de datos y exponer los servicios REST consumidos por el frontend desarrollado en Angular.

Su diseño permite controlar la autenticación de usuarios, administrar permisos según el rol asignado y gestionar todas las operaciones relacionadas con ventas, clientes, productos, empleados y usuarios.

---

# Arquitectura utilizada

El proyecto sigue una arquitectura en capas.

```text
                Cliente (Angular)

                     │
               HTTP + JSON
                     │

              Controllers (REST)

                     │

                 Services

                     │

              Repositories (JPA)

                     │

                 Base de Datos
```

Cada capa tiene una responsabilidad específica.

| Capa | Responsabilidad |
|------|-----------------|
| Controller | Exponer los endpoints REST |
| Service | Implementar la lógica de negocio |
| Repository | Acceder a la base de datos |
| Model | Representar las entidades JPA |
| DTO | Transferencia de datos |
| Security | Seguridad y autenticación |
| Config | Configuración global |

---

# Tecnologías utilizadas

| Tecnología | Uso |
|------------|-----|
| Java 21 | Lenguaje principal |
| Spring Boot 3.3.5 | Framework backend |
| Spring Data JPA | Persistencia |
| Hibernate | ORM |
| Spring Security | Seguridad |
| JWT | Autenticación |
| BCrypt | Encriptación de contraseñas |
| MySQL | Base de datos |
| Maven | Gestión de dependencias |
| Lombok | Reducción de código repetitivo |

---

# Dependencias principales

El proyecto utiliza Maven como gestor de dependencias.

Las principales librerías implementadas son:

- spring-boot-starter-web
- spring-boot-starter-data-jpa
- spring-boot-starter-security
- spring-boot-starter-validation
- jjwt-api
- jjwt-impl
- jjwt-jackson
- mysql-connector-j
- lombok
- spring-boot-devtools

---

# Organización del proyecto

La aplicación se encuentra organizada de la siguiente manera.

```text
backend
│
├── src
│
├── main
│   ├── java
│   │
│   ├── config
│   ├── controllers
│   ├── dto
│   ├── models
│   ├── repository
│   ├── security
│   ├── service
│   │      └── impl
│   │
│   └── DemoApplication.java
│
├── resources
│
└── test
```

---

# Descripción de paquetes

## config

Contiene configuraciones generales de la aplicación.

Actualmente incluye:

- GlobalExceptionHandler

Permite centralizar el manejo de excepciones evitando duplicar código en los controladores.

---

## controllers

Expone todos los servicios REST consumidos desde Angular.

Controladores implementados:

- AuthController
- CategoriaController
- ClienteController
- DetalleVentaController
- EmpleadoController
- MetodoPagoController
- PermisoController
- ProductoController
- RolController
- UsuarioController
- VentaController

Cada controlador se comunica únicamente con la capa Service.

---

## dto

Contiene los objetos utilizados para transportar información entre capas sin exponer directamente las entidades.

Actualmente:

- ResumenDashboardDTO

---

## models

Representa las entidades persistidas en MySQL mediante JPA.

Entidades implementadas:

- Usuario
- Rol
- Permiso
- Empleado
- Cliente
- Producto
- Categoria
- MetodoPago
- Venta
- DetalleVenta

Estas entidades utilizan anotaciones JPA como:

- @Entity
- @Table
- @Id
- @GeneratedValue
- @OneToMany
- @ManyToOne
- @ManyToMany
- @OneToOne

---

## repository

Implementa el acceso a la base de datos utilizando Spring Data JPA.

Repositorios:

- UsuarioRepository
- RolRepository
- PermisoRepository
- ProductoRepository
- CategoriaRepository
- ClienteRepository
- EmpleadoRepository
- MetodoPagoRepository
- VentaRepository
- DetalleVentaRepository

Los repositorios permiten realizar operaciones CRUD y consultas personalizadas.

---

## service

Aquí se implementa toda la lógica del negocio.

Cada entidad posee:

- Interface
- Implementación

Ejemplo:

```text
ProductoService

↓

ProductoServiceImpl
```

Esto facilita el desacoplamiento entre capas.

---

## security

Es uno de los módulos más importantes del proyecto.

Implementa:

- Spring Security
- JWT
- BCrypt
- Filtro de autenticación
- Configuración de seguridad
- Obtención del usuario autenticado

Archivos principales:

- SecurityConfig
- JwtFilter
- JwtUtil
- CustomUserDetailsService

---

# Seguridad

El proyecto implementa autenticación basada en JWT.

Proceso de autenticación:

```text
Usuario

↓

POST /api/auth/login

↓

Spring Security

↓

AuthenticationManager

↓

JWT

↓

Token

↓

Angular

↓

Authorization: Bearer TOKEN
```

Todas las peticiones posteriores incluyen el token dentro del encabezado Authorization.

---

# Roles implementados

Actualmente existen tres roles.

| Rol | Descripción |
|------|-------------|
| ROLE_ADMIN | Acceso completo |
| ROLE_SUPERVISORA | Supervisión |
| ROLE_VENDEDORA | Registro de ventas |

Cada usuario puede acceder únicamente a las funcionalidades permitidas por su rol.

---

# Base de datos

El proyecto utiliza MySQL.

Nombre:

```text
GemelasBoutique
```

Principales tablas:

- usuarios
- roles
- permisos
- usuario_roles
- rol_permisos
- empleados
- clientes
- categorias
- productos
- metodo_pago
- ventas
- detalle_venta

---

# Relaciones principales

```text
Usuario
│
├── Rol
│
└── Empleado

Producto
│
└── Categoria

Venta
│
├── Cliente
├── Usuario
├── MetodoPago
└── DetalleVenta
```

---

# Configuración

La conexión a MySQL se realiza mediante el archivo:

```text
application.properties
```

Configuración principal:

- URL de conexión
- Usuario
- Contraseña
- Driver JDBC
- Hibernate
- Dialecto MySQL

---

# API REST

La aplicación expone múltiples endpoints.

## Autenticación

```
POST /api/auth/login

GET /api/auth/me
```

---

## Productos

```
GET

POST

PUT

DELETE
```

---

## Clientes

```
GET

POST

PUT

DELETE
```

---

## Ventas

```
GET

POST

PUT

DELETE
```

---

## Usuarios

```
GET

POST

PUT

DELETE
```

---

## Empleados

```
GET

POST

PUT

DELETE
```

---

## Categorías

```
GET

POST

PUT

DELETE
```

---

## Métodos de pago

```
GET

POST

PUT

DELETE
```

---

# Validaciones

Se implementaron validaciones mediante Jakarta Validation.

Entre ellas:

- @NotBlank
- @NotNull
- @Email
- @Pattern
- @Size

Estas validaciones garantizan la integridad de los datos antes de almacenarlos.

---

# Manejo de excepciones

El proyecto incorpora un manejador global de excepciones mediante:

```
GlobalExceptionHandler
```

Esto permite devolver respuestas controladas cuando ocurre un error durante una petición REST.

---

# Pruebas

Se implementaron pruebas unitarias para:

- Controllers
- Services

Además se realizaron pruebas funcionales utilizando Postman.

Se verificó:

- Login
- CRUD completos
- JWT
- Acceso por roles
- Seguridad
- Integración con la base de datos

---

# Ejecución

## Clonar

```bash
git clone <repositorio>
```

---

## Ejecutar

```bash
cd backend

mvn spring-boot:run
```

o desde el IDE ejecutar:

```
DemoApplication.java
```

---

# Puerto

Servidor:

```
http://localhost:8080
```

---

# Estado del proyecto

Actualmente el backend implementa:

- API REST completa
- Arquitectura por capas
- CRUD completos
- Spring Security
- JWT
- BCrypt
- Validaciones
- Spring Data JPA
- Relaciones entre entidades
- Manejo global de excepciones
- Integración con Angular
- Base de datos MySQL
- Autenticación por roles

---

# Requisitos previos

Para ejecutar el backend se requiere:

- Java JDK 21
- Maven
- MySQL Server

Además, debe existir una base de datos llamada:
GemelasBoutique

---

# Configuración de la base de datos

Modificar el archivo:

application.properties

con los datos de su servidor MySQL.

Ejemplo:

spring.datasource.url=jdbc:mysql://localhost:3306/GemelasBoutique

spring.datasource.username=root

spring.datasource.password=********

---

# Ejecutar el backend

mvn spring-boot:run

o ejecutar:

DemoApplication.java

