import {
  LoginPage,
  DashboardPage,
  ConfigurationPage,
  EmployeePage,
  ClientPage,
  ProviderPage,
  BoxPage,
  StockPage,
  ReportsPage,
  ConstructionPage,
  UserAdminPage,
  CreateUserPage,
  EditUserPage,
  CreateProviderPage,
  EditProviderPage
} from '@app/lazy';
import { Error404 } from '@/shared/components/Error404';
import { Route, Routes } from 'react-router';
import DashboardLayout from '@/layout/DashboardLayout';
import ProtectedRoute from '@/shared/components/ProtectedRoute';
import PublicRoute from '@/shared/components/PublicRoute';
import AdminRoute from '@/shared/components/AdminRoute';

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
          <Route path='employees' element={<EmployeePage />} />
        </Route>
        <Route path='/box' element={<BoxPage />} />
        <Route path='/works' element={<ConstructionPage />} />
        <Route path='/stock' element={<StockPage />} />
        <Route path='/reports' element={<ReportsPage />} />

        <Route path='/admin'>
          <Route element={<AdminRoute />}>
            <Route path='users' element={<UserAdminPage />} />
            <Route path='users/create' element={<CreateUserPage />} />
            <Route path='users/edit/:id' element={<EditUserPage />} />
          </Route>
        </Route>
      </Route>

      <Route path='*' element={<Error404 />} />
    </Routes>
  );
}
