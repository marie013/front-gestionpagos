import { useState } from "react";
import React from 'react';
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function Pagos() {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    generarReciboPDF();
  };

  const generarReciboPDF = () => {
    const doc = new jsPDF();
    
    // Configuración inicial
    doc.setFont("helvetica", "bold");
    
    // Agregar logo o encabezado
    doc.setFontSize(20);
    doc.text("Distribuidora Carlos SA", 105, 20, { align: "center" });
    
    // Información de la empresa
    doc.setFontSize(10);
    doc.text("CUIT: 26-17142180-0", 105, 30, { align: "center" });
    doc.text("Calle Retama Mc-c3, Villa Tulumaya", 105, 35, { align: "center" });
    doc.text("Lavalle, Mendoza", 105, 40, { align: "center" });
    
    // Línea divisoria
    doc.setLineWidth(0.5);
    doc.line(20, 45, 190, 45);
    
    // Título del recibo
    doc.setFontSize(16);
    doc.text("RECIBO DE PAGO", 105, 55, { align: "center" });
    
    // Número de recibo y fecha
    doc.setFontSize(10);
    doc.text(`N° de Recibo: ${datosClientes.numFactura}`, 20, 65);
    doc.text(`Fecha: ${datosClientes.fecha_recibo}`, 150, 65);
    
    // Marco decorativo
    doc.rect(15, 15, 180, 55);
    
    // Información del cliente en formato de tabla
    doc.setFontSize(11);
    doc.text("Datos del Cliente", 20, 80);
    
    const clienteData = [
      [
        { content: "Cliente:", styles: { fontStyle: 'bold' } },
        datosClientes.nombre_cliente,
        { content: "CUIT:", styles: { fontStyle: 'bold' } },
        datosClientes.cuit_cliente
      ],
      [
        { content: "Dirección:", styles: { fontStyle: 'bold' } },
        datosClientes.direccion_cliente,
        { content: "Teléfono:", styles: { fontStyle: 'bold' } },
        datosClientes.telefono
      ],
      [
        { content: "Email:", styles: { fontStyle: 'bold' } },
        datosClientes.correo_electronico_cliente,
        { content: "Factura N°:", styles: { fontStyle: 'bold' } },
        datosClientes.numFactura
      ]
    ];
    
    doc.autoTable({
      startY: 85,
      head: [],
      body: clienteData,
      theme: 'plain',
      styles: {
        fontSize: 10,
        cellPadding: 5
      },
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 60 },
        2: { cellWidth: 30 },
        3: { cellWidth: 60 }
      }
    });
    
    // Tabla de formas de pago
    doc.setFontSize(11);
    doc.text("Detalle de Pagos", 20, doc.autoTable.previous.finalY + 15);
    
    const formasPagoData = formasPago.map((pago) => [
      pago.tipo,
      `$ ${Number(pago.monto).toLocaleString('es-AR')}`,
      pago.num_pago
    ]);
    
    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 20,
      head: [['Forma de Pago', 'Monto', 'N° de Operación']],
      body: formasPagoData,
      theme: 'striped',
      headStyles: {
        fillColor: [71, 85, 105],
        textColor: 255,
        fontSize: 10
      },
      styles: {
        fontSize: 9,
        cellPadding: 5
      },
      columnStyles: {
        0: { cellWidth: 60 },
        1: { cellWidth: 60 },
        2: { cellWidth: 60 }
      }
    });
    
    // Descripción
    if (descripcion) {
      doc.setFontSize(10);
      doc.text("Descripción:", 20, doc.autoTable.previous.finalY + 15);
      doc.setFont("helvetica", "normal");
      doc.text(descripcion, 20, doc.autoTable.previous.finalY + 22);
    }
    
    // Total y estado
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(`Total: $ ${Number(total).toLocaleString('es-AR')}`, 150, doc.autoTable.previous.finalY + 30, { align: "right" });
    doc.setFontSize(10);
    doc.text(`Estado: ${estadoPago}`, 150, doc.autoTable.previous.finalY + 37, { align: "right" });
    
    // Línea de firma
    const firmaY = doc.autoTable.previous.finalY + 60;
    doc.line(20, firmaY, 80, firmaY);
    doc.setFontSize(9);
    doc.text("Firma y Aclaración", 50, firmaY + 5, { align: "center" });
    
    // Pie de página
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("Documento generado electrónicamente", 105, 280, { align: "center" });
    
    // Descargar PDF
    doc.save(`recibo_${datosClientes.numFactura}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 mt-16">
      <div className="max-w-4xl mx-auto space-y-8 p-6 bg-white shadow-lg rounded-xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Distribuidora Carlos SA</h1>
          <p className="text-gray-600">CUIT: 26-17142180-0</p>
          <p className="text-gray-600">Calle Retama Mc-c3, Villa Tulumaya, Lavalle, Mendoza</p>
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-4">Generar Recibo de Pago</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Información del Cliente */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Nombre del Cliente"
              value={datosClientes.nombre_cliente}
              onChange={(e) => setDatosClientes({ ...datosClientes, nombre_cliente: e.target.value })}
              className="p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="CUIT"
              value={datosClientes.cuit_cliente}
              onChange={(e) => setDatosClientes({ ...datosClientes, cuit_cliente: e.target.value })}
              className="p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Dirección"
              value={datosClientes.direccion_cliente}
              onChange={(e) => setDatosClientes({ ...datosClientes, direccion_cliente: e.target.value })}
              className="p-2 border rounded"
              required
            />
            <input
              type="email"
              placeholder="Correo Electrónico"
              value={datosClientes.correo_electronico_cliente}
              onChange={(e) => setDatosClientes({ ...datosClientes, correo_electronico_cliente: e.target.value })}
              className="p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Teléfono"
              value={datosClientes.telefono}
              onChange={(e) => setDatosClientes({ ...datosClientes, telefono: e.target.value })}
              className="p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="N° Factura"
              value={datosClientes.numFactura}
              onChange={(e) => setDatosClientes({ ...datosClientes, numFactura: e.target.value })}
              className="p-2 border rounded"
              required
            />
            <input
              type="number"
              placeholder="Monto de la factura"
              value={datosClientes.monto_factura}
              onChange={(e) => setDatosClientes({ ...datosClientes, monto_factura: e.target.value })}
              className="p-2 border rounded"
              required
            />
            <input
              type="date"
              value={datosClientes.fecha_recibo}
              onChange={(e) => setDatosClientes({ ...datosClientes, fecha_recibo: e.target.value })}
              className="p-2 border rounded"
              required
            />
          </div>

          {/* Formas de Pago */}
          <h3 className="text-lg font-semibold mb-2">Formas de Pago</h3>
          {formasPago.map((pago, index) => (
            <div key={index} className="flex space-x-4 mb-2">
              <input
                type="text"
                placeholder="Tipo de Pago"
                value={pago.tipo}
                onChange={(e) => {
                  const newFormasPago = [...formasPago];
                  newFormasPago[index].tipo = e.target.value;
                  setFormasPago(newFormasPago);
                }}
                className="p-2 border rounded flex-1"
                required
              />
              <input
                type="number"
                placeholder="Monto"
                value={pago.monto}
                onChange={(e) => {
                  const newFormasPago = [...formasPago];
                  newFormasPago[index].monto = e.target.value;
                  setFormasPago(newFormasPago);
                }}
                className="p-2 border rounded flex-1"
                required
              />
              <input
                type="text"
                placeholder="N° de Operación"
                value={pago.num_pago}
                onChange={(e) => {
                  const newFormasPago = [...formasPago];
                  newFormasPago[index].num_pago = e.target.value;
                  setFormasPago(newFormasPago);
                }}
                className="p-2 border rounded flex-1"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => setFormasPago([...formasPago, { tipo: "", monto: "", num_pago: "" }])}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
          >
            Agregar Forma de Pago
          </button>

          {/* Descripción, Total y Estado del Pago */}
          <textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="p-2 border rounded w-full mt-4"
            rows="4"
          ></textarea>

          <input
            type="number"
            placeholder="Total"
            value={total}
            onChange={(e) => setTotal(Number(e.target.value))}
            className="p-2 border rounded w-full mt-4"
            required
          />
          <select
            value={estadoPago}
            onChange={(e) => setEstadoPago(e.target.value)}
            className="p-2 border rounded w-full mt-4"
            required
          >
            <option value="">Seleccionar Estado de Pago</option>
            <option value="Pagado">Pagado</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Cancelado">Cancelado</option>
          </select>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-green-600 transition-colors"
            >
              Generar Recibo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}