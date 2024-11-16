import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Pagos() {
  const navigate = useNavigate();

  const [formasPago, setFormasPago] = useState([{ tipo: "", monto: "", num_pago: "" }]);
  const [datosClientes, setDatosClientes] = useState({
    nombre_cliente: "",
    cuit_cliente: "",
    direccion_cliente: "",
    correo_electronico_cliente: "",
    telefono: "",
    numFactura: "",
    monto_factura: "",
    fecha_recibo: "",
  });
  const [descripcion, setDescripcion] = useState("");
  const [total, setTotal] = useState(0);
  const [estadoPago, setEstadoPago] = useState("");

  // Función para obtener los datos del cliente por CUIT
  const buscarClientePorCuit = async (cuit) => {
    try {
      const response = await axios.get(`http://localhost:8082/gestion-de-pagos/cliente/cuit/${cuit}`);
      if (response.data) {
        const cliente = response.data; // Ajusta según la estructura de respuesta
        setDatosClientes((prev) => ({
          ...prev,
          nombre_cliente: cliente.nombre_cliente,
          cuit_cliente: cliente.cuit_cliente,
          direccion_cliente: cliente.direccion_cliente,
          correo_electronico_cliente: cliente.correo_electronico_cliente,
          telefono: cliente.telefono,
          numFactura: cliente.numFactura || "",
          monto_factura: cliente.monto_factura || "",
        }));
      }
    } catch (error) {
      console.error("Error al buscar cliente:", error);
      alert("No se encontraron datos para este cliente.");
    }
  };

  // Función para manejar los cambios en los campos de datos del cliente
  const handleDatosClientesChange = (event) => {
    const { name, value } = event.target;

    setDatosClientes((prev) => ({ ...prev, [name]: value }));

    // Si se ingresa el CUIT del cliente, buscar los datos
    if (name === "cuit_cliente") {
      buscarClientePorCuit(value);
    }
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

  const onSubmit = async (e) => {
    e.preventDefault();
    const urlBase = "http://localhost:8082/gestion-de-pagos/pagos/realizar-pago";

    const pagoData = {
      numeroPago: datosClientes.numFactura,
      descripcion: descripcion,
      estado_pago: estadoPago,
      total: total,
      factura: {
        id_factura: datosClientes.numFactura,
      },
      formas_de_pago: formasPago.map((fp) => ({
        metodo: fp.tipo,
        monto: fp.monto,
        nro_operacion: fp.num_pago,
      })),
    };

    try {
      await axios.post(urlBase, pagoData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error al realizar el pago:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 mt-16">
      <form onSubmit={onSubmit} className="max-w-4xl mx-auto space-y-8 p-6 bg-white shadow-lg rounded-xl">
        <div className="border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Datos del Cliente</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Nombre del Cliente"
              id="nombre_cliente"
              name="nombre_cliente"
              value={datosClientes.nombre_cliente}
              onChange={handleDatosClientesChange}
              disabled
            />
            <InputField
              label="CUIT"
              id="cuit_cliente"
              name="cuit_cliente"
              value={datosClientes.cuit_cliente}
              onChange={handleDatosClientesChange}
            />
            <InputField
              label="Dirección"
              id="direccion_cliente"
              name="direccion_cliente"
              value={datosClientes.direccion_cliente}
              onChange={handleDatosClientesChange}
              disabled
            />
            <InputField
              label="Correo Electrónico"
              id="correo_electronico_cliente"
              name="correo_electronico_cliente"
              type="email"
              value={datosClientes.correo_electronico_cliente}
              onChange={handleDatosClientesChange}
              disabled
            />
            <InputField
              label="Teléfono"
              id="telefono"
              name="telefono"
              type="tel"
              value={datosClientes.telefono}
              onChange={handleDatosClientesChange}
              disabled
            />
            <InputField
              label="N° Factura"
              id="numFactura"
              name="numFactura"
              value={datosClientes.numFactura}
              onChange={handleDatosClientesChange}
              disabled
            />
            <InputField
              label="Monto de la factura"
              id="monto_factura"
              name="monto_factura"
              value={datosClientes.monto_factura}
              onChange={handleDatosClientesChange}
              disabled
            />
            <InputField
              label="Fecha"
              type="date"
              id="fecha_recibo"
              name="fecha_recibo"
              value={datosClientes.fecha_recibo}
              onChange={handleDatosClientesChange}
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
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
          >
            Agregar Forma de Pago
          </button>
        </div>

        <div className="border-b border-gray-200 pb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Resumen del Pago</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Descripción"
              id="descripcion"
              name="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
            <div>
              <p className="text-xl font-semibold">Total: ${total}</p>
              <button
                type="submit"
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Realizar Pago
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

// Componente de input genérico
function InputField({ label, ...props }) {
  return (
    <div className="flex flex-col">
      <label className="text-lg font-medium text-gray-700">{label}</label>
      <input
        className="mt-1 p-2 border rounded-md"
        {...props}
      />
    </div>
  );
}

// Componente de select genérico
function SelectField({ label, options, ...props }) {
  return (
    <div className="flex flex-col">
      <label className="text-lg font-medium text-gray-700">{label}</label>
      <select className="mt-1 p-2 border rounded-md" {...props}>
        {options.map((option, idx) => (
          <option key={idx} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
