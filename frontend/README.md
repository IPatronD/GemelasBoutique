# 💻 Frontend - Gemelas Boutique

Frontend desarrollado con **Angular 21** para el sistema web **Gemelas Boutique**.

La aplicación implementa una **Single Page Application (SPA)** que consume la API REST desarrollada en Spring Boot, permitiendo administrar ventas, productos, clientes, empleados, usuarios y demás módulos del sistema mediante una interfaz moderna, responsiva y protegida con autenticación JWT.

---

# Descripción

El frontend representa la capa de presentación del sistema. Su principal objetivo es proporcionar una experiencia de usuario intuitiva para la gestión diaria de la boutique.

La aplicación fue desarrollada utilizando Angular 21 bajo una arquitectura basada en **Standalone Components**, aprovechando el sistema de rutas, Guards, Interceptors, HttpClient y formularios reactivos para comunicarse con el backend de manera segura.

---

# Arquitectura del Frontend

El proyecto sigue una arquitectura modular donde cada funcionalidad se encuentra separada en componentes reutilizables.

```text
Angular

│

├── Pages
│
├── Services
│
├── Models
│
├── Guards
│
├── Interceptors
│
└── Routing
```

Cada módulo cumple una responsabilidad específica, facilitando el mantenimiento y la escalabilidad de la aplicación.

---

# Tecnologías utilizadas

| Tecnología | Uso |
|------------|-----|
| Angular 21 | Framework principal |
| TypeScript | Lenguaje de programación |
| SCSS | Estilos |
| Bootstrap 5 | Diseño responsivo |
| Bootstrap Icons | Iconografía |
| Angular Router | Navegación |
| HttpClient | Consumo de API REST |
| Template Driven Forms | Formularios |
| JWT | Autenticación |
| RxJS | Programación reactiva |

---

# Arquitectura basada en componentes

Angular divide toda la interfaz en pequeños componentes independientes.

Cada componente posee:

- HTML
- SCSS
- TypeScript
- Archivo de pruebas

Ejemplo:

```text
listar-productos

├── listar-productos.html
├── listar-productos.scss
├── listar-productos.ts
└── listar-productos.spec.ts
```

Esto facilita reutilizar código y mantener una estructura organizada.

---

# Organización del proyecto

```text
frontend

│

├── public

├── src
│
├── app
│
├── guards
│
├── interceptors
│
├── models
│
├── pages
│
├── services
│
│
├── app.routes.ts
├── app.config.ts
├── app.ts
├── app.html
└── app.scss

│

├── styles.scss

├── angular.json

├── package.json

└── README.md
```

---

# Descripción de carpetas

## pages

Contiene todas las vistas principales del sistema.

Actualmente se implementaron:

- Login
- Dashboard Administrador
- Dashboard Supervisora
- Dashboard Vendedora
- Caja
- Clientes
- Productos
- Usuarios
- Empleados
- Ventas
- Categorías
- Métodos de Pago
- Perfil

Cada vista corresponde a un componente independiente.

---

## services

Contiene todos los servicios encargados de consumir la API REST.

Servicios implementados:

- Auth
- Cliente
- Producto
- Usuario
- Empleado
- Venta
- Categoría
- Método de Pago
- Rol

Estos servicios utilizan HttpClient para comunicarse con Spring Boot.

---

## guards

Implementa el control de acceso a las rutas.

Actualmente existe:

```
auth-guard
```

Su función es verificar:

- si existe un JWT válido
- si el usuario posee el rol requerido

Antes de permitir acceder a una pantalla.

---

## interceptors

Implementa el interceptor HTTP.

Su función consiste en agregar automáticamente el token JWT en todas las peticiones enviadas al backend.

```text
Authorization

Bearer TOKEN
```

Esto evita tener que agregar manualmente el token en cada servicio.

---

## models

Contiene las interfaces utilizadas para representar los datos recibidos desde la API.

Actualmente existen modelos para:

- Cliente
- Producto

El proyecto puede ampliarse agregando interfaces para el resto de entidades.

---

# Sistema de rutas

La navegación se encuentra centralizada en:

```text
app.routes.ts
```

El proyecto utiliza Angular Router para navegar entre vistas sin recargar la página.

Los módulos principales son:

## Login

```
/
```

---

## Administrador

```
/admin/dashboard

/admin/ventas

/admin/clientes

/admin/productos

/admin/empleados

/admin/usuarios

/admin/categorias

/admin/metodos-pago

/admin/perfil
```

---

## Supervisora

```
/supervisora/dashboard

/supervisora/ventas

/supervisora/clientes

/supervisora/productos

/supervisora/perfil
```

