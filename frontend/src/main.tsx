import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ProtectedRoute } from './components/ProtectRoute';
import { AuthProvider } from './hooks/useAuth';
import { Action } from './helpers/action';

import Login from './routes/Login';
import Register from './routes/Register';
import Home from './routes/Home';
import ClientsIndex from './routes/clients/ClientsIndex';
import ChargesIndex from './routes/charges/ChargesIndex';
import NewEditClient from './routes/clients/NewEditClient';
import NewEditCharge from './routes/charges/NewEditCharge';

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
                <NewEditClient action={Action.new} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clients/:id"
            element={
              <ProtectedRoute>
                <NewEditClient action={Action.edit} />
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
          <Route
            path="/charges/new"
            element={
              <ProtectedRoute>
                <NewEditCharge action={Action.new} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/charges/:id"
            element={
              <ProtectedRoute>
                <NewEditCharge action={Action.edit} />
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
