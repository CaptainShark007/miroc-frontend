import { Route, Routes } from 'react-router';

export default function Router() {
  return (
    <Routes>
      <Route path='/' element={<div>Hola Mundo</div>} />
    </Routes>
  );
}
