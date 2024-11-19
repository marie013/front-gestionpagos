import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Pagos() {
  const navigate = useNavigate();

  const [formas_de_pago, setformas_de_pago] = useState([{ tipo: "", monto: "", num_pago: "" }]);
  const [datosFactura, setDatosFactura] = useState({
    numFactura: "",
    monto_factura: "",
    fecha_factura: "",
    cliente: {
      nombreCliente: "",
      cuit_cliente: "",
      direccion_cliente: "",
      telefono_cliente: "",
      correo_electronico_cliente: "",
      id_cliente: ""
    }
  });
  const [descripcion, setDescripcion] = useState("");
  const [total, setTotal] = useState(0);
  const [estadoPago, setEstadoPago] = useState("");
  const [loading, setLoading] = useState(false);

  const buscarFacturaPorNumero = async (numeroFactura) => {
    if (!numeroFactura) return;
    
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8082/gestion-de-pagos/factura/numero/${numeroFactura}`);
      if (response.data) {
        const factura = response.data;
        setDatosFactura({
          numFactura: factura.numeroFactura,
          monto_factura: factura.monto_factura,
          fecha_factura: factura.fecha_factura,
          cliente: {
            nombreCliente: factura.cliente.nombreCliente,
            cuit_cliente: factura.cliente.cuit_cliente,
            direccion_cliente: factura.cliente.direccion_cliente,
            telefono_cliente: factura.cliente.telefono_cliente,
            correo_electronico_cliente: factura.cliente.correo_electronico_cliente,
            id_cliente: factura.cliente.id_cliente
          }
        });
      }
    } catch (error) {
      console.error("Error al buscar factura:", error);
      alert("No se encontró la factura o hubo un error en la búsqueda");
      setDatosFactura({
        numFactura: numeroFactura,
        monto_factura: "",
        fecha_factura: "",
        cliente: {
          nombreCliente: "",
          cuit_cliente: "",
          direccion_cliente: "",
          telefono_cliente: "",
          correo_electronico_cliente: "",
          id_cliente: ""
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDatosFacturaChange = (event) => {
    const { name, value } = event.target;
    setDatosFactura((prev) => ({ ...prev, [name]: value }));
    if (name === "numFactura") {
      buscarFacturaPorNumero(value);
    }
  };

  const handleFormaPagoChange = (index, event) => {
    const { name, value } = event.target;
    const nuevasformas_de_pago = [...formas_de_pago];
    nuevasformas_de_pago[index][name] = value;
    setformas_de_pago(nuevasformas_de_pago);
  };

  const agregarFormaPago = () => {
    setformas_de_pago([...formas_de_pago, { tipo: "", monto: "", num_pago: "" }]);
  };

  const eliminarFormaPago = (index) => {
    const nuevasformas_de_pago = formas_de_pago.filter((_, i) => i !== index);
    setformas_de_pago(nuevasformas_de_pago);
  };

  useEffect(() => {
    const nuevoTotal = formas_de_pago.reduce(
      (sum, { monto }) => sum + parseFloat(monto || 0),
      0
    );
    setTotal(nuevoTotal);
  }, [formas_de_pago]);

  const validarFormulario = () => {
    if (!datosFactura.numFactura) {
      alert("Por favor, ingrese el número de factura");
      return false;
    }

    if (!estadoPago) {
      alert("Por favor, seleccione un estado de pago");
      return false;
    }

    if (total <= 0) {
      alert("El monto total debe ser mayor a 0");
      return false;
    }

    const formasPagoIncompletas = formas_de_pago.some(fp => 
      !fp.tipo || !fp.monto || !fp.num_pago
    );

    if (formasPagoIncompletas) {
      alert("Por favor, complete todos los campos de las formas de pago");
      return false;
    }

    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (!validarFormulario()) {
      return;
    }

    const pagoData = {
      numeroPago: datosFactura.numFactura,
      fecha_pago: new Date().toISOString().split('T')[0],
      descripcion: descripcion,
      estadoPago: estadoPago,
      total: total,
      factura: {
        id_factura: datosFactura.numFactura,
        monto_factura: datosFactura.monto_factura,
        fecha_factura: datosFactura.fecha_factura,
        numeroFactura: datosFactura.numFactura,
        cliente: datosFactura.cliente
      },
      formas_de_pago: formas_de_pago.map((fp) => ({
        metodo: fp.tipo,
        monto: parseFloat(fp.monto),
        nro_operacion: fp.num_pago
      }))
    };

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8082/gestion-de-pagos/pagos/realizar-pago",
        pagoData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        alert("Pago registrado exitosamente");
        navigate("/"); // O la ruta que desees después del pago exitoso
      }
    } catch (error) {
      console.error("Error al realizar el pago:", error);
      alert("Error al realizar el pago: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 mt-16">
      <form onSubmit={onSubmit} className="max-w-4xl mx-auto space-y-8 p-6 bg-white shadow-lg rounded-xl">
        <div className="border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Datos de la Factura</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="N° Factura"
              id="numFactura"
              name="numFactura"
              value={datosFactura.numFactura}
              onChange={handleDatosFacturaChange}
              required
            />
            <InputField
              label="Monto de la factura"
              id="monto_factura"
              name="monto_factura"
              value={datosFactura.monto_factura}
              disabled
            />
            <InputField
              label="Fecha de la factura"
              type="date"
              id="fecha_factura"
              name="fecha_factura"
              value={datosFactura.fecha_factura}
              disabled
            />
            <InputField
              label="Nombre del Cliente"
              id="nombre_cliente"
              name="nombre_cliente"
              value={datosFactura.cliente.nombreCliente}
              disabled
            />
            <InputField
              label="CUIT"
              id="cuit_cliente"
              name="cuit_cliente"
              value={datosFactura.cliente.cuit_cliente}
              disabled
            />
            <InputField
              label="Dirección"
              id="direccion_cliente"
              name="direccion_cliente"
              value={datosFactura.cliente.direccion_cliente}
              disabled
            />
            <InputField
              label="Teléfono"
              id="telefono_cliente"
              name="telefono_cliente"
              type="tel"
              value={datosFactura.cliente.telefono_cliente}
              disabled
            />
            <InputField
              label="Correo Electrónico"
              id="correo_electronico_cliente"
              name="correo_electronico_cliente"
              type="email"
              value={datosFactura.cliente.correo_electronico_cliente}
              disabled
            />
          </div>
        </div>

        <div className="border-b border-gray-200 pb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Formas de Pago</h2>
          {formas_de_pago.map((pago, index) => (
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
                  required
                />
                <InputField
                  label="Monto"
                  id={`monto_${index}`}
                  name="monto"
                  type="number"
                  step="0.01"
                  value={pago.monto}
                  onChange={(event) => handleFormaPagoChange(index, event)}
                  required
                />
                <InputField
                  label="N° Operación"
                  id={`num_pago_${index}`}
                  name="num_pago"
                  value={pago.num_pago}
                  onChange={(event) => handleFormaPagoChange(index, event)}
                  required
                />
              </div>
              <button
                type="submit"
                onClick={() => eliminarFormaPago(index)}
                className="text-red-600 mt-2 block mx-auto"
              >
                Eliminar Forma de Pago
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={agregarFormaPago}
            className="bg-blue-500 text-white rounded-full px-4 py-2 block mx-auto mt-4"
          >
            Agregar Forma de Pago
          </button>
        </div>

        <div className="border-b border-gray-200 pb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Estado de Pago</h2>
          <select
            id="estadoPago"
            name="estadoPago"
            value={estadoPago}
            onChange={(e) => setEstadoPago(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Seleccionar estado de pago</option>
            <option value="Pagado">Pagado</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Cancelado">Cancelado</option>
          </select>
        </div>

        <div className="border-b border-gray-200 pb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Descripción</h2>
          <textarea
            id="descripcion"
            name="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="font-bold text-xl text-gray-800">Total: ${total.toFixed(2)}</div>
          <button
            type="submit"
            className="bg-green-500 text-white rounded-full px-6 py-2"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Realizar Pago"}
          </button>
        </div>
      </form>
    </div>
  );
}

function InputField({ label, ...props }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={props.id} className="text-gray-700">{label}</label>
      <input
        className="p-2 border border-gray-300 rounded-md mt-1"
        {...props}
      />
    </div>
  );
}

function SelectField({ label, options, ...props }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={props.id} className="text-gray-700">{label}</label>
      <select
        className="p-2 border border-gray-300 rounded-md mt-1"
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}
