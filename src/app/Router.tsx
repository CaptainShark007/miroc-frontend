import {
  LoginPage,
  DashboardPage,
  ConfigurationPage,
  EmployeePage,
  ClientPage,
  ClientAdminPage,
  CreateClientPage,
  EditClientPage,
  ProviderPage,
  MovementPage,
  CreateMovementPage,
  EditMovementPage,
  StockPage,
  ReportsPage,
  ConstructionPage,
  CreateConstructionPage,
  EditConstructionPage,
  UserAdminPage,
  CreateUserPage,
  EditUserPage,
  CreateProviderPage,
  EditProviderPage,
  EditEmployeePage,
  CreateEmployeePage,
} from '@app/lazy';
import { Error404 } from '@shared/components/Error404';
import { Route, Routes } from 'react-router';
import DashboardLayout from '@layout/DashboardLayout';
import ProtectedRoute from '@shared/components/ProtectedRoute';
import PublicRoute from '@shared/components/PublicRoute';
import AdminRoute from '@shared/components/AdminRoute';
import PermissionGuard from '@shared/components/PermissionGuard';

export default function Router() {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/configuration' element={<ConfigurationPage />} />
        <Route path='/entities'>
          <Route path='clients'>
            <Route
              index
              element={
                <PermissionGuard
                  module='client'
                  action='read'
                  moduleName='Clientes'
                >
                  <ClientPage />
                </PermissionGuard>
              }
            />
            <Route
              path='create'
              element={
                <PermissionGuard
                  module='client'
                  action='create'
                  moduleName='Clientes'
                >
                  <CreateClientPage />
                </PermissionGuard>
              }
            />
            <Route
              path='edit/:dni'
              element={
                <PermissionGuard
                  module='client'
                  action='update'
                  moduleName='Clientes'
                >
                  <EditClientPage />
                </PermissionGuard>
              }
            />
          </Route>
          <Route path='suppliers'>
            <Route
              index
              element={
                <PermissionGuard
                  module='provider'
                  action='read'
                  moduleName='Proveedores'
                >
                  <ProviderPage />
                </PermissionGuard>
              }
            />
            <Route
              path='create'
              element={
                <PermissionGuard
                  module='provider'
                  action='create'
                  moduleName='Proveedores'
                >
                  <CreateProviderPage />
                </PermissionGuard>
              }
            />
            <Route
              path='edit/:cuit'
              element={
                <PermissionGuard
                  module='provider'
                  action='update'
                  moduleName='Proveedores'
                >
                  <EditProviderPage />
                </PermissionGuard>
              }
            />
          </Route>
          <Route path='employees'>
            <Route
              index
              element={
                <PermissionGuard
                  module='employee'
                  action='read'
                  moduleName='Empleados'
                >
                  <EmployeePage />
                </PermissionGuard>
              }
            />
            <Route
              path='create'
              element={
                <PermissionGuard
                  module='employee'
                  action='create'
                  moduleName='Empleados'
                >
                  <CreateEmployeePage />
                </PermissionGuard>
              }
            />
            <Route
              path='edit/:dni'
              element={
                <PermissionGuard
                  module='employee'
                  action='update'
                  moduleName='Empleados'
                >
                  <EditEmployeePage />
                </PermissionGuard>
              }
            />
          </Route>
        </Route>
        <Route path='movements'>
          <Route
            index
            element={
              <PermissionGuard module='box' action='read' moduleName='Caja'>
                <MovementPage />
              </PermissionGuard>
            }
          />
          <Route
            path='create'
            element={
              <PermissionGuard module='box' action='create' moduleName='Caja'>
                <CreateMovementPage />
              </PermissionGuard>
            }
          />
          <Route
            path='edit/:code'
            element={
              <PermissionGuard module='box' action='update' moduleName='Caja'>
                <EditMovementPage />
              </PermissionGuard>
            }
          />
        </Route>
        <Route path='/works'>
          <Route
            index
            element={
              <PermissionGuard
                module='construction'
                action='read'
                moduleName='Obras'
              >
                <ConstructionPage />
              </PermissionGuard>
            }
          />
          <Route
            path='create'
            element={
              <PermissionGuard
                module='construction'
                action='create'
                moduleName='Obras'
              >
                <CreateConstructionPage />
              </PermissionGuard>
            }
          />
          <Route
            path='edit/:nombre'
            element={
              <PermissionGuard
                module='construction'
                action='update'
                moduleName='Obras'
              >
                <EditConstructionPage />
              </PermissionGuard>
            }
          />
        </Route>
        <Route path='/stock' element={<StockPage />} />
        <Route path='/reports' element={<ReportsPage />} />

        <Route path='/admin'>
          <Route element={<AdminRoute />}>
            <Route path='users' element={<UserAdminPage />} />
            <Route path='users/create' element={<CreateUserPage />} />
            <Route path='users/edit/:dni' element={<EditUserPage />} />
            <Route
              path='clients'
              element={
                <PermissionGuard
                  module='client'
                  action='read'
                  moduleName='Clientes'
                >
                  <ClientAdminPage />
                </PermissionGuard>
              }
            />
          </Route>
        </Route>
      </Route>

      <Route path='*' element={<Error404 />} />
    </Routes>
  );
}
