import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditarCliente() {
    //REVISAR LAS RUTAS PORFAVOR
    const urlBase = "http://localhost:8082/gestion-de-pagos/clientes";
    const navigate = useNavigate();
    const { id } = useParams();

    const [cliente, setCliente] = useState({
        nombreCliente: "",
        rubro: "",
        cuit_cliente: "",
        direccion_cliente: "",
        telefono_cliente: "",
        razon_social_cliente: "",
        correo_electronico_cliente: ""
    });

    const {
        nombreCliente,
        rubro,
        cuit_cliente,
        direccion_cliente,
        telefono_cliente,
        razon_social_cliente,
        correo_electronico_cliente
    } = cliente;

    const cargarCliente = useCallback(async () => {
        try {
            const resultado = await axios.get(`${urlBase}/${id}`);
            console.log("Datos del cliente:", resultado.data); // Verifica los datos en la consola
            setCliente(resultado.data);
        } catch (error) {
            console.error("Error al cargar el cliente:", error);
        }
    }, [id, urlBase]);

    useEffect(() => {
        if (id) {
            cargarCliente();
        }
    }, [cargarCliente, id]);

    const onInputChange = (e) => {
        setCliente({ ...cliente, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${urlBase}/${id}`, cliente);
            navigate('/clientes');
        } catch (error) {
            console.error("Error al actualizar el cliente:", error);
        }
    };

    return (
        <div className='container'>
            <div className='container text-center' style={{ margin: "30px" }}>
                <h3>Editar Cliente</h3>
            </div>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="nombreCliente" className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombreCliente"
                        name="nombreCliente"
                        required
                        value={nombreCliente}
                        onChange={onInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="rubro" className="form-label">Rubro</label>
                    <input
                        type="text"
                        className="form-control"
                        id="rubro"
                        name="rubro"
                        value={rubro}
                        onChange={onInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="cuit_cliente" className="form-label">CUIT</label>
                    <input
                        type="text"
                        className="form-control"
                        id="cuit_cliente"
                        name="cuit_cliente"
                        value={cuit_cliente}
                        onChange={onInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="direccion_cliente" className="form-label">Dirección</label>
                    <input
                        type="text"
                        className="form-control"
                        id="direccion_cliente"
                        name="direccion_cliente"
                        value={direccion_cliente}
                        onChange={onInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="telefono_cliente" className="form-label">Teléfono</label>
                    <input
                        type="text"
                        className="form-control"
                        id="telefono_cliente"
                        name="telefono_cliente"
                        value={telefono_cliente}
                        onChange={onInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="razon_social_cliente" className="form-label">Razón Social</label>
                    <input
                        type="text"
                        className="form-control"
                        id="razon_social_cliente"
                        name="razon_social_cliente"
                        value={razon_social_cliente}
                        onChange={onInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="correo_electronico_cliente" className="form-label">Correo Electrónico</label>
                    <input
                        type="email"
                        className="form-control"
                        id="correo_electronico_cliente"
                        name="correo_electronico_cliente"
                        value={correo_electronico_cliente}
                        onChange={onInputChange}
                    />
                </div>
                <div className='text-center'>
                    <button type="submit" className="btn btn-warning btn-sm me-3">Guardar Cambios</button>
                    <a href='/' className='btn btn-danger btn-sm'>Regresar</a>
                </div>
            </form>
        </div>
    );
}
