import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

export default function RegistrarCliente() {
    let navegacion= useNavigate();
    const [cliente, setCliente]=useState({
        nombre_cliente:"",
        rubro:"",
        cuit_cliente:"",
        direccion_cliente:"",
        telefono_cliente:"",
        razon_social_cliente:"",
        correo_electronico_cliente:""
    })
    const{correo_electronico_cliente, cuit_cliente, direccion_cliente, nombre_cliente, razon_social_cliente, rubro, telefono_cliente, }= cliente
    const onInputChange= (e)=> {
        //spread operator ...
        setCliente({...cliente, [e.target.name]: e.target.value})
    }
    const onSubmit= async (e)=> {
        e.preventDefault();
        const urlBase= "http://localhost:8082/gestion-de-pagos/clientes";
        await axios.post(urlBase, cliente);
        navegacion('/proveedores'); 
    }
  return (
    <div className='container mx-auto p-4 pe-4'>
        <div className='text-center mb-8'>
            <h3 className='text-2xl font-semibold'>Registrar Cliente</h3>
        </div>
    <form onSubmit={(e)=>onSubmit(e)}>
    <div className="mb-4">
        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
        <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" id="nombre_cliente" name="nombre_cliente" required={true} value={nombre_cliente} onChange={(e)=>onInputChange(e)}/>
    </div>  
    <div className="mb-4">
        <label htmlFor="rubro" className="block text-sm font-medium text-gray-700">Rubro de la empresa</label>
        <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" id="rubro" name="rubro" required={true} value={rubro} onChange={(e)=>onInputChange(e)}/>
    </div>  
    <div className="mb-4">
        <label htmlFor="cuit_proveedor" className="block text-sm font-medium text-gray-700">CUIT</label>
        <input type="number" step="any" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" id="cuit_cliente" name="cuit_cliente" value={cuit_cliente} onChange={(e)=> onInputChange(e)} />
    </div>
    <div className="mb-4">
        <label htmlFor="direccion_proveedor" className="block text-sm font-medium text-gray-700">Direccion/Domicilio</label>
        <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" id="direccion_cliente" name="direccion_cliente" required={true} value={direccion_cliente} onChange={(e)=>onInputChange(e)}/>
    </div> 
    <div className="mb-4">
        <label htmlFor="telefono_proveedor" className="block text-sm font-medium text-gray-700">Teléfono</label>
        <input type="number" step="any" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" id="telefono_cliente" name="telefono_cliente" value={telefono_cliente} onChange={(e)=> onInputChange(e)} />
    </div>
    <div className="mb-4">
        <label htmlFor="razon_social_proveedor" className="block text-sm font-medium text-gray-700">Razón social</label>
        <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" id="razon_social_cliente" name="razon_social_cliente" required={true} value={razon_social_cliente} onChange={(e)=>onInputChange(e)}/>
    </div>
    <div className="mb-4">
        <label htmlFor="correo_electronico_proveedor" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
        <input type="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" id="correo_electronico_cliente" name="correo_electronico_cliente" required={true} value={correo_electronico_cliente} onChange={(e)=>onInputChange(e)}/>
    </div>  
    <div className='text-center mt-6'>
        <button type="submit" href='/proveedores' className="bg-blue-700 text-white px-4 py-2 rounded-md text-sm mr-3">Registrar</button>
        <a href='/proveedores' className='bg-red-500 text-white px-6 py-2 rounded-md text-sm mr-3'>Regresar</a>
    </div>
    
    </form>
    </div>
  )
}
