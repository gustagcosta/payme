import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Layout from '../../components/Layout';
import { doRequest } from '../../helpers/api';
import { useAuth } from '../../hooks/useAuth';

const ClientsIndex = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [clients, setClientes] = useState([] as any[]);

  const { token }: any = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getClients();
  }, []);

  const getClients = async () => {
    try {
      const response = await doRequest('GET', '/clients', true);
      const data = await response.json();

      let clientsFiltered: any[] = [];

      data.filter((i: any) => {
        let clientName = i.name.toLowerCase();

        if (clientName.toLowerCase().includes(name)) {
          clientsFiltered.push(i);
        }
      });

      setClientes(clientsFiltered);
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
            Erro ao carregar clientes.
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
                onClick={() => navigate('/clients/new')}
              >
                Novo
              </a>
            </div>
            <div className="p-1">
              <a
                className="btn btn-secondary"
                style={{ width: '100px' }}
                onClick={() => navigate('/home')}
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
              <th>#</th>
              <th>Nome</th>
            </tr>
          </thead>
          <tbody>
            {clients.length > 0 &&
              clients.map((i: any) => (
                <tr
                  key={i.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/clients/${i.id}`)}
                >
                  <td>{i.id}</td>
                  <td>{i.name}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default ClientsIndex;
