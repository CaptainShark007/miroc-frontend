import {
  LoginPage,
  DashboardPage,
  ConfigurationPage,
  EmployeePage,
  ClientPage,
  ClientAdminPage,
  ProviderPage,
  BoxPage,
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
          <Route path='clients' element={<ClientPage />} />
          {/* <Route path='suppliers' element={<ProviderPage />} /> */}
          <Route path='suppliers'>
            <Route index element={<ProviderPage />} />
            <Route path='create' element={<CreateProviderPage />} />
            <Route path='edit/:cuit' element={<EditProviderPage />} />
          </Route>
          <Route path='employees'>
            <Route index element={<EmployeePage />} />
            <Route path='create' element={<CreateEmployeePage />} />
            <Route path='edit/:dni' element={<EditEmployeePage />} />
          </Route>
        </Route>
        <Route path='movements'>
          <Route index element={<MovementPage />} />
          <Route path='create' element={<CreateMovementPage />} />
          <Route path='edit/:code' element={<EditMovementPage />} />
        </Route>
        <Route path='/box' element={<BoxPage />} />
        <Route path='/works'>
          <Route index element={<ConstructionPage />} />
          <Route path='create' element={<CreateConstructionPage />} />
          <Route path='edit/:nombre' element={<EditConstructionPage />} />
        </Route>
        <Route path='/stock' element={<StockPage />} />
        <Route path='/reports' element={<ReportsPage />} />

        <Route path='/admin'>
          <Route element={<AdminRoute />}>
            <Route path='users' element={<UserAdminPage />} />
            <Route path='users/create' element={<CreateUserPage />} />
            <Route path='users/edit/:id' element={<EditUserPage />} />
            <Route path='clients' element={<ClientAdminPage />} />
          </Route>
        </Route>
      </Route>

      <Route path='*' element={<Error404 />} />
    </Routes>
  );
}
