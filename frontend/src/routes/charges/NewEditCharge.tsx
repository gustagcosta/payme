import { AxiosResponse } from 'axios';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../components/Layout';
import { Action } from '../../helpers/action';
import { doRequest } from '../../helpers/api';

type Props = {
  action: Action;
};

const NewEditCharge = ({ action }: Props) => {
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [client, setClient] = useState('');
  const [payed, setPayed] = useState(false);
  const [deadline, setDeadline] = useState('');

  const [error, setError] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [title, setTitle] = useState('');

  const navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    if (action === Action.edit) {
      setTitle('Editar Cobrança');
      prepareEdit();
    }

    if (action === Action.new) {
      setTitle('Nova Cobrança');
    }
  }, []);

  const prepareEdit = async () => {
    try {
      const response = await doRequest('GET', `/charges/${id}`, true);
      const data = await response.json();

      setPayed(data.payed)
      setDescription(data.description)
      setDeadline(data.deadline.split('T')[0])
      setClient(data.client_id)
      setValue(data.value)
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      let method = 'POST';
      let url = '/charges';

      const body: any = {
        value: Number(value),
        description,
        client_id: Number(client),
        payed,
        deadline: `${deadline}T00:00:01Z`,
      };

      if (action === Action.edit) {
        method = 'PUT';
        body.id = Number(id);
      }

      const response = await doRequest(method, url, true, body);

      if (response.status === 204 || response.status === 200) {
        navigate('/charges');
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
      const response = await doRequest('DELETE', `/charges/${id}`, true);

      if (response.status === 204) {
        navigate('/charges');
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
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Valor em reais (min 1, max ?)
          </label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Prazo
          </label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Código do Cliente
          </label>
          <input
            type="number"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={payed}
              onChange={(e) => setPayed(e.target.checked)}
              id="flexCheckChecked"
            />
            <label className="form-check-label" htmlFor="flexCheckChecked">
              Pago?
            </label>
          </div>
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
              onClick={() => navigate('/charges')}
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

export default NewEditCharge;
