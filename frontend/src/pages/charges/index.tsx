import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import { BsFillEyeFill } from 'react-icons/bs';

const ChargesIndex: NextPage = () => {
  const [name, setName] = useState('');
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('TOKEN');

    if (!token) {
      await router.push('/login');
    }
  };

  return (
    <Layout title="Cobranças">
      <div>
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
            <div className="col">
              <label htmlFor="floatingSelect">Status</label>
              <select
                defaultValue={''}
                className="form-select"
                id="floatingSelect"
              >
                <option value="" disabled></option>
                <option value="1" className="text text-success">
                  Pago
                </option>
                <option value="2" className="text text-danger">
                  Inadimplente
                </option>
                <option value="3" className="text text-primary">
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
                href="#"
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
            <tr className="table-success">
              <td>Gustavo Gonçalves</td>
              <td>25$</td>
              <td>25/12/2000</td>
            </tr>
            <tr className="table-danger">
              <td>Gustavo Daniel</td>
              <td>25$</td>
              <td>25/12/2000</td>
            </tr>
            <tr className="table-primary">
              <td>Geovanni Gianechine</td>
              <td>25$</td>
              <td>25/12/2000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default ChargesIndex;
