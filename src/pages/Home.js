import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [entidad, setEntidad] = useState('');
  const [cantidadClientes, setCantidadClientes] = useState(0); 
  const [cantidadFacturas, setCantidadFacturas] = useState(0); 
  const [cantidadPagosPendientes, setCantidadPagosPendientes] = useState(0);
  const [ultimosPagos, setUltimosPagos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getStatusColor = (status) => {
    switch (status) {
        case "Completo":
            return "bg-green-100 text-green-800";
        case "Pendiente":
            return "bg-yellow-100 text-yellow-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};
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
    const fetchCantidadFacturas = async () => {
      try {
        const response = await axios.get('http://localhost:8082/gestion-de-pagos/facturas/cantidad'); 
        setCantidadFacturas(response.data); 
      } catch (err) {
        setError('Error al cargar la cantidad de facturas.');
        console.error(err);
      }
    };

    const fetchCantidadPagosPendientes = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8082/gestion-de-pagos/pagosContadosPorEstado/pendiente'
        ); // Cambia la URL según tu configuración del backend
        setCantidadPagosPendientes(response.data); // Actualiza el estado con la cantidad
      } catch (err) {
        console.error('Error al cargar los pagos pendientes:', err);
        setError('Error al cargar la cantidad de pagos pendientes.');
      }
    };
    
    const fetchUltimosPagos = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8082/gestion-de-pagos/ultimosPagos',
          { params: { cantidad: 4 } } 
        );
        setUltimosPagos(response.data); 
      } catch (err) {
        console.error('Error al cargar los últimos pagos:', err);
        setError('Error al cargar los últimos pagos.');
      }
    };

    fetchEntidad();
    fetchCantidadClientes();
    fetchCantidadFacturas();
    fetchCantidadPagosPendientes();
    fetchUltimosPagos();
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
            <li>
  <Link to="/facturas" className="flex items-center px-3 py-2 text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
    Facturas
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
            <p className="text-3xl font-bold text-gray-800">{cantidadClientes}</p>
            
          </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Pagos Pendientes</h2>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-gray-800">{cantidadPagosPendientes}</p> 
          
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Facturas</h2>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2 text-blue-500">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
          </div>
          <p className="text-3xl font-bold text-gray-800">{cantidadFacturas}</p>
          
        </div>
      </section>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Pagos Recientes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {ultimosPagos.map((pago, index) => (
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pago.id_pago}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pago.factura?.cliente?.nombreCliente}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(pago.fecha).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${pago.total.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(pago.estadoPago)}`}>
                                            {pago.estadoPago}
                                        </span>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
   
  )
}