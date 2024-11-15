'use client'

import { useState, useEffect } from "react"
import axios from "axios"
import { PlusCircle, MinusCircle } from "lucide-react"

export default function ModernPaymentForm() {
  const [formasPago, setFormasPago] = useState([{ tipo: "", monto: "", num_pago: "", id_formaPago: null }])
  const [datosClientes, setDatosClientes] = useState({
    nombre_cliente: "",
    cuit_cliente: "",
    direccion_cliente: "",
    correo_electronico_cliente: "",
    telefono: "",
    numFactura: "",
    monto_factura: "",
    fecha_recibo: "",
    fecha_pago: "",
    numeroCliente: "",
  })
  const [descripcion, setDescripcion] = useState("")
  const [total, setTotal] = useState(0)
  const [estadoPago, setEstadoPago] = useState("Pendiente")
  const [precioUnitario, setPrecioUnitario] = useState(0)

  const handleDatosClientesChange = (event) => {
    const { name, value } = event.target
    setDatosClientes((prev) => ({ ...prev, [name]: value }))
  }

  const handleFormaPagoChange = (index, event) => {
    const { name, value } = event.target
    const nuevasFormasPago = [...formasPago]
    nuevasFormasPago[index][name] = value
    setFormasPago(nuevasFormasPago)
  }

  const agregarFormaPago = () => {
    setFormasPago([...formasPago, { tipo: "", monto: "", num_pago: "", id_formaPago: null }])
  }

  const eliminarFormaPago = (index) => {
    const nuevasFormasPago = formasPago.filter((_, i) => i !== index)
    setFormasPago(nuevasFormasPago)
  }

  useEffect(() => {
    const nuevoTotal = formasPago.reduce((sum, { monto }) => sum + parseFloat(monto || 0), 0)
    setTotal(nuevoTotal)
  }, [formasPago])

  const onSubmit = async (e) => {
    e.preventDefault()
    const urlBase = "http://localhost:8082/gestion-de-pagos/pagos/realizar-pago"

    const pagoData = {
      id_pago: null,
      numeroPago: datosClientes.numFactura,
      descripcion: descripcion,
      estado_pago: estadoPago,
      total: total,
      fecha_pago: datosClientes.fecha_pago,
      precio_unitario: precioUnitario,
      factura: {
        id_factura: datosClientes.numFactura,
        monto_factura: datosClientes.monto_factura,
        fecha_factura: datosClientes.fecha_recibo,
        numeroFactura: datosClientes.numFactura,
        cliente: null,
        nombreCliente: datosClientes.nombre_cliente,
        numeroCliente: datosClientes.numeroCliente,
        numeroEntidad: datosClientes.numeroEntidad
      },
      formas_de_pago: formasPago.map(fp => ({
        id_formaPago: fp.id_formaPago,
        metodo: fp.tipo,
        monto: parseFloat(fp.monto || 0),
        nro_operacion: fp.num_pago,
        idPago: null
      })),
      nombreCliente: datosClientes.nombre_cliente
    }

    try {
      await axios.post(urlBase, pagoData, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      alert("Pago realizado exitosamente.")
    } catch (error) {
      console.error("Error al realizar el pago:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Formulario de Pago</h1>
          <form onSubmit={onSubmit} className="space-y-8">
            {/* Datos del Cliente */}
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Datos del Cliente</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Nombre Cliente"
                  id="nombre_cliente"
                  name="nombre_cliente"
                  value={datosClientes.nombre_cliente}
                  onChange={handleDatosClientesChange}
                />
                <InputField
                  label="Número de Factura"
                  id="numFactura"
                  name="numFactura"
                  value={datosClientes.numFactura}
                  onChange={handleDatosClientesChange}
                />
                <InputField
                  label="Monto Factura"
                  type="number"
                  id="monto_factura"
                  name="monto_factura"
                  value={datosClientes.monto_factura}
                  onChange={handleDatosClientesChange}
                />
                <InputField
                  label="Fecha de Recibo"
                  type="date"
                  id="fecha_recibo"
                  name="fecha_recibo"
                  value={datosClientes.fecha_recibo}
                  onChange={handleDatosClientesChange}
                />
                <InputField
                  label="Fecha de Pago"
                  type="date"
                  id="fecha_pago"
                  name="fecha_pago"
                  value={datosClientes.fecha_pago}
                  onChange={handleDatosClientesChange}
                />
                <InputField
                  label="Número de Cliente"
                  id="numeroCliente"
                  name="numeroCliente"
                  value={datosClientes.numeroCliente}
                  onChange={handleDatosClientesChange}
                />
              </div>
            </div>

            {/* Detalles del Pago */}
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Detalles del Pago</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción
                  </label>
                  <textarea
                    id="descripcion"
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                    rows={3}
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="estado_pago" className="block text-sm font-medium text-gray-700 mb-1">
                    Estado de Pago
                  </label>
                  <select
                    id="estado_pago"
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                    value={estadoPago}
                    onChange={(e) => setEstadoPago(e.target.value)}
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="Pagado">Pagado</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Formas de Pago */}
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Formas de Pago</h2>
              {formasPago.map((forma, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <label htmlFor={`tipo-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Tipo
                    </label>
                    <select
                      id={`tipo-${index}`}
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                      value={forma.tipo}
                      onChange={(e) => handleFormaPagoChange(index, { target: { name: "tipo", value: e.target.value } })}
                    >
                      <option value="">Seleccione el tipo</option>
                      <option value="Efectivo">Efectivo</option>
                      <option value="Tarjeta">Tarjeta</option>
                      <option value="Transferencia">Transferencia</option>
                    </select>
                  </div>
                  <InputField
                    label="Monto"
                    type="number"
                    name="monto"
                    value={forma.monto}
                    onChange={(e) => handleFormaPagoChange(index, e)}
                  />
                  <InputField
                    label="Número de Operación"
                    name="num_pago"
                    value={forma.num_pago}
                    onChange={(e) => handleFormaPagoChange(index, e)}
                  />
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() => eliminarFormaPago(index)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center"
                    >
                      <MinusCircle className="w-4 h-4 mr-2" />
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={agregarFormaPago}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                Agregar Forma de Pago
              </button>
            </div>

            {/* Total */}
            <div className="flex justify-between">
              <h3 className="text-xl font-semibold text-gray-800">Total:</h3>
              <h3 className="text-xl font-semibold text-gray-800">${total.toFixed(2)}</h3>
            </div>

            {/* Botón de Envío */}
            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Realizar Pago
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

const InputField = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
      {...props}
    />
  </div>
)
