import React, { useEffect, useState } from "react";
import axios from "axios";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";

export default function Clientes() {
  const urlBase = "http://localhost:8082/gestion-de-pagos/clientes";
  const [clientes, setClientes] = useState([]);
  const [nombreCliente, setNombreCliente] = useState(""); // Estado para la búsqueda

  useEffect(() => {
    listarClientes();
  }, []);

  const listarClientes = async () => {
    const resultado = await axios.get(urlBase);
    setClientes(resultado.data);
  };

  const buscarClientePorNombre = async (nombre) => {
    if (!nombre.trim()) {
      listarClientes(); // Si el input está vacío, recarga la lista completa
      return;
    }

    try {
      const resultado = await axios.get(`http://localhost:8082/gestion-de-pagos/cliente/nombre/${nombre}`);
      const clienteEncontrado = {
        id_cliente: resultado.data, 
        nombreCliente: nombre, 
        correo_electronico_cliente: "",
        cuit_cliente: "",
        direccion_cliente: "",
        razon_social_cliente: "",
        rubro: "",
        telefono_cliente: "",
      };
      setClientes([clienteEncontrado]); // Actualiza la lista con el cliente encontrado
    } catch (error) {
      console.error("Error al buscar cliente:", error);
      setClientes([]); // Limpia la lista si no se encuentra el cliente
    }
  };

  const eliminarCliente = async (id) => {
    await axios.delete(`${urlBase}/${id}`);
    listarClientes();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 mt-16">
      <div className="max-w-7xl mx-auto">
        <header className="bg-white shadow-md rounded-lg mb-6">
          <div className="flex items-center justify-between px-4 py-3">
            <h1 className="text-2xl font-bold text-indigo-700">Clientes</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Buscar por nombre..."
                  value={nombreCliente}
                  onChange={(e) => setNombreCliente(e.target.value)} // Actualiza el estado
                  onKeyDown={(e) => e.key === "Enter" && buscarClientePorNombre(nombreCliente)} // Buscar al presionar Enter
                  className="pl-8 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <Link
                to="/registrar-proveedor"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
              >
                Registrar Cliente
              </Link>
            </div>
          </div>
        </header>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Clientes Registrados</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CUIT</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dirección</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Razón Social</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rubro</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {clientes.map((cliente, indice) => (
                  <tr key={indice} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cliente.id_cliente}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cliente.nombreCliente}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cliente.correo_electronico_cliente}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <NumericFormat value={cliente.cuitCliente} displayType={"text"} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cliente.direccion_cliente}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cliente.razon_social_cliente}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cliente.rubro}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <NumericFormat value={cliente.telefono_cliente} displayType={"text"} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={`/editar/${cliente.id_cliente}`} className="text-indigo-600 hover:text-indigo-900 mr-4">Editar</Link>
                      <button onClick={() => eliminarCliente(cliente.id_cliente)} className="text-red-600 hover:text-red-900">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
