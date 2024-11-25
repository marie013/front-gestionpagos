import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function Pagos() {
  const navigate = useNavigate();
  const [fecha_pago, setFechaPago] = useState(""); // Add this line

  const [formas_de_pago, setformas_de_pago] = useState([
    { tipo: "", monto: "", num_pago: "" },
  ]);
  const [datosFactura, setDatosFactura] = useState({
    numFactura: "",
    monto_factura: "",
    fecha_factura: "",
    cliente: {
      nombreCliente: "",
      cuitCliente: "",
      direccion_cliente: "",
      telefono_cliente: "",
      correo_electronico_cliente: "",
      id_cliente: "",
    },
  });
  const [descripcion, setDescripcion] = useState("");
  const [total, setTotal] = useState(0);
  const [estadoPago, setEstadoPago] = useState("");
  const [loading, setLoading] = useState(false);

  const buscarFacturaPorNumero = async (numeroFactura) => {
    if (!numeroFactura) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8082/gestion-de-pagos/factura/numero/${numeroFactura}`
      );
      if (response.data) {
        const factura = response.data;
        setDatosFactura({
          numFactura: factura.numeroFactura,
          monto_factura: factura.monto_factura,
          fecha_factura: factura.fecha_factura,
          cliente: {
            nombreCliente: factura.cliente.nombreCliente,
            cuitCliente: factura.cliente.cuitCliente,
            direccion_cliente: factura.cliente.direccion_cliente,
            telefono_cliente: factura.cliente.telefono_cliente,
            correo_electronico_cliente:
              factura.cliente.correo_electronico_cliente,
            id_cliente: factura.cliente.id_cliente,
          },
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
          cuitCliente: "",
          direccion_cliente: "",
          telefono_cliente: "",
          correo_electronico_cliente: "",
          id_cliente: "",
        },
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
    nuevasformas_de_pago[index][name] =
      name === "monto" ? parseFloat(value) || "" : value;
    setformas_de_pago(nuevasformas_de_pago);
  };

  const agregarFormaPago = () => {
    setformas_de_pago([
      ...formas_de_pago,
      { tipo: "", monto: "", num_pago: "" },
    ]);
  };

  const eliminarFormaPago = (index) => {
    const nuevasformas_de_pago = formas_de_pago.filter((_, i) => i !== index);
    setformas_de_pago(nuevasformas_de_pago);
  };

  useEffect(() => {
    const nuevoTotal = formas_de_pago.reduce(
      (sum, { monto }) => sum + (parseFloat(monto) || 0),
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
      alert("El total debe ser mayor a 0");
      return false;
    }

    const formasPagoIncompletas = formas_de_pago.some(
      (fp) => !fp.tipo || !fp.monto || !fp.num_pago
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
      fecha_pago: new Date(fecha_pago).toISOString().split("T")[0], // Formato ISO: YYYY-MM-DD
      descripcion: descripcion,
      estadoPago: estadoPago,
      total: total,
      factura: {
        id_factura: datosFactura.numFactura,
        monto_factura: datosFactura.monto_factura,
        fecha_factura: datosFactura.fecha_factura,
        numeroFactura: datosFactura.numFactura,
        cliente: datosFactura.cliente,
      },
      formas_de_pago: formas_de_pago.map((fp) => ({
        metodo: fp.tipo,
        monto: parseFloat(fp.monto),
        nro_operacion: fp.num_pago,
      })),
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
        navigate("/RegistrarPago");
      }
    } catch (error) {
      console.error("Error al realizar el pago:", error);
      alert(
        "Error al realizar el pago: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
    }
    generarReciboPDF(pagoData);

  };
 

  // const generarReciboPDF = () => {
  //   const doc = new jsPDF();

  //   // Configuración inicial
  //   doc.setFont("helvetica", "bold");

  //   // Agregar logo o encabezado
  //   doc.setFontSize(20);
  //   doc.text("Distribuidora Carlos SA", 105, 20, { align: "center" });

  //   // Información de la empresa
  //   doc.setFontSize(10);
  //   doc.text("CUIT: 26-17142180-0", 105, 30, { align: "center" });
  //   doc.text("Calle Retama Mc-c3, Villa Tulumaya", 105, 35, {
  //     align: "center",
  //   });
  //   doc.text("Lavalle, Mendoza", 105, 40, { align: "center" });

  //   // Línea divisoria
  //   doc.setLineWidth(0.5);
  //   doc.line(20, 45, 190, 45);

  //   // Título del recibo
  //   doc.setFontSize(16);
  //   doc.text("RECIBO DE PAGO", 105, 55, { align: "center" });

  //   // Número de recibo y fecha
  //   doc.setFontSize(10);
  //   doc.text(`N° de Recibo: ${datosFactura.numFactura}`, 20, 65);
  //   doc.text(`Fecha de Pago: ${fecha_pago}`, 20, 70);  // fecha_pago es el estado

  //   // Marco decorativo
  //   doc.rect(15, 15, 180, 55);

  //   // Información del cliente en formato de tabla
  //   doc.setFontSize(11);
  //   doc.text("Datos del Cliente", 20, 80);

  //   const clienteData = [
  //     [
  //       { content: "Cliente:", styles: { fontStyle: "bold" } },
  //       datosFactura.cliente.nombreCliente,
  //       { content: "CUIT:", styles: { fontStyle: "bold" } },
  //       datosFactura.cliente.cuitCliente,
  //     ],
  //     // [
  //     //   { content: "Dirección:", styles: { fontStyle: "bold" } },
  //     //   datosFactura.cliente.telefono_cliente,
  //     //   { content: "Teléfono:", styles: { fontStyle: "bold" } },
  //     //   datosFactura.telefono,
  //     // ],
  //     [
  //       { content: "Email:", styles: { fontStyle: "bold" } },
  //       datosFactura.cliente.correo_electronico_cliente,
  //       { content: "Factura N°:", styles: { fontStyle: "bold" } },
  //       datosFactura.numFactura,
  //     ],
  //   ];

  //   doc.autoTable({
  //     startY: 85,
  //     head: [],
  //     body: clienteData,
  //     theme: "plain",
  //     styles: {
  //       fontSize: 10,
  //       cellPadding: 5,
  //     },
  //     columnStyles: {
  //       0: { cellWidth: 30 },
  //       1: { cellWidth: 50 }, // Reducir el tamaño si es necesario
  //       2: { cellWidth: 30 },
  //       3: { cellWidth: 50 }, // Reducir el tamaño si es necesario
  //     },
  //     autoWidth: true, // Esto ajustará automáticamente el tamaño de las columnas

  //   });
    

  //   // Tabla de formas de pago
  //   doc.setFontSize(11);
  //   doc.text("Detalle de Pagos", 20, doc.autoTable.previous.finalY + 15);

  //   const formasPagoData = formas_de_pago.map((pago) => [
  //     pago.tipo,
  //     `$ ${Number(pago.monto).toLocaleString("es-AR")}`,
  //     pago.num_pago,
  //   ]);

  //   doc.autoTable({
  //     startY: doc.autoTable.previous.finalY + 20,
  //     head: [["Forma de Pago", "Monto", "N° de Operación"]],
  //     body: formasPagoData,
  //     theme: "striped",
  //     headStyles: {
  //       fillColor: [71, 85, 105],
  //       textColor: 255,
  //       fontSize: 10,
  //     },
  //     styles: {
  //       fontSize: 9,
  //       cellPadding: 5,
  //     },
  //     columnStyles: {
  //       0: { cellWidth: 60 },
  //       1: { cellWidth: 60 },
  //       2: { cellWidth: 60 },
  //     },
  //   });

  //   // Descripción
  //   if (descripcion) {
  //     doc.setFontSize(10);
  //     doc.text("Descripción:", 20, doc.autoTable.previous.finalY + 15);
  //     doc.setFont("helvetica", "normal");
  //     doc.text(descripcion, 20, doc.autoTable.previous.finalY + 22);
  //   }

  //   // Total y estado
  //   doc.setFont("helvetica", "bold");
  //   doc.setFontSize(12);
  //   doc.text(
  //     `Total: $ ${Number(total).toLocaleString("es-AR")}`,
  //     150,
  //     doc.autoTable.previous.finalY + 30,
  //     { align: "right" }
  //   );
  //   doc.setFontSize(10);
  //   doc.text(`Estado: ${estadoPago}`, 150, doc.autoTable.previous.finalY + 37, {
  //     align: "right",
  //   });

  //   // Línea de firma
  //   const firmaY = doc.autoTable.previous.finalY + 60;
  //   doc.line(20, firmaY, 80, firmaY);
  //   doc.setFontSize(9);
  //   doc.text("Firma y Aclaración", 50, firmaY + 5, { align: "center" });

  //   // Pie de página
  //   doc.setFontSize(8);
  //   doc.setFont("helvetica", "normal");
  //   doc.text("Documento generado electrónicamente", 105, 280, {
  //     align: "center",
  //   });

  //   // Descargar PDF
  //   doc.save(`recibo_${datosFactura.numFactura}.pdf`);
  //   const pdfBase64 = doc.output("datauristring");
  
  //   // Llamar a la función para enviar el PDF al backend
  //   enviarPDFAlBackend(pdfBase64);
  // };

  const generarReciboPDF = (pagoData) => {
    const doc = new jsPDF();

    // Encabezado del recibo
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Distribuidora Carlos SA", 105, 20, { align: "center" });
    doc.setFontSize(10);
    doc.text("CUIT: 26-17142180-0", 105, 30, { align: "center" });
    doc.text("Calle Retama Mc-c3, Villa Tulumaya", 105, 35, { align: "center" });
    doc.text("Lavalle, Mendoza", 105, 40, { align: "center" });
    doc.setLineWidth(0.5);
    doc.line(20, 45, 190, 45);

    // Título del recibo
    doc.setFontSize(16);
    doc.text("RECIBO DE PAGO", 105, 55, { align: "center" });

    // Información del recibo
    doc.setFontSize(10);
    doc.text(`N° de Recibo: ${pagoData.numeroPago || "No asignado"}`, 20, 65);
    doc.text(`Fecha de Pago: ${pagoData.fecha_pago}`, 20, 70);

    // Datos del cliente
    const clienteData = [
        [
            { content: "Cliente:", styles: { fontStyle: "bold" } },
            pagoData.factura.cliente.nombreCliente,
            { content: "CUIT:", styles: { fontStyle: "bold" } },
            pagoData.factura.cliente.cuitCliente,
        ],
        [
            { content: "Email:", styles: { fontStyle: "bold" } },
            pagoData.factura.cliente.correo_electronico_cliente,
            { content: "Factura N°:", styles: { fontStyle: "bold" } },
            pagoData.factura.numeroFactura,
        ],
    ];

    doc.autoTable({
        startY: 85,
        head: [],
        body: clienteData,
        theme: "plain",
        styles: {
            fontSize: 10,
            cellPadding: 5,
        },
    });

    // Detalle de pagos
    const formasPagoData = pagoData.formas_de_pago.map((pago) => [
        pago.metodo,
        `$ ${Number(pago.monto).toLocaleString("es-AR")}`,
        pago.nro_operacion,
    ]);

    doc.autoTable({
        startY: doc.autoTable.previous.finalY + 20,
        head: [["Forma de Pago", "Monto", "N° de Operación"]],
        body: formasPagoData,
        theme: "striped",
    });

    // Total
    doc.text("Total a Pagar: ", 20, doc.autoTable.previous.finalY + 10);
    doc.text(
        "$ " + pagoData.total.toLocaleString("es-AR"),
        80,
        doc.autoTable.previous.finalY + 10
    );
   
    const firmaY = doc.autoTable.previous.finalY + 60;
    doc.line(20, firmaY, 80, firmaY);
    doc.setFontSize(9);
    doc.text("Firma y Aclaración", 50, firmaY + 5, { align: "center" });

    // Pie de página
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("Documento generado electrónicamente", 105, 280, {
      align: "center",
    });

    // Generar el PDF como base64 y guardar en localStorage
    const pdfBase64 = doc.output("datauristring");
    const clave = `recibo_${pagoData.numeroPago}`; // Usamos el número de recibo como clave
    localStorage.setItem(clave, pdfBase64);

    alert(`Recibo para la factura N° ${pagoData.numeroPago} guardado en localStorage.`);
};

  
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 mt-16">
      <div className="text-center mb-6">
        <form
          onSubmit={onSubmit}
          className="max-w-4xl mx-auto space-y-8 p-6 bg-white shadow-lg rounded-xl"
        >
          <div className="border-b border-gray-200 pb-6">
            {/* <h1 className="text-3xl font-bold text-gray-900 mb-6">Datos de la Factura</h1> */}
            <h1 className="text-3xl font-bold text-gray-800">
              Distribuidora Carlos SA
            </h1>
            <p className="text-gray-600">CUIT: 26-17142180-0</p>
            <p className="text-gray-600">
              Calle Retama Mc-c3, Villa Tulumaya, Lavalle, Mendoza
            </p>

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
                label="Total de la factura"
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
                id="cuitCliente"
                name="cuitCliente"
                value={datosFactura.cliente.cuitCliente}
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
            <InputField
              label="Fecha del pago"
              id="fecha_pago"
              name="fecha_pago"
              type="date"
              value={fecha_pago} // Bind value to the state
              onChange={(e) => setFechaPago(e.target.value)} // Update the state on change
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6"></div>

          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Formas de Pago
            </h2>
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
                <div className="text-right mt-2">
                  <button
                    type="button"
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => eliminarFormaPago(index)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              onClick={agregarFormaPago}
            >
              Agregar Forma de Pago
            </button>
          </div>

          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Estado del Pago
            </h2>
            <SelectField
              label="Estado del Pago"
              id="estadoPago"
              name="estadoPago"
              value={estadoPago}
              onChange={(e) => setEstadoPago(e.target.value)}
              options={[
                { value: "", label: "Seleccionar" },
                { value: "Pendiente", label: "Pendiente" },
                { value: "Cancelado", label: "Cancelado" },
              ]}
              required
            />
          </div>

          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Descripción
            </h2>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows="4"
              placeholder="Descripción opcional del pago"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            ></textarea>
          </div>

          <div className="flex justify-between items-center">
            <div className="font-bold text-xl text-gray-800">
              Total: ${total.toFixed(2)}
            </div>
            <button
              type="button"
              onClick={() => navigate('/home')}
              className="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Cargando..." : "Realizar Pago"}
            </button>
            
          </div>
        </form>
      </div>
    </div>
  );
}

function InputField({ label, ...props }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={props.id} className="text-gray-700">
        {label}
      </label>
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
      <label htmlFor={props.id} className="text-gray-700">
        {label}
      </label>
      <select className="p-2 border border-gray-300 rounded-md mt-1" {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
