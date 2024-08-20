import React from 'react'
const pagos = [
  {
    id_pago: 1,
    num_pactura: 'P-001',
    fecha_pago: '2024-07-01',
    datos_proveedores: 'Proveedor A',
    detalle_pago: 'Servicios de consultoría',
    estado_pago: 'Pagado',
    precio_unitario: 100,
    subtotal: 100,
    total: 100,
  },
  {
    id_pago: 2,
    num_pactura: 'P-002',
    fecha_pago: '2024-07-15',
    datos_proveedores: 'Proveedor B',
    detalle_pago: 'Suministro de materiales',
    estado_pago: 'Vencido',
    precio_unitario: 200,
    subtotal: 200,
    total: 240,  
  },
  
];
export default function Home() {
  return (
    <div className="home p-4">
      <h2 className="text-xl font-semibold mb-4">Resumen de pagos</h2>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="px-4 py-2 border-b border-gray-300">ID Pago</th>
            <th className="px-4 py-2 border-b border-gray-300">Número de Factura</th>
            <th className="px-4 py-2 border-b border-gray-300">Fecha de Pago</th>
            <th className="px-4 py-2 border-b border-gray-300">Datos Proveedores</th>
            <th className="px-4 py-2 border-b border-gray-300">Detalles del Pago</th>
            <th className="px-4 py-2 border-b border-gray-300">Estado de Pago</th>
            <th className="px-4 py-2 border-b border-gray-300">Precio Unitario</th>
            <th className="px-4 py-2 border-b border-gray-300">Subtotal</th>
            <th className="px-4 py-2 border-b border-gray-300">Total</th>
          </tr>
        </thead>
        <tbody>
          {pagos.map((pago) => (
            <tr key={pago.id_pago}>
              <td className="px-4 py-2 border-b border-gray-300">{pago.id_pago}</td>
              <td className="px-4 py-2 border-b border-gray-300">{pago.num_pactura}</td>
              <td className="px-4 py-2 border-b border-gray-300">{pago.fecha_pago}</td>
              <td className="px-4 py-2 border-b border-gray-300">{pago.datos_proveedores}</td>
              <td className="px-4 py-2 border-b border-gray-300">{pago.detalle_pago}</td>
              <td className="px-4 py-2 border-b border-gray-300">{pago.estado_pago}</td>
              <td className="px-4 py-2 border-b border-gray-300">{pago.precio_unitario}</td>
              <td className="px-4 py-2 border-b border-gray-300">{pago.subtotal}</td>
              <td className="px-4 py-2 border-b border-gray-300">{pago.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
