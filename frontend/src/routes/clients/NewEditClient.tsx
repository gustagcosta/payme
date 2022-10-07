import { AxiosResponse } from 'axios';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../components/Layout';
import { Action } from '../../helpers/action';
import { doRequest } from '../../helpers/api';

type Props = {
  action: Action;
};

const NewEditClient = ({ action }: Props) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
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
      const response = await doRequest('GET', `/clients/${id}`, true);
      const data = await response.json();

      setEmail(data.email);
      setName(data.name);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      let method = 'POST';
      let url = '/clients';

      const body: any = {
        name,
        email,
      };

      if (action === Action.edit) {
        method = 'PUT';
        body.id = Number(id);
      }

      const response = await doRequest(method, url, true, body);

      if (response.status === 204 || response.status === 200) {
        navigate('/clients');
      } else {
        throw response;
      }
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await doRequest('DELETE', `/clients/${id}`, true);

      if (response.status === 204) {
        navigate('/clients');
      } else {
        throw response;
      }
    } catch (error) {
      console.log(error);
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
              <span
                onClick={(e) => setConfirmDelete(!confirmDelete)}
                className={
                  !confirmDelete ? 'btn btn-danger' : 'btn btn-secondary'
                }
              >
                {!confirmDelete ? 'Deletar' : 'Cancelar'}
              </span>
            </div>
          )}
          {confirmDelete && (
            <div className="p-1">
              <span onClick={handleDelete} className="btn btn-danger">
                Confirmar
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

export default NewEditClient;
