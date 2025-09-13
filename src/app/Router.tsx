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
} from '@app/lazy';
import { Error404 } from '@/shared/components/Error404';
import { Route, Routes } from 'react-router';
import DashboardLayout from '@/layout/DashboardLayout';
import ProtectedRoute from '@/shared/components/ProtectedRoute';
import PublicRoute from '@/shared/components/PublicRoute';

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
        <Route path='/entities/clients' element={<ClientPage />} />
        <Route path='/entities/suppliers' element={<ProviderPage />} />
        <Route path='/entities/employees' element={<EmployeePage />} />
        <Route path='/box' element={<BoxPage />} />
        <Route path='/works' element={<ConstructionPage />} />
        <Route path='/stock' element={<StockPage />} />
        <Route path='/reports' element={<ReportsPage />} />
      </Route>

      <Route path='*' element={<Error404 />} />
    </Routes>
  );
}
