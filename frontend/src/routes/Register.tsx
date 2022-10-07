import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Layout from '../components/Layout';
import { doRequest } from '../helpers/api';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [pixKey, setPixKey] = useState('');
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await doRequest('POST', '/register', false, {
        name,
        email,
        password,
        pik_key: pixKey,
      });

      if (response.status === 204) {
        navigate('/');
      } else {
        throw response;
      }
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <Layout title="Cadastro">
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Nome
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Chave pix
          </label>
          <input
            type="text"
            value={pixKey}
            onChange={(e) => setPixKey(e.target.value)}
            className="form-control"
          />
        </div>
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
            Erro ao fazer cadastro.
          </div>
        )}
        <button type="submit" className="btn btn-primary mb-3">
          Cadastrar-se
        </button>
      </form>
      <div>
        <a
          onClick={() => navigate('/login')}
          className="link link-primary fs-5"
          style={{ cursor: 'pointer' }}
        >
          Ou faça o seu login
        </a>
      </div>
    </Layout>
  );
};

export default Register;
