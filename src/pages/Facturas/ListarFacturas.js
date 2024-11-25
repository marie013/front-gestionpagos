import React, { useEffect, useState } from "react";
import axios from "axios";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";
export default function Facturas() {
  const urlBase = "http://localhost:8082/gestion-de-pagos/facturas";
  const [facturas, setFacturas] = useState([]);
  const [facturaSeleccionada, setFacturaSeleccionada] = useState(null); // Estado para la factura seleccionada
  const [mostrarModal, setMostrarModal] = useState(false); // Estado para mostrar/ocultar el modal

  useEffect(() => {
    listarFacturas();
  }, []);

  const listarFacturas = async () => {
    try {
      const resultado = await axios.get(urlBase);
      setFacturas(resultado.data);
    } catch (error) {
      console.error("Error al obtener las facturas:", error);
    }
  };

  const handleVer = (factura) => {
    setFacturaSeleccionada(factura); // Establece la factura seleccionada
    setMostrarModal(true); // Muestra el modal
  };

  const cerrarModal = () => {
    setFacturaSeleccionada(null);
    setMostrarModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 mt-16">
      <div className="max-w-7xl mx-auto">
        <header className="bg-white shadow-md rounded-lg mb-6">
          <div className="flex items-center justify-between px-4 py-3">
            <h1 className="text-2xl font-bold text-indigo-700">Facturas</h1>
            <div className="flex items-center space-x-4">
              <Link
                to="/registrarFactura"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
              >
                Registrar Factura
              </Link>
            </div>
          </div>
        </header>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Facturas Registradas</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Número Factura
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Entidad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cuit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {facturas.map((factura, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {factura.numeroFactura}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {factura.fecha_factura}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {factura.entidad.nombreEntidad}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {factura.cliente.nombreCliente}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {factura.cliente.cuitCliente}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <NumericFormat
                        value={factura.monto_factura}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                      <button
                        onClick={() => handleVer(factura)}
                        className="text-indigo-600 hover:text-indigo-900 mr-2"
                      >
                        Ver
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {mostrarModal && facturaSeleccionada && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/2">
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">
              Detalles de la Factura
            </h2>
            <p>
              <strong>Número de Factura:</strong> {facturaSeleccionada.numeroFactura}
            </p>
            <p>
              <strong>Fecha:</strong> {facturaSeleccionada.fecha_factura}
            </p>
            <p>
              <strong>Entidad:</strong> {facturaSeleccionada.entidad.nombreEntidad}
            </p>
            <p>
              <strong>Cliente:</strong> {facturaSeleccionada.cliente.nombreCliente}
            </p>
            <p>
              <strong>CUIT Cliente:</strong> {facturaSeleccionada.cliente.cuitCliente}
            </p>
            <p>
              <strong>Detalle:</strong> {facturaSeleccionada.detalle}
            </p>
            <p>
              <strong>Monto Total:</strong>{" "}
              <NumericFormat
                value={facturaSeleccionada.monto_factura}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}/>
            </p>
            <p>
              <strong>Deuda:</strong>{" "}
              <NumericFormat
                value={facturaSeleccionada.deuda}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}/>
            </p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={cerrarModal}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
