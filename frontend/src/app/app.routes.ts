import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [

  // Ruta raíz — muestra el login
  { path: '', component: Login },

  // ─────────────────────────────────────────
  // RUTAS DEL ADMINISTRADOR
  // Solo accesible con ROLE_ADMIN
  // Layout con sidebar completo
  // ─────────────────────────────────────────
  {
    path: 'admin',
    loadComponent: () =>
      import('./pages/dashboard/admin/layout').then(m => m.Layout),
    canActivate: [authGuard],           // Protegida por el guard
    data: { roles: ['ROLE_ADMIN'] },    // Solo rol admin puede entrar
    children: [

      // Dashboard principal con métricas y gráficos
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/admin/admin').then(m => m.Admin)
      },

      // Historial de ventas con filtros y detalle
      {
        path: 'ventas',
        loadComponent: () =>
          import('./pages/ventas/listar-ventas/listar-ventas')
            .then(m => m.ListarVentas)
      },

      // Gestión de clientes (CRUD completo)
      {
        path: 'clientes',
        loadComponent: () =>
          import('./pages/clientes/listar-clientes/listar-clientes')
            .then(m => m.ListarClientes)
      },

      // Gestión de productos e inventario (CRUD completo)
      {
        path: 'productos',
        loadComponent: () =>
          import('./pages/productos/listar-productos/listar-productos')
            .then(m => m.ListarProductos)
      },

      // Gestión de empleados del personal
      {
        path: 'empleados',
        loadComponent: () =>
          import('./pages/empleados/listar-empleados/listar-empleados')
            .then(m => m.ListarEmpleados)
      },

      // Gestión de usuarios del sistema con roles
      {
        path: 'usuarios',
        loadComponent: () =>
          import('./pages/usuarios/listar-usuarios/listar-usuarios')
            .then(m => m.ListarUsuarios)
      },

      // Gestión de categorías de productos
      {
        path: 'categorias',
        loadComponent: () =>
          import('./pages/categorias/listar-categorias/listar-categorias')
            .then(m => m.ListarCategorias)
      },

      // Gestión de métodos de pago (Yape, Efectivo, etc.)
      {
        path: 'metodos-pago',
        loadComponent: () =>
          import('./pages/metodos-pago/listar-metodos-pago/listar-metodos-pago')
            .then(m => m.ListarMetodosPago)
      },

      // Perfil del administrador — editar datos y contraseña
      {
        path: 'perfil',
        loadComponent: () =>
          import('./pages/perfil/mi-perfil/mi-perfil')
            .then(m => m.MiPerfil)
      }
    ]
  },

  // ─────────────────────────────────────────
  // RUTAS DE LA SUPERVISORA
  // Solo accesible con ROLE_SUPERVISORA
  // Acceso de solo lectura — sin eliminar datos
  // ─────────────────────────────────────────
  {
    path: 'supervisora',
    loadComponent: () =>
      import('./pages/dashboard/supervisora/layout-supervisora')
        .then(m => m.LayoutSupervisora),
    canActivate: [authGuard],
    data: { roles: ['ROLE_SUPERVISORA'] },
    children: [

      // Dashboard de supervisión con métricas y reportes
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/supervisora/supervisora')
            .then(m => m.Supervisora)
      },

      // Ver historial de ventas (sin botón eliminar)
      {
        path: 'ventas',
        loadComponent: () =>
          import('./pages/ventas/listar-ventas/listar-ventas')
            .then(m => m.ListarVentas)
      },

      // Ver clientes (solo lectura)
      {
        path: 'clientes',
        loadComponent: () =>
          import('./pages/clientes/listar-clientes/listar-clientes')
            .then(m => m.ListarClientes)
      },

      // Ver y editar productos (sin crear ni eliminar)
      {
        path: 'productos',
        loadComponent: () =>
          import('./pages/productos/listar-productos/listar-productos')
            .then(m => m.ListarProductos)
      },

      // Perfil de la supervisora — editar datos y contraseña
      {
        path: 'perfil',
        loadComponent: () =>
          import('./pages/perfil/mi-perfil/mi-perfil')
            .then(m => m.MiPerfil)
      }
    ]
  },

  // ─────────────────────────────────────────
  // RUTAS DE LA VENDEDORA
  // Solo accesible con ROLE_VENDEDORA
  // Enfocada en registrar ventas y consultar
  // ─────────────────────────────────────────
  {
    path: 'vendedora',
    loadComponent: () =>
      import('./pages/dashboard/vendedora/layout-vendedora')
        .then(m => m.LayoutVendedora),
    canActivate: [authGuard],
    data: { roles: ['ROLE_VENDEDORA'] },
    children: [

      // Formulario para registrar una nueva venta con productos
      {
        path: 'ventas/nueva',
        loadComponent: () =>
          import('./pages/ventas/form-venta/form-venta')
            .then(m => m.FormVenta)
      },

      // Caja del día — ver ventas realizadas hoy
      {
        path: 'caja',
        loadComponent: () =>
          import('./pages/caja/caja')
            .then(m => m.Caja)
      },

      // Ver productos disponibles (solo consulta)
      {
        path: 'productos',
        loadComponent: () =>
          import('./pages/productos/listar-productos/listar-productos')
            .then(m => m.ListarProductos)
      },

      // Ver y registrar clientes
      {
        path: 'clientes',
        loadComponent: () =>
          import('./pages/clientes/listar-clientes/listar-clientes')
            .then(m => m.ListarClientes)
      },

      // Perfil de la vendedora — editar datos y contraseña
      {
        path: 'perfil',
        loadComponent: () =>
          import('./pages/perfil/mi-perfil/mi-perfil')
            .then(m => m.MiPerfil)
      },

      // Ruta por defecto — redirige a nueva venta al entrar
      { path: '', redirectTo: 'ventas/nueva', pathMatch: 'full' }
    ]
  },

  // Cualquier ruta no encontrada redirige al login
  { path: '**', redirectTo: '' }
];