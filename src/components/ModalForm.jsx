
import React, { useState } from "react";

const ModalForm = ({ isOpen, onClose, section }) => {
  const [formData, setFormData] = useState({
    nombre_membresia: "",
    precio_membresia: "",
    nombre_promocion: "",
    descuento: "",
    informacion: "",
    nombre_sucursal: "",
    direccion_sucursal: "",
    correo_electronico: "",
    telefono: "",
    redes_sociales: "",
  });

  if (!isOpen) return null;

  // Actualiza los campos del formulario dinámicamente
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [id]: value }));
  };

  // Función genérica para manejar el envío
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log("Enviando datos al backend");

    let endpoint = "";
    let data = {};

    // Define el endpoint y los datos según la sección
    switch (section) {
      case "precios":
        endpoint = "http://localhost:3001/api/precios";
        data = {
          nombre_membresia: formData.nombre_membresia,
          precio_membresia: formData.precio_membresia,
        };
        break;
      case "promociones":
        endpoint = "http://localhost:3001/api/promociones";
        data = {
          nombre_promocion: formData.nombre_promocion,
          descuento: formData.descuento,
        };
        break;
      case "informacion-general":
        endpoint = "http://localhost:3001/api/informacion_general";
        data = { informacion: formData.informacion };
        break;
      case "sucursales":
        endpoint = "http://localhost:3001/api/sucursales";
        data = {
          nombre_sucursal: formData.nombre_sucursal,
          direccion_sucursal: formData.direccion_sucursal,
        };
        break;
      case "contacto":
        endpoint = "http://localhost:3001/api/contacto";
        data = {
          correo_electronico: formData.correo_electronico,
          telefono: formData.telefono,
          redes_sociales: formData.redes_sociales,
        };
        break;
      default:
        console.error("Sección desconocida:", section);
        return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error al guardar los datos en la base de datos.");
      }

      await response.json();
      alert("Datos guardados correctamente.");
      setFormData({}); // Limpia los campos del formulario
    } catch (error) {
      console.error("Error al guardar los datos:", error);
    }

    onClose();
  };

  return (
    <div className="modal">
      <div className="modal_content">
        <h2>Formulario</h2>

        {/* Renderizado dinámico de los campos según la sección */}
        <form onSubmit={handleOnSubmit}>
          {section === "precios" && (
            <>
              <label>
                Nombre de Membresía:
                <input
                  id="nombre_membresia"
                  type="text"
                  value={formData.nombre_membresia}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Precio de Membresía:
                <input
                  id="precio_membresia"
                  type="number"
                  value={formData.precio_membresia}
                  onChange={handleChange}
                  required
                />
              </label>
            </>
          )}

          {section === "promociones" && (
            <>
              <label>
                Título de Promoción:
                <input
                  id="nombre_promocion"
                  type="text"
                  value={formData.nombre_promocion}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Descuento:
                <input
                  id="descuento"
                  type="number"
                  value={formData.descuento}
                  onChange={handleChange}
                  required
                />
              </label>
            </>
          )}

          {section === "informacion-general" && (
            <>
              <label>
                Información general:
                <textarea
                  id="informacion"
                  value={formData.informacion}
                  onChange={handleChange}
                  required
                ></textarea>
              </label>
            </>
          )}

          {section === "sucursales" && (
            <>
              <label>
                Nombre de Sucursal:
                <input
                  id="nombre_sucursal"
                  type="text"
                  value={formData.nombre_sucursal}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Dirección de Sucursal:
                <input
                  id="direccion_sucursal"
                  type="text"
                  value={formData.direccion_sucursal}
                  onChange={handleChange}
                  required
                />
              </label>
            </>
          )}

          {section === "contacto" && (
            <>
              <label>
                Correo Electrónico:
                <input
                  id="correo_electronico"
                  type="email"
                  value={formData.correo_electronico}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Teléfono:
                <input
                  id="telefono"
                  type="tel"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Redes Sociales:
                <input
                  id="redes_sociales"
                  type="text"
                  value={formData.redes_sociales}
                  onChange={handleChange}
                  required
                />
              </label>
            </>
          )}

          <button type="submit">Guardar</button>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;
