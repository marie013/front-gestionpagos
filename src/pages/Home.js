import React from 'react';

export default function Home() {
  return (
    <div className="home p-4 min-h-screen flex">
      {/* Sidebar */}


      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Administración</h1>
          <div className="flex items-center space-x-4">
          </div>
        </header>

        {/* Dashboard Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold text-gray-700">Clietes</h2>
            <p className="mt-4 text-3xl font-semibold text-blue-500">12.430</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold text-gray-700">Comprobantes Pentientes</h2>
            <p className="mt-4 text-3xl font-semibold text-blue-500">230</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold text-gray-700">Active Orders</h2>
            <p className="mt-4 text-3xl font-semibold text-blue-500">320</p>
          </div>
        </section>

        {/* Table */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Ordenes Recientes</h2>
          <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-gray-600">Order ID</th>
                <th className="py-3 px-4 text-left text-gray-600">Customer</th>
                <th className="py-3 px-4 text-left text-gray-600">Date</th>
                <th className="py-3 px-4 text-left text-gray-600">Amount</th>
                <th className="py-3 px-4 text-left text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-3 px-4">#12345</td>
                <td className="py-3 px-4">John Doe</td>
                <td className="py-3 px-4">Oct 2, 2024</td>
                <td className="py-3 px-4">$500</td>
                <td className="py-3 px-4 text-green-500">Completed</td>
              </tr>
              {/* More rows */}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
