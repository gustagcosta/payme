import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
  const { logout }: any = useAuth();
  const navigate = useNavigate();

  return (
    <Layout title="Home">
      <div className="d-grid gap-2">
        <a
          onClick={() => navigate('/charges')}
          className="btn btn-dark btn-block p-2"
        >
          Cobranças
        </a>
        <a
          onClick={() => navigate('/clients')}
          className="btn btn-dark btn-block p-2"
        >
          Clientes
        </a>
        <a
          onClick={() => navigate('/charges/qrcode')}
          className="btn btn-dark btn-block p-2"
        >
          Gerar pix
        </a>
        <button className="btn btn-dark btn-block p-2" onClick={logout}>
          Sair
        </button>
      </div>
    </Layout>
  );
};

export default Home;
