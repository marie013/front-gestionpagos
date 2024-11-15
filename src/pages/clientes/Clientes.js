import axios from "axios";
import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";

export default function Clientes() {
  const urlBase = "http://localhost:8082/gestion-de-pagos/clientes";
  const [Clientes, setCliente] = useState([]);

  useEffect(() => {
    listarCliente();
  }, []);

  const listarCliente = async () => {
    const resultado = await axios.get(urlBase);
    console.log("Resultado");
    console.log(resultado.data);
    setCliente(resultado.data);
  };

  const eliminarCliente = async (id) => {
    await axios.delete(`${urlBase}/${id}`);
    listarCliente();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 mt-16">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <h1 className="text-2xl font-semibold mb-4 text-center">Clientes</h1>

      <div className="mb-3">
        <Link className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-900"
          to="/registrar-proveedor">
          Registrar cliente
        </Link>
      </div>

      <div>
        <h2 className="mb-2 font-bold">Clientes registrados</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-sm font-medium text-gray-900">
                  ID
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-900">
                  Nombre
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-900">
                  Correo
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-900">
                  CUIT
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-900">
                  Dirección
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-900">
                  Razón Social
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-900">
                  Rubro
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-900">
                  Teléfono
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-900"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Clientes.map((cliente, indice) => (
                <tr key={indice} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {cliente.id_cliente}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {cliente.nombreCliente}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {cliente.correo_electronico_cliente}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <NumericFormat
                      value={cliente.cuit_cliente}
                      displayType={"text"}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {cliente.direccion_cliente}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {cliente.razon_social_cliente}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {cliente.rubro}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <NumericFormat
                      value={cliente.telefono_cliente}
                      displayType={"text"}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div>
                      <Link
                        to={`/editar/${cliente.id_cliente}`}
                        className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                      >
                        Editar
                      </Link>
                      {/* Cambiado de botón a enlace para eliminar */}
                      <span
                        onClick={() =>
                          eliminarCliente(cliente.id_cliente)
                        }
                        className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                      >
                        Eliminar
                      </span>
                    </div>
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
