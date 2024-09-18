import axios from 'axios'
import React, { useEffect, useState } from 'react'; 
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';

export default function Proveedores() {
  const urlBase= "http://localhost:8082/gestion-de-pagos/proveedor";
  const[proveedores, setProveedor]= useState([]);
  useEffect(()=>{
    listarProveedor();
  },[]);
  const listarProveedor = async ()=>{
    const resultado = await axios.get(urlBase);
    console.log("Resultado");
    console.log(resultado.data);
    setProveedor(resultado.data);
  }
  const eliminarProveedor= async (id)=>{
    await axios.delete(`${urlBase}/${id}`);
    listarProveedor();
}
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-semibold mb-4'>Proveedores</h1>
      
      <div className='mb-3'>
        <Link className='bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-900' to="/registrar-proveedor">Registrar Proveedor</Link>
      </div>
      <div>
        <h2>Proveedores registrados</h2>
        <table className="table table-striped table-hover align-middle">
  <thead className='table-dark'>
    <tr>
      <th scope="col">id</th>
      <th scope="col">Nombre</th>
      <th scope="col">Correo</th>
      <th scope="col">CUIT</th>
      <th scope="col">Direccion</th>
      <th scope="col">Razon Social</th>
      <th scope="col">Rubro</th>
      <th scope="col">Telefono</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {
        //iteramos arreglo de empleados
        proveedores.map((proveedor, indice)=> (
        <tr key={indice}>
        <th scope="row">{proveedor.id_proveedor}</th>
        <td>{proveedor.nombre_proveedor}</td>
        <td>{proveedor.correo_electronico_proveedor}</td>
        <td><NumericFormat value={proveedor.cuit_proveedor} displayType={'text'} /> </td>
        <td>{proveedor.direccion_proveedor}</td>
        <td>{proveedor.razon_social_proveedor}</td>
        <td>{proveedor.rubro}</td>
        <td><NumericFormat value={proveedor.telefono_proveedor} displayType={'text'} /> </td>
    
        <td className='text-center'>
            <div>
                <Link to={`/editar/${proveedor.id_proveedor}`} className='btn btn-warning btn-sm me-3'>Editar</Link>
                <button on onClick={()=> eliminarProveedor(proveedor.idEmpleado)} className='btn btn-danger btn-sm'>Eliminar</button>
            </div>
        </td>
        </tr>
        ))
         
    }

  </tbody>
</table>   

      </div>
    </div>
  );
}
