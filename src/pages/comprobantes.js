import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import React from 'react';

export default function UsersTable() {
  const users = [
    { name: 'Courtney Henry', title: 'Designer', email: 'courtney.henry@example.com', role: 'Admin' },
    { name: 'Tom Cook', title: 'Director of Product', email: 'tom.cook@example.com', role: 'Member' },
    { name: 'Whitney Francis', title: 'Copywriter', email: 'whitney.francis@example.com', role: 'Admin' },
    { name: 'Leonard Krasner', title: 'Senior Designer', email: 'leonard.krasner@example.com', role: 'Owner' },
    { name: 'Floyd Miles', title: 'Principal Designer', email: 'floyd.miles@example.com', role: 'Member' },
    { name: 'Emily Selman', title: 'VP, User Experience', email: 'emily.selman@example.com', role: 'Member' },
    { name: 'Kristin Watson', title: 'VP, Human Resources', email: 'kristin.watson@example.com', role: 'Admin' },
  ];

  return (
    <div className="border-b border-gray-300 p-3 text-center">
    <h1 className="text-2xl font-bold text-gray-900">
      Comprobantes
    </h1>
    
    <div className=" w-full p-5 ">
      <div className="max-h-screen">
        <table className="table w-full bg-white">
          <thead className="border-b">
            <tr>
            <th className="px-6 py-3 text-sm font-medium text-gray-900">Fecha</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-900">Cliente</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-900">Correo</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-900">Cuit</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-900">Estado</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-900"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-indigo-600 hover:text-indigo-900 cursor-pointer">Cancelado</td>
                <td className="px-6 py-4 whitespace-nowrap text-indigo-600 hover:text-indigo-900 cursor-pointer">Ver comprobate</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
    </div>
  );
}
