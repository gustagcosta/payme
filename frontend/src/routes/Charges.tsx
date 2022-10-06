import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { api } from '../helpers/api';
import { useAuth } from '../hooks/useAuth';
import { formatDate } from '../utils/formatDateTime';

const ChargesIndex = () => {
  const [error, setError] = useState(false);
  const [charges, setCharges] = useState([]);
  const [status, setStatus] = useState('');

  const { token }: any = useAuth();

  useEffect(() => {
    getCharges();
  });

  const getCharges = async () => {
    try {
      const response = await api.get('/charges', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let charges = [];

      if (status === 'paid') {
        charges = response.data.filter((charge: any) => charge.payed == 1);
      } else if (status === 'unpaid') {
        charges = response.data.filter(
          (charge: any) =>
            charge.payed == 0 && new Date(charge.deadline) < new Date()
        );
      } else if (status === 'active') {
        charges = response.data.filter(
          (charge: any) =>
            charge.payed == 0 && new Date(charge.deadline) >= new Date()
        );
      } else {
        charges = response.data;
      }

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
            Erro ao carregar cobranças
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
              <th>Cliente</th>
              <th>Valor</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {charges.length > 0 &&
              charges.map((i: any) => (
                <tr key={i.id} className={getRowColor(i)}>
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
