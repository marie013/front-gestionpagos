'use client'

import axios from 'axios'
import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditarCliente() {
  const urlBase = "http://localhost:8082/gestion-de-pagos/clientes"
  const navigate = useNavigate()
  const { id } = useParams()

  const [cliente, setCliente] = useState({
    nombreCliente: "",
    rubro: "",
    cuit_cliente: "",
    direccion_cliente: "",
    telefono_cliente: "",
    razon_social_cliente: "",
    correo_electronico_cliente: ""
  })

  const {
    nombreCliente,
    rubro,
    cuit_cliente,
    direccion_cliente,
    telefono_cliente,
    razon_social_cliente,
    correo_electronico_cliente
  } = cliente

  const cargarCliente = useCallback(async () => {
    try {
      const resultado = await axios.get(`${urlBase}/${id}`)
      console.log("Datos del cliente:", resultado.data)
      setCliente(resultado.data)
    } catch (error) {
      console.error("Error al cargar el cliente:", error)
    }
  }, [id, urlBase])

  useEffect(() => {
    if (id) {
      cargarCliente()
    }
  }, [cargarCliente, id])

  const onInputChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`${urlBase}/${id}`, cliente)
      navigate('/clientes')
    } catch (error) {
      console.error("Error al actualizar el cliente:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Editar Información del Cliente</h1>
        <p className="text-lg text-gray-600 mb-6">Actualice los datos del cliente en el siguiente formulario.</p>
        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="nombreCliente" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              id="nombreCliente"
              name="nombreCliente"
              required
              value={nombreCliente}
              onChange={onInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="rubro" className="block text-sm font-medium text-gray-700">Rubro</label>
            <input
              type="text"
              id="rubro"
              name="rubro"
              value={rubro}
              onChange={onInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="cuit_cliente" className="block text-sm font-medium text-gray-700">CUIT</label>
            <input
              type="text"
              id="cuit_cliente"
              name="cuit_cliente"
              value={cuit_cliente}
              onChange={onInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="direccion_cliente" className="block text-sm font-medium text-gray-700">Dirección</label>
            <input
              type="text"
              id="direccion_cliente"
              name="direccion_cliente"
              value={direccion_cliente}
              onChange={onInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="telefono_cliente" className="block text-sm font-medium text-gray-700">Teléfono</label>
            <input
              type="text"
              id="telefono_cliente"
              name="telefono_cliente"
              value={telefono_cliente}
              onChange={onInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="razon_social_cliente" className="block text-sm font-medium text-gray-700">Razón Social</label>
            <input
              type="text"
              id="razon_social_cliente"
              name="razon_social_cliente"
              value={razon_social_cliente}
              onChange={onInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="correo_electronico_cliente" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              id="correo_electronico_cliente"
              name="correo_electronico_cliente"
              value={correo_electronico_cliente}
              onChange={onInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="col-span-2 flex justify-between mt-8">
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Guardar Cambios
            </button>
            <button
              type="button"
              onClick={() => navigate('/clientes')}
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
