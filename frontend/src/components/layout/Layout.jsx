import { Outlet } from 'react-router-dom';
import Menu from '../Navigation';
import styles from './Layout.module.css'; 

const Layout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="bg-dark text-white">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <h1 className="navbar-brand mb-0 h1">Библиотека</h1>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#mainMenu"
              aria-controls="mainMenu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="mainMenu">
              <div className="ms-auto">
                <Menu /> 
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow-1">
        <div className="container my-4">
          <Outlet />
        </div>
      </main>

      <footer className="bg-light text-dark border-top mt-auto py-3">
        <div className="container text-center">
          <p className="mb-0">© 2026 Библиотека Артема Г. | Все права защищены</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;