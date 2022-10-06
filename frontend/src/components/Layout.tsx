import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  title: string;
};

export default function Layout({ children, title }: Props) {
  document.title = title;
  
  return (
    <>
      <nav className="navbar navbar-dark text-light bg-dark">
        <div className="container">
          <span className="navbar-brand fs-3 text">Payme / {title}</span>
        </div>
      </nav>
      <main className="container mt-3">{children}</main>
    </>
  );
}
