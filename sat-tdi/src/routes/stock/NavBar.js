import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-gray-800" >
      <ul className="flex justify-between items-center max-w-4xl mx-auto p-4" >
        <li className="text-white font-bold text-lg hover:text-gray-300" ><Link to="/stockCount">Ver todo el stock</Link></li>
        <li className="text-white font-bold text-lg hover:text-gray-300" ><Link to="/stock">Agregar stock</Link></li>
        <li className="text-white font-bold text-lg hover:text-gray-300" ><Link to="/items">Agregar productos</Link></li>
        <li className="text-white font-bold text-lg hover:text-gray-300" ><Link to="/supplier">Agregar proveedores</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;