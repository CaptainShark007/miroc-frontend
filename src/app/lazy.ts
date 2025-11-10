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
export const ClientAdminPage = lazy(
  () => import('@features/client/pages/ClientAdminPage')
);
export const CreateClientPage = lazy(
  () => import('@features/client/pages/CreateClientPage')
);
export const EditClientPage = lazy(
  () => import('@features/client/pages/EditClientPage')
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
export const MovementPage = lazy(
  () => import('@features/box/pages/MovementPage')
);
export const CreateMovementPage = lazy(
  () => import('@features/box/pages/CreateMovementPage')
);
export const EditMovementPage = lazy(
  () => import('@features/box/pages/EditMovementPage')
);
export const ConstructionPage = lazy(
  () => import('@features/construction/pages/ConstructionPage')
);
export const CreateConstructionPage = lazy(
  () => import('@features/construction/pages/CreateConstructionPage')
);
export const EditConstructionPage = lazy(
  () => import('@features/construction/pages/EditConstructionPage')
);
export const ReportsPage = lazy(
  () => import('@features/reports/pages/ReportsPage')
);
export const StockPage = lazy(() => import('@features/stock/pages/StockPage'));
