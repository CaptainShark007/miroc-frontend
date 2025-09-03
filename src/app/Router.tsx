import { LoginPage } from '@app/lazy';
import { Route, Routes } from 'react-router';

export default function Router() {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
    </Routes>
  );
}
