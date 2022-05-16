import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Notifications } from '../components/Notifications';
import {
  AdminRoutesGuard,
  NoAuthLayout,
  WithAuthLayout,
} from '../components/layouts';
import { Clients, Login, Register, Users } from '../pages';

function App() {
  return (
    <>
      <Routes>
        <Route element={<WithAuthLayout />}>
          <Route element={<AdminRoutesGuard />}>
            <Route index element={<Users />} />
            <Route exact path="/usuarios" element={<Users />}></Route>
          </Route>
          <Route exact path="/clientes" element={<Clients />}></Route>
          <Route path="/not-found" element={<h1>404 Not Found</h1>} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Route>
        <Route element={<NoAuthLayout />}>
          <Route index element={<Login />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Route>
      </Routes>
      <Notifications />
    </>
  );
}

export default App;
