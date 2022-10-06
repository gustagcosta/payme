import { useState } from 'react';
import Layout from '../components/Layout';
import { api } from '../helpers/api';
import { useAuth } from '../hooks/useAuth';

const ClientsIndex = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const { token }: any = useAuth();

  const getClients = async () => {
    try {
      const response = await api.get('/clients', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': 'http://localhost:5173',
        },
      });

      console.log(response);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <Layout title="Clientes">
      <div>
        {error && (
          <div className="alert alert-danger" role="alert">
            Erro ao carregar clientes
          </div>
        )}
        <form>
          <div className="mb-3 row">
            <div className="col">
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
              />
            </div>
          </div>
          <div className="d-flex flex-row-reverse mb-3">
            <div className="p-1">
              <a
                className="btn btn-primary"
                style={{ width: '100px' }}
                href="#"
                onClick={getClients}
              >
                Pesquisar
              </a>
            </div>
            <div className="p-1">
              <a
                className="btn btn-success"
                style={{ width: '100px' }}
                href="#"
              >
                Novo
              </a>
            </div>
            <div className="p-1">
              <a
                className="btn btn-secondary"
                style={{ width: '100px' }}
                href="/home"
              >
                Voltar
              </a>
            </div>
          </div>
        </form>
      </div>
      <div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Gustavo Gonçalves</td>
              <td>geovani@email.com</td>
            </tr>
            <tr>
              <td>Gustavo Daniel</td>
              <td>geovani@email.com</td>
            </tr>
            <tr>
              <td>Geovanni Gianechine</td>
              <td>geovani@email.com</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default ClientsIndex;