---

## Vendedora

```
/vendedora/ventas/nueva

/vendedora/caja

/vendedora/clientes

/vendedora/productos

/vendedora/perfil
```

Todas estas rutas se encuentran protegidas mediante Guards.

---

# Sistema de autenticación

El proceso de autenticación implementado es el siguiente.

```text
Usuario

↓

Login

↓

Angular

↓

POST

/api/auth/login

↓

Spring Boot

↓

JWT

↓

Token

↓

LocalStorage

↓

Interceptor

↓

Authorization Bearer TOKEN
```

---

# Guard de autenticación

El proyecto implementa un Guard encargado de:

- validar si existe sesión activa
- verificar el rol del usuario
- impedir el acceso a rutas protegidas

Roles implementados:

- ROLE_ADMIN
- ROLE_SUPERVISORA
- ROLE_VENDEDORA

---

# Interceptor HTTP

Cada petición realizada mediante HttpClient pasa por el interceptor.

El interceptor agrega automáticamente:

```
Authorization

Bearer TOKEN
```

permitiendo acceder a los endpoints protegidos del backend.

---

# Comunicación con el Backend

Toda la comunicación se realiza mediante:

```
HttpClient
```

utilizando los métodos:

- GET
- POST
- PUT
- DELETE

Los datos intercambiados utilizan formato JSON.

---

# Formularios

Las vistas implementan formularios para:

- Inicio de sesión
- Registro de ventas
- Gestión de clientes
- Gestión de productos
- Gestión de empleados
- Gestión de usuarios

Los formularios incorporan validaciones para evitar el ingreso de información inválida.

---

# Diseño de la interfaz

La aplicación utiliza una interfaz basada en Bootstrap.

Características principales:

- Diseño responsivo.
- Sidebar lateral.
- Dashboard con indicadores.
- Tablas dinámicas.
- Formularios.
- Botones reutilizables.
- Tarjetas informativas.
- Iconografía mediante Bootstrap Icons.

---

# Pantallas implementadas

Actualmente el sistema cuenta con las siguientes vistas.

| Pantalla | Estado |
|-----------|:------:|
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
| Caja | ✔ |

---

# Capturas del sistema

El frontend implementa las siguientes interfaces:

- Inicio de sesión.
- Dashboard administrativo.
- Gestión de ventas.
- Gestión de clientes.
- Gestión de productos.
- Gestión de empleados.
- Gestión de usuarios.
- Gestión de categorías.
- Gestión de métodos de pago.
- Perfil del usuario.

Estas vistas consumen información proveniente del backend mediante la API REST.

---

# Instalación

## Instalar dependencias

```bash
npm install
```

---

## Ejecutar el servidor

```bash
ng serve
```

La aplicación estará disponible en:

```
http://localhost:4200
```

---

# Compilar para producción

```bash
ng build
```

---

# Ejecutar pruebas

```bash
ng test
```

---

# Integración con el Backend

Para su funcionamiento es necesario que el backend se encuentre ejecutándose en:

```
http://localhost:8080
```

La comunicación entre ambas aplicaciones se realiza mediante la API REST protegida con JWT.

---

# Temas aplicados del curso

Durante el desarrollo del frontend se aplicaron los principales contenidos del curso Desarrollo Web Integrado:

- Angular 21.
- Componentes Standalone.
- Angular CLI.
- Sistema de rutas.
- Router Outlet.
- RouterLink.
- Guards.
- Interceptors.
- HttpClient.
- Consumo de APIs REST.
- Formularios Reactivos.
- Validaciones.
- SCSS.
- Bootstrap.
- Arquitectura basada en componentes.

---

# Estado del proyecto

Actualmente el frontend implementa:

- SPA completamente funcional.
- Navegación mediante Angular Router.
- Consumo de API REST.
- Autenticación JWT.
- Protección de rutas.
- Dashboards por rol.
- Gestión de usuarios.
- Gestión de productos.
- Gestión de clientes.
- Gestión de ventas.
- Diseño responsivo.

---
# Requisitos previos

Antes de ejecutar el frontend asegúrese de que:

✔ MySQL esté ejecutándose.

✔ El backend Spring Boot esté iniciado.

✔ La API REST esté disponible en:

http://localhost:8080

Solo después de ello ejecute Angular.

---
# Ejecutar el frontend

npm install

ng serve

---
> **Importante**
>
> El frontend depende completamente del backend para obtener la información.
>
> Si el servidor Spring Boot no se encuentra ejecutándose o la base de datos MySQL no está disponible, la aplicación no podrá mostrar la información ni realizar operaciones de autenticación, consultas o registros.


