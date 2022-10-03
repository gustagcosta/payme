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
    <Layout title="Home Page">
      <h1>Home</h1>
      <p>
        <button className="btn btn-primary" onClick={logout}>
          Sair
        </button>
      </p>
      <ul className="list-group">
        <a href="/clients" className="list-group-item list-group-item-action">
          Cobranças
        </a>
        <a href="/charges" className="list-group-item list-group-item-action">
          Clientes
        </a>
      </ul>
    </Layout>
  );
};

export default Home;
