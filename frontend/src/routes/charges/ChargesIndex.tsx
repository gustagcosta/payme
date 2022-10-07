import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Layout from '../../components/Layout';
import { doRequest } from '../../helpers/api';
import { formatDate } from '../../helpers/formatDateTime';

const ChargesIndex = () => {
  const [error, setError] = useState(false);
  const [charges, setCharges] = useState([] as any[]);
  const [status, setStatus] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    getCharges();
  }, []);

  const getCharges = async () => {
    try {
      const response = await doRequest('GET', `/charges`, true);
      const data = await response.json();

      let charges: any[] = [];

      data.map((charge: any) => {
        if (status === '') {
          charges.push(charge);
        }

        if (status === 'paid' && charge.payed == 1) {
          charges.push(charge);
        }

        if (
          status === 'active' &&
          charge.payed == 0 &&
          new Date(charge.deadline) >= new Date()
        ) {
          charges.push(charge);
        }

        if (
          status === 'unpaid' &&
          charge.payed == 0 &&
          new Date(charge.deadline) < new Date()
        ) {
          charges.push(charge);
        }
      });

      setCharges(charges);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const getRowColor = (charge: any) => {
    if (charge.payed) {
      return 'table-success';
    }

    if (new Date(charge.deadline) > new Date()) {
      return 'table-primary';
    } else {
      return 'table-danger';
    }
  };

  return (
    <Layout title="Cobranças">
      <div>
        {error && (
          <div className="alert alert-danger" role="alert">
            Erro ao carregar cobranças.
          </div>
        )}
        <form>
          <div className="mb-3 row">
            <div className="col">
              <label htmlFor="floatingSelect">Status</label>
              <select
                className="form-select"
                id="floatingSelect"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Todas</option>
                <option value="paid" className="text text-success">
                  Pago
                </option>
                <option value="unpaid" className="text text-danger">
                  Inadimplente
                </option>
                <option value="active" className="text text-primary">
                  Ativa
                </option>
              </select>
            </div>
          </div>
          <div className="d-flex flex-row-reverse mb-3">
            <div className="p-1">
              <a
                className="btn btn-primary"
                style={{ width: '100px' }}
                onClick={getCharges}
              >
                Pesquisar
              </a>
            </div>
            <div className="p-1">
              <a
                className="btn btn-success"
                style={{ width: '100px' }}
                onClick={() => navigate('/charges/new')}
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
              <th>Cliente</th>
              <th>Valor</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {charges.length > 0 &&
              charges.map((i: any) => (
                <tr
                  key={i.id}
                  className={getRowColor(i)}
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/charges/${i.id}`)}
                >
                  <td>{i.client}</td>
                  <td>{i.value}R$</td>
                  <td>{formatDate(i.deadline)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default ChargesIndex;
