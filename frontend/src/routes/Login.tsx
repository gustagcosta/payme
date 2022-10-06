import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Layout from '../components/Layout';
import { api } from '../helpers/api';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const { login }: any = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post('/login', { email, password });

      if (response.status === 200) {
        login(response.data.token);
      } else {
        throw response;
      }
    } catch (error) {
      setError(true);
    }
  };

  return (
    <Layout title="Login">
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Senha
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
          />
        </div>
        {error && (
          <div className="p-2 mb-3 bg-danger text-white rounded">
            Erro ao fazer login.
          </div>
        )}
        <button type="submit" className="btn btn-primary mb-3">
          Entrar
        </button>
      </form>
      <div>
        <a
          onClick={() => navigate('/register')}
          className="link link-primary fs-5"
          style={{ cursor: 'pointer' }}
        >
          Ou faça seu cadastro
        </a>
      </div>
    </Layout>
  );
};

export default Login;
