import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { obtenerCookie } from '../components/cookies'; 

export default function RegistrarFactura() {
    let navigate = useNavigate();
    const [factura, setFactura] = useState({
        monto_factura: "",
        fecha_factura: "",
        numeroFactura: "",
        cuitCliente: "",
        cuitEntidad: ""
    });
    //obtenemos el cuitEntidad de la cookie
    useEffect(() => {
        const cuitEntidad = obtenerCookie("cuitEntidad");
        console.log("cuit guardado en la cookie:", cuitEntidad);
        setFactura(prevState => ({
            ...prevState,
            cuitEntidad: cuitEntidad 
        }));
    }, []);

    const { monto_factura, fecha_factura, numeroFactura, cuitCliente, cuitEntidad } = factura;

    const onInputChange = (e) => {
        setFactura({ ...factura, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const facturaData = {
                monto_factura: factura.monto_factura,
                fecha_factura: factura.fecha_factura,
                numeroFactura: factura.numeroFactura,
                cuitCliente: factura.cuitCliente,
                cuitEntidad: factura.cuitEntidad
            };

            const urlBase = "http://localhost:8082/gestion-de-pagos/generarFactura";
            await axios.post(urlBase, facturaData);
            navigate('/facturas');
        } catch (error) {
            console.error("Error al registrar factura:", error);
        }
    };

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 mt-16'>
            <div className='text-center mb-8'>
                <h3 className='text-2xl font-semibold'>Registrar Factura</h3>
            </div>
            <form onSubmit={onSubmit} className='max-w-4xl mx-auto space-y-8 p-6 bg-white shadow-lg rounded-xl'>
                <div className="mb-4">
                    <label htmlFor="monto_factura" className="block text-sm font-medium text-gray-700">Monto</label>
                    <input
                        type="number"
                        step="any"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        id="monto_factura"
                        name="monto_factura"
                        required
                        value={monto_factura}
                        onChange={onInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="fecha_factura" className="block text-sm font-medium text-gray-700">Fecha (yyyy-mm-dd)</label>
                    <input
                        type="date"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        id="fecha_factura"
                        name="fecha_factura"
                        required
                        value={fecha_factura}
                        onChange={onInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="numeroFactura" className="block text-sm font-medium text-gray-700">Número de Factura</label>
                    <input
                        type="number"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        id="numeroFactura"
                        name="numeroFactura"
                        required
                        value={numeroFactura}
                        onChange={onInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="cuitCliente" className="block text-sm font-medium text-gray-700">Cuit del Cliente</label>
                    <input
                        type="number"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        id="cuitCliente"
                        name="cuitCliente"
                        required
                        value={cuitCliente}
                        onChange={onInputChange}
                    />
                </div>
                <div className='text-center mt-6'>
                    <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded-md text-sm mr-3">Registrar</button>
                    <a href='/home' className='bg-red-500 text-white px-6 py-2 rounded-md text-sm mr-3'>Regresar</a>
                </div>
            </form>
        </div>
    );
}
