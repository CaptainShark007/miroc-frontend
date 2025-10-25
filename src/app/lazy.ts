import { lazy } from 'react';

export const LoginPage = lazy(() => import('@features/auth/pages/LoginPage'));
export const DashboardPage = lazy(
  () => import('@features/dashboard/pages/DashboardPage')
);
export const ConfigurationPage = lazy(
  () => import('@features/configuration/pages/ConfigurationPage')
);
export const UserAdminPage = lazy(
  () => import('@features/admin/pages/UserAdminPage')
);
export const CreateUserPage = lazy(
  () => import('@features/admin/pages/CreateUserPage')
);
export const EditUserPage = lazy(
  () => import('@features/admin/pages/EditUserPage')
);
export const ClientPage = lazy(
  () => import('@features/client/pages/ClientPage')
);
export const ProviderPage = lazy(
  () => import('@features/provider/pages/ProviderPage')
);
export const CreateProviderPage = lazy(
  () => import('@/features/provider/pages/CreateProviderPage')
);
export const EditProviderPage = lazy(
  () => import('@/features/provider/pages/EditProviderPage')
);
export const EmployeePage = lazy(
  () => import('@features/employee/pages/EmployeePage')
);
export const CreateEmployeePage = lazy(
  () => import('@features/employee/pages/CreateEmployeePage')
);
export const EditEmployeePage = lazy(
  () => import('@features/employee/pages/EditEmployeePage')
);
export const BoxPage = lazy(() => import('@features/box/pages/BoxPage'));
export const ConstructionPage = lazy(
  () => import('@features/construction/pages/ConstructionPage')
);
export const ReportsPage = lazy(
  () => import('@features/reports/pages/ReportsPage')
);
export const StockPage = lazy(() => import('@features/stock/pages/StockPage'));
