import Layout from '../components/Layout';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
  const { logout }: any = useAuth();

  return (
    <Layout title="Home">
      <div className="d-grid gap-2">
        <a href="/charges" className="btn btn-primary btn-block p-2">
          Cobranças
        </a>
        <a href="/clients" className="btn btn-primary btn-block p-2">
          Clientes
        </a>
        <button className="btn btn-secondary btn-block p-2" onClick={logout}>
          Sair
        </button> 
      </div>
    </Layout>
  );
};

export default Home;
