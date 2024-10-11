import { useState, useEffect } from "react";
import React from 'react'

export default function Pagos() {
  const [formasPago, setFormasPago] = useState([{ tipo: "", monto: "", num_pago: "" }]);
  const [datosProveedor, setDatosProveedor] = useState({
    nombre_cliente: "",
    cuit_cliente: "",
    direccion_cliente: "",
    correo_electronico_cliente: "",
    telefono: "",
    numeroFactura: "",
  });
  const [descripcion, setDescripcion] = useState("");
  const [total, setTotal] = useState(0);
  const [estadoPago, setEstadoPago] = useState("");

  const handleDatosProveedorChange = (event) => {
    const { name, value } = event.target;
    setDatosProveedor((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormaPagoChange = (index, event) => {
    const { name, value } = event.target;
    const nuevasFormasPago = [...formasPago];
    nuevasFormasPago[index][name] = value;
    setFormasPago(nuevasFormasPago);
  };

  const agregarFormaPago = () => {
    setFormasPago([...formasPago, { tipo: "", monto: "", num_pago: "" }]);
  };

  const eliminarFormaPago = (index) => {
    const nuevasFormasPago = formasPago.filter((_, i) => i !== index);
    setFormasPago(nuevasFormasPago);
  };

  useEffect(() => {
    const nuevoTotal = formasPago.reduce(
      (sum, { monto }) => sum + parseFloat(monto || 0),
      0
    );
    setTotal(nuevoTotal);
  }, [formasPago]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 mt-16">
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
    <form className="max-w-4xl mx-auto space-y-8 p-6 bg-white shadow-lg rounded-xl">
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Datos del Cliente</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Nombre del Cliente"
            id="nombre_cliente"
            name="nombre_cliente"
            value={datosProveedor.nombre_cliente}
            onChange={handleDatosProveedorChange}
          />
          <InputField
            label="CUIT"
            id="cuit_cliente"
            name="cuit_cliente"
            value={datosProveedor.cuit_cliente}
            onChange={handleDatosProveedorChange}
          />
          <InputField
            label="Dirección"
            id="direccion_cliente"
            name="direccion_cliente"
            value={datosProveedor.direccion_cliente}
            onChange={handleDatosProveedorChange}
          />
          <InputField
            label="Correo Electrónico"
            id="correo_electronico_cliente"
            name="correo_electronico_cliente"
            type="email"
            value={datosProveedor.correo_electronico_cliente}
            onChange={handleDatosProveedorChange}
          />
          <InputField
            label="Teléfono"
            id="telefono"
            name="telefono"
            type="tel"
            value={datosProveedor.telefono}
            onChange={handleDatosProveedorChange}
          />
          <InputField
            label="N° Factura"
            id="numeroFactura"
            name="numeroFactura"
            value={datosProveedor.numeroFactura}
            onChange={handleDatosProveedorChange}
          />
        </div>
      </div>

      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Formas de Pago</h2>
        {formasPago.map((pago, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SelectField
                label="Tipo de Pago"
                id={`tipo_${index}`}
                name="tipo"
                value={pago.tipo}
                onChange={(event) => handleFormaPagoChange(index, event)}
                options={[
                  { value: "", label: "Seleccionar" },
                  { value: "Transferencia", label: "Transferencia" },
                  { value: "Efectivo", label: "Efectivo" },
                  { value: "Cheque", label: "Cheque" },
                  { value: "Tarjeta", label: "Tarjeta de débito" },
                ]}
              />
              <InputField
                label="Monto"
                id={`monto_${index}`}
                name="monto"
                type="number"
                value={pago.monto}
                onChange={(event) => handleFormaPagoChange(index, event)}
              />
              <InputField
                label="Nro de operación"
                id={`num_pago_${index}`}
                name="num_pago"
                type="number"
                value={pago.num_pago}
                onChange={(event) => handleFormaPagoChange(index, event)}
              />
            </div>
            {formasPago.length > 1 && (
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => eliminarFormaPago(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                >
                  Eliminar
                </button>
              </div>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={agregarFormaPago}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Agregar Forma de Pago
        </button>
      </div>

      <div className="pb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Estado del Pago</h2>
        <SelectField
          label="Estado del Pago"
          id="estadoPago"
          name="estadoPago"
          value={estadoPago}
          onChange={(e) => setEstadoPago(e.target.value)}
          options={[
            { value: "", label: "Seleccionar estado" },
            { value: "Pendiente", label: "Pendiente" },
            { value: "Cancelado", label: "Cancelado" },
            { value: "Parcial", label: "Parcialmente Pagado" },
            { value: "EnProceso", label: "En Proceso" },
            { value: "Rechazado", label: "Rechazado" },
          ]}
        />
      </div>

      <div className="pb-6">
        <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-2">
          Descripción
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          rows={6}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="flex justify-between items-center border-t border-gray-200 pt-6">
        <span className="text-xl font-semibold text-gray-900">Total</span>
        <span className="text-xl font-semibold text-gray-900">${total.toFixed(2)}</span>
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-green-600 transition-colors"
        >
          Guardar
        </button>
      </div>
    </form>
    </div>
    </div>
  );
}

function InputField({ label, id, name, type = "text", value, onChange }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
      />
    </div>
  );
}

function SelectField({ label, id, name, value, onChange, options }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}