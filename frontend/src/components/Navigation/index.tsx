import { NavLink, useLocation } from 'react-router-dom';
import { menu } from './data';
import styles from './menu.module.css';

const Menu = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <ul className="navbar-nav">
      {menu.map(item => (
        <li className="nav-item" key={item.id}>
          <NavLink
            to={item.link}
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default Menu;