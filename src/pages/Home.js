import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [entidad, setEntidad] = useState('');
  const [cantidadClientes, setCantidadClientes] = useState(0); // Nuevo estado para la cantidad de clientes
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEntidad = async () => {
      try {
        const response = await axios.get('http://localhost:8082/gestion-de-pagos/entidad'); // Ruta del backend
        const data = response.data[0]; // Asumiendo que es un array y tomas la primera entidad
        setEntidad(data.nombreEntidad); // Actualiza el estado con el nombre de la entidad
      } catch (err) {
        setError('Error al cargar los datos de la entidad.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchCantidadClientes = async () => {
      try {
        const response = await axios.get('http://localhost:8082/gestion-de-pagos/clientes/cantidad'); // Ruta del backend para la cantidad de clientes
        setCantidadClientes(response.data); // Actualiza el estado con la cantidad de clientes
      } catch (err) {
        setError('Error al cargar la cantidad de clientes.');
        console.error(err);
      }
    };

    fetchEntidad();
    fetchCantidadClientes();
  }, []); // Asegúrate de que esta función se ejecute solo una vez al montar el componente

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 mt-16">
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <header className="bg-white shadow-md rounded-lg mb-6">
          <div className="flex items-center justify-between px-4 py-3">
            <h1 className="text-2xl font-bold text-indigo-700">Administración</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Link className="flex items-center space-x-2 text-gray-700 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full p-2" to="/entidad">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>{entidad}</span>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <nav className="bg-white shadow-md rounded-lg mb-6 p-4">
          <ul className="flex space-x-4">
            <li>
              <Link to="/clientes" className="flex items-center px-3 py-2 text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Clientes
              </Link>
            </li>
            <li>
              <Link to="/pagos" className="flex items-center px-3 py-2 text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Pagos
              </Link>
            </li>
          </ul>
        </nav>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Clientes</h2>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-gray-800">{cantidadClientes}</p> {/* Mostrar la cantidad de clientes */}
            <p className="text-sm text-gray-500 mt-2">+2.1% desde el mes pasado</p>
          </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Pagos Pendientes</h2>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-gray-800">230</p>
          <p className="text-sm text-gray-500 mt-2">-4.5% desde la semana pasada</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Órdenes Activas</h2>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-gray-800">320</p>
          <p className="text-sm text-gray-500 mt-2">+12% desde ayer</p>
        </div>
      </section>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Pagos Recientes</h2>
        </div> */}
        {/* <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID de Orden</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#12345</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">John Doe</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Oct 2, 2024</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$500</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completado</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#12346</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jane Smith</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Oct 3, 2024</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$750</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100  text-yellow-800">Pendiente</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#12347</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Alice Johnson</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Oct 4, 2024</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$1000</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">En Proceso</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div> */}
      </div>
    </div>
    </div>
   
  )
}