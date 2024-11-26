// Comprobantes.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function Comprobantes() {
    const [pagos, setPagos] = useState([]);
    const [facturaSeleccionada, setFacturaSeleccionada] = useState(null); // Estado para la factura seleccionada
    const [mostrarModal, setMostrarModal] = useState(false); // Estado para mostrar/ocultar el modal

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

    // Obtener los detalles de una factura por su número
    const obtenerDetallesFactura = (numeroFactura) => {
        axios
            .get(`http://localhost:8082/gestion-de-pagos/factura/numero/${numeroFactura}`)
            .then((response) => {
                // console.log(response.data);
                setFacturaSeleccionada(response.data); // Guardar la factura seleccionada
                setMostrarModal(true); // Mostrar el modal
            })
            .catch((error) => {
                console.error("Error al obtener los detalles de la factura:", error);
                alert("No se pudo obtener los detalles de la factura.");
            });
    };
    // Cerrar el modal
    const cerrarModal = () => {
        setFacturaSeleccionada(null);
        setMostrarModal(false);
    };
    // Función para determinar el color según el estado del pago
    const getStatusColor = (status) => {
        switch (status) {
            case "Completo":
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
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CUIT</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Factura</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {pagos.map((pago, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(pago.fecha_pago)}</td>
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
                                                onClick={() => obtenerDetallesFactura(pago.factura?.numeroFactura)}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Ver Factura
                                            </button>
                                        </td>
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
                            <strong>Entidad:</strong> {facturaSeleccionada.entidad?.nombreEntidad}
                        </p>
                        <p>
                            <strong>Cliente:</strong> {facturaSeleccionada.cliente?.nombreCliente}
                        </p>
                        <p>
                            <strong>Detalle:</strong> {facturaSeleccionada.detalle}
                        </p>
                        <p>
                            <strong>Monto Total:</strong> ${facturaSeleccionada.monto_factura?.toFixed(2)}
                        </p>
                        <p>
                            <strong>Deuda:</strong> ${facturaSeleccionada.deuda?.toFixed(2)}
                        </p>
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={cerrarModal}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}