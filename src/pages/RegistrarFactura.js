import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RegistrarFactura() {
    let navigate = useNavigate();
    const [factura, setFactura] = useState({
        montoFactura: "",
        fechaFactura: "",
        numeroFactura: "",
        cliente: "",
        entidad: ""
    });
    const { montoFactura, fechaFactura, numeroFactura, cliente, entidad } = factura;

    const onInputChange = (e) => {
        setFactura({ ...factura, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const urlBase = "http://localhost:8082/gestion-de-pagos/facturas";
        await axios.post(urlBase, factura);
        navigate('/facturas');
    };

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 mt-16'>
            <div className='text-center mb-8'>
                <h3 className='text-2xl font-semibold'>Registrar Factura</h3>
            </div>
            <form onSubmit={onSubmit} className='max-w-4xl mx-auto space-y-8 p-6 bg-white shadow-lg rounded-xl'>
                <div className="mb-4">
                    <label htmlFor="montoFactura" className="block text-sm font-medium text-gray-700">Monto</label>
                    <input
                        type="number"
                        step="any"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        id="montoFactura"
                        name="montoFactura"
                        required
                        value={montoFactura}
                        onChange={onInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="fechaFactura" className="block text-sm font-medium text-gray-700">Fecha (yyyy-mm-dd)</label>
                    <input
                        type="date"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        id="fechaFactura"
                        name="fechaFactura"
                        required
                        value={fechaFactura}
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
                    <label htmlFor="cliente" className="block text-sm font-medium text-gray-700">ID del Cliente</label>
                    <input
                        type="number"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        id="cliente"
                        name="cliente"
                        required
                        value={cliente}
                        onChange={onInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="entidad" className="block text-sm font-medium text-gray-700">ID de la Entidad</label>
                    <input
                        type="number"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        id="entidad"
                        name="entidad"
                        required
                        value={entidad}
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
