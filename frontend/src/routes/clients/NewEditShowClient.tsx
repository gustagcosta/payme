import { AxiosResponse } from 'axios';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../components/Layout';
import { Action } from '../../helpers/action.enum';
import { api } from '../../helpers/api';

type Props = {
  action: Action;
};

const NewEditShowClient = ({ action }: Props) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [title, setTitle] = useState('');

  const navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    if (action === Action.edit) {
      setTitle('Editar Cliente');
      prepareEdit();
    }

    if (action === Action.new) {
      setTitle('Novo Cliente');
    }
  }, []);

  const prepareEdit = async () => {
    try {
      const response = await api.get(`/clients/${id}`);

      setEmail(response.data.email);
      setName(response.data.name);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      let response: AxiosResponse;

      if (action === Action.new) {
        response = await api.post('/clients', {
          name,
          email,
        });
      } else {
        response = await api.put('/clients', {
          id: Number(id),
          name,
          email,
        });
      }

      if (response.status === 204 || response.status === 200) {
        navigate('/clients');
      } else {
        throw response;
      }
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  const handleDelete = async () => {
    try {
      let response = await api.delete(`/clients/${id}`);

      if (response.status === 204) {
        navigate('/clients');
      } else {
        throw response;
      }
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  return (
    <Layout title={title}>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Nome
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            required
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
            required
          />
        </div>
        {error && (
          <div className="alert alert-danger" role="alert">
            Erro ao executar ação.
          </div>
        )}
        <div className="d-flex flex-row-reverse mb-3">
          <div className="p-1">
            <button className="btn btn-success">
              {action === Action.new ? 'Criar' : 'Editar'}
            </button>
          </div>
          {action === Action.edit && (
            <div className="p-1">
              <span onClick={handleDelete} className="btn btn-danger">
                Deletar
              </span>
            </div>
          )}
          <div className="p-1">
            <a
              onClick={() => navigate('/clients')}
              className="btn btn-secondary"
            >
              Voltar
            </a>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default NewEditShowClient;
