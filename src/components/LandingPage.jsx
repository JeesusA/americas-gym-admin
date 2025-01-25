import React, { useEffect, useState } from "react";


const LandingPage = (onGoBack) => {
    const [precios, setPrecios] = useState([]);
    const [promociones, setPromociones] = useState([]);
    const [informacion, setInformacionGeneral] = useState([]);
    const [sucursales, setSucursales] = useState([]);
    const [contacto, setContacto] = useState([]);

    const fetchPrecios = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/precios');
            if (!response.ok) {
                throw new Error('Error al obtener los datos del servidor!!');
            }

            const data = await response.json();
            setPrecios(data);
        } catch (error) {
            console.log('Error al obtener los precios!!');
        }
    };

    useEffect(() => {
        fetchPrecios();
    }, []);

    const fetchPromociones = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/promociones');
            if (!response.ok) {
                throw new Error('Error al obtener los datos del servidor!!');
            }

            const data = await response.json();
            setPromociones(data);
        } catch (error) {
            console.log('Error al obtener los precios!!');
        }
    };

    useEffect(() => {
        fetchPromociones();
    }, []);

    const fetchSucursales = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/sucursales');
            if (!response.ok) {
                throw new Error('Error al obtener los datos del servidor!!');
            }

            const data = await response.json();
            setSucursales(data);
        } catch (error) {
            console.log('Error al obtener los precios!!');
        }
    };

    useEffect(() => {
        fetchSucursales();
    }, []);

    const fetchInformacion = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/informacion_general');
            if (!response.ok) {
                throw new Error('Error al obtener los datos del servidor!!');
            }

            const data = await response.json();
            setInformacionGeneral(data);
        } catch (error) {
            console.log('Error al obtener los precios!!');
        }
    };

    useEffect(() => {
        fetchInformacion();
    }, []);

    const fetchContacto = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/contacto');
            if (!response.ok) {
                throw new Error('Error al obtener los datos del servidor!!');
            }

            const data = await response.json();
            setContacto(data);
        } catch (error) {
            console.log('Error al obtener los precios!!');
        }
    };

    useEffect(() => {
        fetchContacto();
    }, []);

    return (
        <div className="gyminfo">
            <h1 className="gym-title">AMERICA'S GYM</h1>

            <h2 className="section-title">Precios</h2>
            {precios.map((p) => (
                <div key={p.id} className="price-card">
                    <h3 className="membership-name">{p.nombre_membresia}</h3>
                    <p className="membership-price">{p.precio_membresia}</p>
                </div>
            ))}

            <h2 className="section-title">Promociones</h2>
            {promociones.map((p) => (
                <div key={p.id} className="promo-card">
                    <h3 className="promo-name">{p.nombre_promocion}</h3>
                    <p className="promo-discount">{p.descuento}</p>
                </div>
            ))}

            <h2 className="section-title">Información general</h2>
            {informacion.map((p) => (
                <div key={p.id} className="info-card">
                    <h3 className="info-text">{p.informacion}</h3>
                </div>
            ))}

            <h2 className="section-title">Sucursales</h2>
            {sucursales.map((p) => (
                <div key={p.id} className="branch-card">
                    <h3 className="branch-name">{p.nombre_sucursal}</h3>
                    <p className="branch-address">{p.direccion_sucursal}</p>
                </div>
            ))}
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

}

export default LandingPage;