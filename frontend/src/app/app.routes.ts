import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', component: Login },

  {
    path: 'admin',
    loadComponent: () =>
      import('./pages/dashboard/admin/layout').then(m => m.Layout),
    canActivate: [authGuard],
    data: { roles: ['ROLE_ADMIN'] },
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/admin/admin').then(m => m.Admin)
      },
      {
        path: 'ventas',
        loadComponent: () =>
          import('./pages/ventas/listar-ventas/listar-ventas')
            .then(m => m.ListarVentas)
      },
      {
        path: 'clientes',
        loadComponent: () =>
          import('./pages/clientes/listar-clientes/listar-clientes')
            .then(m => m.ListarClientes)
      },
      {
        path: 'productos',
        loadComponent: () =>
          import('./pages/productos/listar-productos/listar-productos')
            .then(m => m.ListarProductos)
      },
      {
        path: 'empleados',
        loadComponent: () =>
          import('./pages/empleados/listar-empleados/listar-empleados')
            .then(m => m.ListarEmpleados)
      },
      {
        path: 'usuarios',
        loadComponent: () =>
          import('./pages/usuarios/listar-usuarios/listar-usuarios')
            .then(m => m.ListarUsuarios)
      },
      {
        path: 'categorias',
        loadComponent: () =>
          import('./pages/categorias/listar-categorias/listar-categorias')
            .then(m => m.ListarCategorias)
      },
      {
        path: 'metodos-pago',
        loadComponent: () =>
          import('./pages/metodos-pago/listar-metodos-pago/listar-metodos-pago')
            .then(m => m.ListarMetodosPago)
      },
      {
        path: 'perfil',
        loadComponent: () =>
          import('./pages/perfil/mi-perfil/mi-perfil')
            .then(m => m.MiPerfil)
      }
    ]
  },

  {
    path: 'supervisora',
    loadComponent: () =>
      import('./pages/dashboard/supervisora/layout-supervisora')
        .then(m => m.LayoutSupervisora),
    canActivate: [authGuard],
    data: { roles: ['ROLE_SUPERVISORA'] },
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/supervisora/supervisora')
            .then(m => m.Supervisora)
      },
      {
        path: 'ventas',
        loadComponent: () =>
          import('./pages/ventas/listar-ventas/listar-ventas')
            .then(m => m.ListarVentas)
      },
      {
        path: 'clientes',
        loadComponent: () =>
          import('./pages/clientes/listar-clientes/listar-clientes')
            .then(m => m.ListarClientes)
      },
      {
        path: 'productos',
        loadComponent: () =>
          import('./pages/productos/listar-productos/listar-productos')
            .then(m => m.ListarProductos)
      },
      {
        path: 'perfil',
        loadComponent: () =>
          import('./pages/perfil/mi-perfil/mi-perfil')
            .then(m => m.MiPerfil)
      }
    ]
  },
  {
    path: 'vendedora',
    loadComponent: () =>
      import('./pages/dashboard/vendedora/layout-vendedora')
        .then(m => m.LayoutVendedora),
    canActivate: [authGuard],
    data: { roles: ['ROLE_VENDEDORA'] },
    children: [
      {
        path: 'ventas/nueva',
        loadComponent: () =>
          import('./pages/ventas/form-venta/form-venta')
            .then(m => m.FormVenta)
      },
      {
        path: 'caja',
        loadComponent: () =>
          import('./pages/caja/caja')
            .then(m => m.Caja)
      },
      {
        path: 'productos',
        loadComponent: () =>
          import('./pages/productos/listar-productos/listar-productos')
            .then(m => m.ListarProductos)
      },
      {
        path: 'clientes',
        loadComponent: () =>
          import('./pages/clientes/listar-clientes/listar-clientes')
            .then(m => m.ListarClientes)
      },
      {
        path: 'perfil',
        loadComponent: () =>
          import('./pages/perfil/mi-perfil/mi-perfil')
            .then(m => m.MiPerfil)
      },
      { path: '', redirectTo: 'ventas/nueva', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '' }
];