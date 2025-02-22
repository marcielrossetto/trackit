import { Link } from "react-router-dom";

function Menu() {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <ul className="flex justify-around">
        <li>
          <Link to="/" className="hover:text-blue-400">Início</Link>
        </li>
        <li>
          <Link to="/cadastro" className="hover:text-blue-400">Cadastro</Link>
        </li>
        <li>
          <Link to="/habitos" className="hover:text-blue-400">Hábitos</Link>
        </li>
        <li>
          <Link to="/hoje" className="hover:text-blue-400">Hoje</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;
