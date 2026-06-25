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
    path: 'supervisora/dashboard',
    loadComponent: () =>
      import('./pages/dashboard/supervisora/supervisora')
        .then(m => m.Supervisora),
    canActivate: [authGuard],
    data: { roles: ['ROLE_SUPERVISORA'] }
  },
  {
    path: 'vendedora/dashboard',
    loadComponent: () =>
      import('./pages/dashboard/vendedora/vendedora')
        .then(m => m.Vendedora),
    canActivate: [authGuard],
    data: { roles: ['ROLE_VENDEDORA'] }
  },

  { path: '**', redirectTo: '' }
];