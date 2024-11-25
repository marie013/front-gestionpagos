// Comprobantes.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function Comprobantes() {
    const [pagos, setPagos] = useState([]);

    // Obtener los pagos del backend
    useEffect(() => {
        axios
            .get("http://localhost:8082/gestion-de-pagos/pagos/pagos-realizados")
            .then((response) => {
                setPagos(response.data);
            })
            .catch((error) => {
                console.error("Hubo un error al obtener los pagos:", error);
            });
    }, []);

    // Función para determinar el color según el estado del pago
    const getStatusColor = (status) => {
        switch (status) {
            case "Pagado":
                return "bg-green-100 text-green-800";
            case "Pendiente":
                return "bg-yellow-100 text-yellow-800";
            case "Cancelado":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    // Función para formatear la fecha
    const formatDate = (date) => {
        const newDate = new Date(date);
        return newDate.toLocaleDateString("es-AR", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    // Función para ver el comprobante en el frontend
    const verComprobante = (numeroPago) => {
        const pdfBase64 = localStorage.getItem(`recibo_${numeroPago}`);
        if (pdfBase64) {
            const newWindow = window.open();
            newWindow.document.write(`
                <iframe src="${pdfBase64}" width="100%" height="100%" style="border: none;"></iframe>
            `);
        } else {
            alert("No se encontró el comprobante para esta factura.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 mt-16">
            <div className="max-w-7xl mx-auto">
            <header className="bg-white shadow-md rounded-lg mb-6">
          <div className="flex items-center justify-between px-4 py-3">
            <h1 className="text-2xl font-bold text-indigo-700">Pagos</h1>
            <div className="flex items-center space-x-4">
              <Link
                to="/registrarPago"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
              >
                Realizar Pago
              </Link>
            </div>
          </div>
        </header>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="border-b border-gray-200 p-6">
                    <h1 className="text-2xl font-bold text-gray-900 text-center">
                        Pagos
                    </h1>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CUIT</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acción</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {pagos.map((pago, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(pago.fecha_pago)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{pago.descripcion || "Sin descripción"}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${pago.total || "0.00"}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(pago.estadoPago)}`}>
                                            {pago.estadoPago}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{pago.factura?.cliente?.nombreCliente}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{pago.factura?.cliente?.cuitCliente}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => verComprobante(pago.numeroPago)}
                                            className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline border-none rounded-none"
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
        </div>
    );
}
