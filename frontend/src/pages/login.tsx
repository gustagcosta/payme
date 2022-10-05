import type { NextPage } from 'next';
import React, { FormEvent, useState } from 'react';
import Layout from '../components/layout';
import { useRouter } from 'next/router';

const Login: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        router.push('/home');
        localStorage.setItem('TOKEN', data.token);
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
          <div className="alert alert-danger" role="alert">
            Email ou senha inválidos
          </div>
        )}
        <button type="submit" className="btn btn-primary mb-3">
          Entrar
        </button>
      </form>
      <div>
        <a href="/register" className="link link-primary fs-5">
          Ou faça o seu cadastro
        </a>
      </div>
    </Layout>
  );
};

export default Login;
