# 1. GemelasBoutique

## 2. Estructura actual del proyecto

```
GemelasBoutique-main
│
├── backend
│   ├── .mvn
│   ├── src
│   │   ├── main
│   │   │   ├── java/com/example/demo
│   │   │   │   ├── config
│   │   │   │   │   └── GlobalExceptionHandler.java
│   │   │   │   │
│   │   │   │   ├── controllers
│   │   │   │   │   ├── AuthController.java
│   │   │   │   │   ├── CategoriaController.java
│   │   │   │   │   ├── ClienteController.java
│   │   │   │   │   ├── DetalleVentaController.java
│   │   │   │   │   ├── EmpleadoController.java
│   │   │   │   │   ├── MetodoPagoController.java
│   │   │   │   │   ├── PermisoController.java
│   │   │   │   │   ├── ProductoController.java
│   │   │   │   │   ├── RolController.java
│   │   │   │   │   ├── UsuarioController.java
│   │   │   │   │   └── VentaController.java
│   │   │   │   │
│   │   │   │   ├── dto
│   │   │   │   │   └── ResumenDashboardDTO.java
│   │   │   │   │
│   │   │   │   ├── models
│   │   │   │   │   ├── Categoria.java
│   │   │   │   │   ├── Cliente.java
│   │   │   │   │   ├── DetalleVenta.java
│   │   │   │   │   ├── Empleado.java
│   │   │   │   │   ├── MetodoPago.java
│   │   │   │   │   ├── Permiso.java
│   │   │   │   │   ├── Producto.java
│   │   │   │   │   ├── Rol.java
│   │   │   │   │   ├── Usuario.java
│   │   │   │   │   └── Venta.java
│   │   │   │   │
│   │   │   │   ├── repository
│   │   │   │   │   ├── CategoriaRepository.java
│   │   │   │   │   ├── ClienteRepository.java
│   │   │   │   │   ├── DetalleVentaRepository.java
│   │   │   │   │   ├── EmpleadoRepository.java
│   │   │   │   │   ├── MetodoPagoRepository.java
│   │   │   │   │   ├── PermisoRepository.java
│   │   │   │   │   ├── ProductoRepository.java
│   │   │   │   │   ├── RolRepository.java
│   │   │   │   │   ├── UsuarioRepository.java
│   │   │   │   │   └── VentaRepository.java
│   │   │   │   │
│   │   │   │   ├── security
│   │   │   │   │   ├── CustomUserDetailsService.java
│   │   │   │   │   ├── JwtFilter.java
│   │   │   │   │   ├── JwtUtil.java
│   │   │   │   │   └── SecurityConfig.java
│   │   │   │   │
│   │   │   │   ├── service
│   │   │   │   │   ├── CategoriaService.java
│   │   │   │   │   ├── ClienteService.java
│   │   │   │   │   ├── DetalleVentaService.java
│   │   │   │   │   ├── EmpleadoService.java
│   │   │   │   │   ├── MetodoPagoService.java
│   │   │   │   │   ├── PermisoService.java
│   │   │   │   │   ├── ProductoService.java
│   │   │   │   │   ├── RolService.java
│   │   │   │   │   ├── UsuarioService.java
│   │   │   │   │   ├── VentaService.java
│   │   │   │   │   └── impl
│   │   │   │   │       ├── CategoriaServiceImpl.java
│   │   │   │   │       ├── ClienteServiceImpl.java
│   │   │   │   │       ├── DetalleVentaServiceImpl.java
│   │   │   │   │       ├── EmpleadoServiceImpl.java
│   │   │   │   │       ├── MetodoPagoServiceImpl.java
│   │   │   │   │       ├── PermisoServiceImpl.java
│   │   │   │   │       ├── ProductoServiceImpl.java
│   │   │   │   │       ├── RolServiceImpl.java
│   │   │   │   │       ├── UsuarioServiceImpl.java
│   │   │   │   │       └── VentaServiceImpl.java
│   │   │   │   │

│   │   │   │   └── DemoApplication.java
│   │   │   │
│   │   │   └── resources
│   │   │
│   │   └── test/java/com/example/demo
│   │       ├── controllers
│   │       │   ├── CategoriaControllerTest.java
│   │       │   ├── ClienteControllerTest.java
│   │       │   ├── DetalleVentaControllerTest.java
│   │       │   ├── EmpleadoControllerTest.java
│   │       │   ├── MetodoPagoControllerTest.java
│   │       │   ├── PermisoControllerTest.java
│   │       │   ├── ProductoControllerTest.java
│   │       │   ├── RolControllerTest.java
│   │       │   ├── UsuarioControllerTest.java
│   │       │   └── VentaControllerTest.java
│   │       │
│   │       ├── service/impl
│   │       │   ├── CategoriaServiceImplTest.java
│   │       │   ├── ClienteServiceImplTest.java
│   │       │   ├── DetalleVentaServiceImplTest.java
│   │       │   ├── EmpleadoServiceImplTest.java
│   │       │   ├── MetodoPagoServiceImplTest.java
│   │       │   ├── PermisoServiceImplTest.java
│   │       │   ├── ProductoServiceImplTest.java
│   │       │   ├── RolServiceImplTest.java
│   │       │   ├── UsuarioServiceImplTest.java
│   │       │   └── VentaServiceImplTest.java
│   │       │
│   │       └── DemoApplicationTests.java
│   │
│   ├── target
│   ├── .gitattributes
│   ├── .gitignore
│   ├── mvnw
│   ├── mvnw.cmd
│   ├── pom.xml
│   └── README.md
│
├── frontend
│   ├── .angular
│   ├── .vscode
│   ├── node_modules
│   ├── public
│   ├── src
│   │   ├── app
│   │   │   ├── guards
│   │   │   │   ├── auth-guard.spec.ts
│   │   │   │   └── auth-guard.ts
│   │   │   │
│   │   │   ├── interceptors
│   │   │   │   ├── auth-interceptor.spec.ts
│   │   │   │   └── auth-interceptor.ts
│   │   │   │
│   │   │   ├── models
│   │   │   │   ├── cliente.ts
│   │   │   │   └── producto.ts
│   │   │   │
│   │   │   ├── pages
│   │   │   │   ├── caja
│   │   │   │   │   ├── caja.html
│   │   │   │   │   ├── caja.scss
│   │   │   │   │   ├── caja.spec.ts
│   │   │   │   │   └── caja.ts
│   │   │   │   │
│   │   │   │   ├── categorias/listar-categorias
│   │   │   │   │   ├── listar-categorias.html
│   │   │   │   │   ├── listar-categorias.scss
│   │   │   │   │   ├── listar-categorias.spec.ts
│   │   │   │   │   └── listar-categorias.ts
│   │   │   │   │
│   │   │   │   ├── clientes/listar-clientes
│   │   │   │   │   ├── listar-clientes.html
│   │   │   │   │   ├── listar-clientes.scss
│   │   │   │   │   ├── listar-clientes.spec.ts
│   │   │   │   │   └── listar-clientes.ts
│   │   │   │   │
│   │   │   │   ├── dashboard
│   │   │   │   │   ├── admin
│   │   │   │   │   │   ├── admin.html
│   │   │   │   │   │   ├── admin.scss
│   │   │   │   │   │   ├── admin.spec.ts
│   │   │   │   │   │   └── admin.ts
│   │   │   │   │   │
│   │   │   │   │   ├── supervisora
│   │   │   │   │   │   ├── layout-supervisora.html
│   │   │   │   │   │   ├── layout-supervisora.scss
│   │   │   │   │   │   ├── layout-supervisora.spec.ts
│   │   │   │   │   │   ├── layout-supervisora.ts
│   │   │   │   │   │   ├── supervisora.html
│   │   │   │   │   │   ├── supervisora.scss
│   │   │   │   │   │   ├── supervisora.spec.ts
│   │   │   │   │   │   └── supervisora.ts
│   │   │   │   │   │
│   │   │   │   │   └── vendedora
│   │   │   │   │       ├── layout-vendedora.html
│   │   │   │   │       ├── layout-vendedora.scss
│   │   │   │   │       ├── layout-vendedora.spec.ts
│   │   │   │   │       ├── layout-vendedora.ts
│   │   │   │   │       ├── vendedora.html
│   │   │   │   │       ├── vendedora.scss
│   │   │   │   │       ├── vendedora.spec.ts
│   │   │   │   │       └── vendedora.ts
│   │   │   │   │
│   │   │   │   ├── empleados/listar-empleados
│   │   │   │   │   ├── listar-empleados.html
│   │   │   │   │   ├── listar-empleados.scss
│   │   │   │   │   ├── listar-empleados.spec.ts
│   │   │   │   │   └── listar-empleados.ts
│   │   │   │   │
│   │   │   │   ├── login
│   │   │   │   │   ├── login.html
│   │   │   │   │   ├── login.scss
│   │   │   │   │   ├── login.spec.ts
│   │   │   │   │   └── login.ts
│   │   │   │   │
│   │   │   │   ├── metodos-pago/listar-metodos-pago
│   │   │   │   │   ├── listar-metodos-pago.html
│   │   │   │   │   ├── listar-metodos-pago.scss
│   │   │   │   │   ├── listar-metodos-pago.spec.ts
│   │   │   │   │   └── listar-metodos-pago.ts
│   │   │   │   │
│   │   │   │   ├── perfil/mi-perfil
│   │   │   │   │   ├── mi-perfil.html
│   │   │   │   │   ├── mi-perfil.scss
│   │   │   │   │   ├── mi-perfil.spec.ts
│   │   │   │   │   └── mi-perfil.ts
│   │   │   │   │
│   │   │   │   ├── productos/listar-productos
│   │   │   │   │   ├── listar-productos.html
│   │   │   │   │   ├── listar-productos.scss
│   │   │   │   │   ├── listar-productos.spec.ts
│   │   │   │   │   └── listar-productos.ts
│   │   │   │   │
│   │   │   │   ├── usuarios/listar-usuarios
│   │   │   │   │   ├── listar-usuarios.html
│   │   │   │   │   ├── listar-usuarios.scss
│   │   │   │   │   ├── listar-usuarios.spec.ts
│   │   │   │   │   └── listar-usuarios.ts
│   │   │   │   │
│   │   │   │   └── ventas
│   │   │   │       ├── form-venta
│   │   │   │       │   ├── form-venta.html
│   │   │   │       │   ├── form-venta.scss
│   │   │   │       │   ├── form-venta.spec.ts
│   │   │   │       │   └── form-venta.ts
│   │   │   │       │
│   │   │   │       └── listar-ventas
│   │   │   │           ├── listar-ventas.html
│   │   │   │           ├── listar-ventas.scss
│   │   │   │           ├── listar-ventas.spec.ts
│   │   │   │           └── listar-ventas.ts
│   │   │   │
│   │   │   ├── services
│   │   │   │   ├── auth.spec.ts
│   │   │   │   ├── auth.ts
│   │   │   │   ├── categoria.spec.ts
│   │   │   │   ├── categoria.ts
│   │   │   │   ├── cliente.spec.ts
│   │   │   │   ├── cliente.ts
│   │   │   │   ├── empleado.spec.ts
│   │   │   │   ├── empleado.ts
│   │   │   │   ├── metodo-pago.spec.ts
│   │   │   │   ├── metodo-pago.ts
│   │   │   │   ├── producto.spec.ts
│   │   │   │   ├── producto.ts
│   │   │   │   ├── rol.spec.ts
│   │   │   │   ├── rol.ts
│   │   │   │   ├── usuario.spec.ts
│   │   │   │   ├── usuario.ts
│   │   │   │   ├── venta.spec.ts
│   │   │   │   └── venta.ts
│   │   │   │
│   │   │   ├── app.config.ts
│   │   │   ├── app.html
│   │   │   ├── app.routes.ts
│   │   │   ├── app.scss
│   │   │   ├── app.spec.ts
│   │   │   └── app.ts
│   │   │
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── styles.scss
│   │
│   ├── .editorconfig
│   ├── .gitignore
│   ├── angular.json
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   └── tsconfig.spec.json
│
├── .github
├── .idea
└── README.md
```





