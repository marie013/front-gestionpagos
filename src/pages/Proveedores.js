import axios from "axios";
import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";

export default function Proveedores() {
  const urlBase = "http://localhost:8082/gestion-de-pagos/proveedor";
  const [proveedores, setProveedor] = useState([]);

  useEffect(() => {
    listarProveedor();
  }, []);

  const listarProveedor = async () => {
    const resultado = await axios.get(urlBase);
    console.log("Resultado");
    console.log(resultado.data);
    setProveedor(resultado.data);
  };

  const eliminarProveedor = async (id) => {
    await axios.delete(`${urlBase}/${id}`);
    listarProveedor();
  };

  return (
    <div className="border-b border-gray-300 p-3 text-center">
      <h1 className="text-2xl font-semibold mb-4">Proveedores</h1>

      <div className="mb-3">
        <Link
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-900"
          to="/registrar-proveedor"
        >
          Registrar Proveedor
        </Link>
      </div>

      <div>
        <h2 className="mb-2 font-bold">Proveedores registrados</h2>
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
              {proveedores.map((proveedor, indice) => (
                <tr key={indice} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {proveedor.id_proveedor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {proveedor.nombre_proveedor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {proveedor.correo_electronico_proveedor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <NumericFormat
                      value={proveedor.cuit_proveedor}
                      displayType={"text"}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {proveedor.direccion_proveedor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {proveedor.razon_social_proveedor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {proveedor.rubro}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <NumericFormat
                      value={proveedor.telefono_proveedor}
                      displayType={"text"}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div>
                      <Link
                        to={`/editar/${proveedor.id_proveedor}`}
                        className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                      >
                        Editar
                      </Link>
                      {/* Cambiado de botón a enlace para eliminar */}
                      <span
                        onClick={() =>
                          eliminarProveedor(proveedor.id_proveedor)
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
  );
}
