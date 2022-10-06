import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { ProtectedRoute } from './components/ProtectRoute';
import { AuthProvider } from './hooks/useAuth';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './routes/Login';
import Register from './routes/Register';
import Home from './routes/Home';
import ClientsIndex from './routes/clients/ClientsIndex';
import ChargesIndex from './routes/charges/ChargesIndex';
import NewEditShowClient from './routes/clients/NewEditShowClient';
import { Action } from './helpers/action.enum';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clients"
            element={
              <ProtectedRoute>
                <ClientsIndex />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clients/new"
            element={
              <ProtectedRoute>
                <NewEditShowClient action={Action.new} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clients/:id"
            element={
              <ProtectedRoute>
                <NewEditShowClient action={Action.edit} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/charges"
            element={
              <ProtectedRoute>
                <ChargesIndex />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
