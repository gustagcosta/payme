import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from '../components/layout';

const Home: NextPage = () => {
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

  const logout = async () => {
    localStorage.setItem('TOKEN', '');
    await router.push('/login');
  };

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
