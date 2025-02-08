import React, { useEffect, useState } from "react";
import Discount from "./Discount";

// Componente funcional que representa la página principal de información del gimnasio
const LandingPage = (onGoBack) => {
    // Definición de estados para almacenar los datos de las diferentes secciones
    const [precios, setPrecios] = useState([]);
    const [promociones, setPromociones] = useState([]);
    const [informacion, setInformacionGeneral] = useState([]);
    const [sucursales, setSucursales] = useState([]);
    const [contacto, setContacto] = useState([]);

    // Función para obtener los datos de precios desde la API
    const fetchPrecios = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/precios');
            if (!response.ok) {
                throw new Error('Error al obtener los datos del servidor!!');
            }
            const data = await response.json(); // Convertir los datos en formato JSON
            setPrecios(data); // Guardar los datos en el estado
        } catch (error) {
            console.log('Error al obtener los precios!!');
        }
    };

    // Llamar a fetchPrecios cuando se monte el componente
    useEffect(() => {
        fetchPrecios();
    }, []);

    // Función para obtener los datos de promociones desde la API
    const fetchPromociones = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/promociones');
            if (!response.ok) {
                throw new Error('Error al obtener los datos del servidor!!');
            }
            const data = await response.json();
            setPromociones(data);
        } catch (error) {
            console.log('Error al obtener las promociones!!');
        }
    };

    // Llamar a fetchPromociones cuando se monte el componente
    useEffect(() => {
        fetchPromociones();
    }, []);

    // Función para obtener los datos de sucursales desde la API
    const fetchSucursales = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/sucursales');
            if (!response.ok) {
                throw new Error('Error al obtener los datos del servidor!!');
            }
            const data = await response.json();
            setSucursales(data);
        } catch (error) {
            console.log('Error al obtener las sucursales!!');
        }
    };

    // Llamar a fetchSucursales cuando se monte el componente
    useEffect(() => {
        fetchSucursales();
    }, []);

    // Función para obtener la información general desde la API
    const fetchInformacion = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/informacion_general');
            if (!response.ok) {
                throw new Error('Error al obtener los datos del servidor!!');
            }
            const data = await response.json();
            setInformacionGeneral(data);
        } catch (error) {
            console.log('Error al obtener la información general!!');
        }
    };

    // Llamar a fetchInformacion cuando se monte el componente
    useEffect(() => {
        fetchInformacion();
    }, []);

    // Función para obtener los datos de contacto desde la API
    const fetchContacto = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/contacto');
            if (!response.ok) {
                throw new Error('Error al obtener los datos del servidor!!');
            }
            const data = await response.json();
            setContacto(data);
        } catch (error) {
            console.log('Error al obtener la información de contacto!!');
        }
    };

    // Llamar a fetchContacto cuando se monte el componente
    useEffect(() => {
        fetchContacto();
    }, []);

    // Retornar el contenido del componente
    return (
        <div className="gyminfo">
            <Discount/>
            <h1 className="gym-title">AMERICA'S GYM</h1>

            {/* Sección de información general */}
            <h2 className="section-title">Información general</h2>
            {informacion.map((p) => (
                <div key={p.id} className="info-card">
                    <h3 className="info-text">{p.informacion}</h3>
                </div>
            ))}

            {/* Sección de precios */}
            <h2 className="section-title">Precios</h2>
            {precios.map((p) => (
                <div key={p.id} className="price-card">
                    <h3 className="membership-name">{p.nombre_membresia}</h3>
                    <p className="membership-price">${p.precio_membresia}MXN</p>
                </div>
            ))}

            {/* Sección de promociones */}
            <h2 className="section-title">Promociones</h2>
            {promociones.map((p) => (
                <div key={p.id} className="promo-card">
                    <h3 className="promo-name">{p.nombre_promocion}</h3>
                    <p className="promo-discount">Descuento de {p.descuento}%</p>
                </div>
            ))}

            {/* Sección de sucursales */}
            <h2 className="section-title">Sucursales</h2>
            {sucursales.map((p) => (
                <div key={p.id} className="branch-card">
                    <h3 className="branch-name">{p.nombre_sucursal}</h3>
                    <p className="branch-address">{p.direccion_sucursal}</p>
                </div>
            ))}

            {/* Sección de contacto */}
            <h2 className="section-title">Contacto</h2>
            {contacto.map((p) => (
                <div key={p.id} className="contact-card">
                    <h3 className="contacto-mail">{p.correo_electronico}</h3>
                    <p className="contact-tel">{p.telefono}</p>
                    <p className="contact-media">{p.redes_sociales}</p>
                </div>
            ))}
        </div>
    );
};

export default LandingPage;
