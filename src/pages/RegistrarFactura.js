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
        cuitEntidad: "",
        deuda: ""
    });
    const [clientes, setClientes] = useState([]);

    // Obtener el cuitEntidad de la cookie
    useEffect(() => {
        const cuitEntidad = obtenerCookie("cuitEntidad");
        setFactura(prevState => ({
            ...prevState,
            cuitEntidad: cuitEntidad
        }));
    }, []);

    // Obtener la lista de clientes
    useEffect(() => {
        const obtenerClientes = async () => {
            try {
                const response = await axios.get("http://localhost:8082/gestion-de-pagos/clientes");
                setClientes(response.data); // Almacena los clientes en el estado
            } catch (error) {
                console.error("Error al obtener los clientes:", error);
            }
        };

        obtenerClientes(); // Invoca la función para obtener los clientes
    }, []);

    const onInputChange = (e) => {
        setFactura({ ...factura, [e.target.name]: e.target.value });
    };

    const onSelectChange = (e) => {
        setFactura({ ...factura, cuitCliente: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const facturaData = {
                monto_factura: factura.monto_factura,
                deuda: factura.monto_factura,
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
                        value={factura.monto_factura}
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
                        value={factura.fecha_factura}
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
                        value={factura.numeroFactura}
                        onChange={onInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="selectCuit" className="block text-sm font-medium text-gray-700 mb-2">
                        Seleccionar CUIT del Cliente:
                    </label>
                    <select
                        id="selectCuit"
                        name="cuitCliente"
                        value={factura.cuitCliente}
                        onChange={onSelectChange}
                        className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    >
                        <option value="">Seleccione un CUIT</option>
                        {clientes.map((cliente, index) => (
                            <option key={index} value={cliente.cuitCliente}>
                                {cliente.cuitCliente}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='text-center mt-6'>
                    <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded-md text-sm mr-3">Registrar</button>
                    <a href='/home' className='bg-red-500 text-white px-6 py-2 rounded-md text-sm mr-3'>Regresar</a>
                </div>
            </form>
        </div>
    );
}
