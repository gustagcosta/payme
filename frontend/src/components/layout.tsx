import Head from 'next/head';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  title: string;
};

export default function Layout({ children, title }: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <nav className="navbar navbar-dark text-light bg-dark">
        <div className="container-fluid justify-content-center">
          <span className="navbar-brand fs-3 text">Payme</span>
        </div>
      </nav>
      <main className="container">{children}</main>
    </>
  );
}
