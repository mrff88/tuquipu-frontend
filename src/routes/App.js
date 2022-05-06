import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { NoAuthLayout } from '../components/layouts';
import { Login, Register } from '../pages';

function App() {
  return (
    <Routes>
      <Route element={<NoAuthLayout />}>
        <Route index element={<Login />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
