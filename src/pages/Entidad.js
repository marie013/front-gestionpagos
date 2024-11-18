'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card"
import { Building2, Mail, Phone, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom';
export default function Entidad() 
{
    const Image = ({ src, alt, ...props }) => (
        <img src={src} alt={alt} {...props} />
      );
  const [entidad, setEntidad] = useState(null) 
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null) 

  useEffect(() => {
    const fetchEntidad = async () => {
      try {
        const response = await axios.get('http://localhost:8082/gestion-de-pagos/entidad') 
        const data = response.data[0] 
        setEntidad(data)
      } catch (err) {
        setError('Error al cargar los datos de la entidad.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchEntidad()
  }, [])

  if (loading) {
    return <p className="text-center text-gray-600">Cargando...</p>
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>
  }

  if (!entidad) {
    return <p className="text-center text-gray-600">No hay información disponible.</p>
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 mt-16'>
       <div className="container  mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Información de la Entidad</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 flex flex-col ">
              <p><Building2 className="inline mr-2" />{entidad.nombreEntidad}</p>
              <p>CUIT: {entidad.cuitEntidad}</p>
              <p><Mail className="inline mr-2" />{entidad.correoElectronicoEntidad}</p>
              <p><Phone className="inline mr-2" />{entidad.telefono_entidad}</p>
              <p>Razón Social: {entidad.razon_social_entidad}</p>
              <p><MapPin className="inline mr-2" />{entidad.direccion_entidad}</p>
              <Link
                to="/home"
                className="bg-indigo-600 text-white text-center px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out inline w-20"
              >
                Volver
              </Link>
            </div>
            
          </CardContent>
        </Card>
      </div>
      <div className="mt-6">
        <Image
          src="https://i0.wp.com/asisprojetos.com.br/wp-content/uploads/2022/10/setor-industrial.jpg"
          alt="Imagen ilustrativa de la empresa"
          width={800}
          height={300}
          className="w-full rounded-lg"
        />
      </div>
    </div> 
    </div>
    
  )
}
