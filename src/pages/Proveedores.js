import React from 'react';
import { Link } from 'react-router-dom';

export default function Proveedores() {
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-semibold mb-4'>Proveedores</h1>
      
      <div className='mb-3'>
        <Link className='bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-900' to="/registrar-proveedor">Registrar Proveedor</Link>
      </div>
      <div>
        <h2>Proveedores registrados</h2>
      </div>
    </div>
  );
}
