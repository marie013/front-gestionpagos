import React from "react";
import { useNavigate } from "react-router-dom";

export default function UsersTable() {
  const navigate = useNavigate();

  const users = [
    {
      name: "Courtney Henry",
      title: "Designer",
      email: "courtney.henry@example.com",
      role: "Admin",
      date: "2023-05-01",
      cuit: "20-12345678-9",
      status: "Pagado",
    },
    {
      name: "Tom Cook",
      title: "Director of Product",
      email: "tom.cook@example.com",
      role: "Member",
      date: "2023-05-02",
      cuit: "20-23456789-0",
      status: "Pendiente",
    },
    {
      name: "Whitney Francis",
      title: "Copywriter",
      email: "whitney.francis@example.com",
      role: "Admin",
      date: "2023-05-03",
      cuit: "20-34567890-1",
      status: "Cancelado",
    },
    {
      name: "Leonard Krasner",
      title: "Senior Designer",
      email: "leonard.krasner@example.com",
      role: "Owner",
      date: "2023-05-04",
      cuit: "20-45678901-2",
      status: "Pagado",
    },
    {
      name: "Floyd Miles",
      title: "Principal Designer",
      email: "floyd.miles@example.com",
      role: "Member",
      date: "2023-05-05",
      cuit: "20-56789012-3",
      status: "Pendiente",
    },
    {
      name: "Emily Selman",
      title: "VP, User Experience",
      email: "emily.selman@example.com",
      role: "Member",
      date: "2023-05-06",
      cuit: "20-67890123-4",
      status: "Pagado",
    },
    {
      name: "Kristin Watson",
      title: "VP, Human Resources",
      email: "kristin.watson@example.com",
      role: "Admin",
      date: "2023-05-07",
      cuit: "20-78901234-5",
      status: "Cancelado",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Pagado":
        return "bg-green-100 text-green-800";
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 mt-16">

    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="border-b border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 text-center">Pagos</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Fecha
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Cliente
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Correo
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Cuit
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Estado
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Acción
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {user.name}
                  </div>
                  <div className="text-sm text-gray-500">{user.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.cuit}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                      user.status
                    )}`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => navigate(`/comprobante/${user.cuit}`)}
                    className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline border-none rounded-none"
                  >
                    Ver comprobante
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    
  );
}
