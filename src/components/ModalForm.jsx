// ModalForm.jsx
import React, { useState } from "react";

const ModalForm = ({ isOpen, onClose, section }) => {
  const [formData, setFormData] = useState({}); // Estado para los datos del formulario

  if (!isOpen) return null; // Si el modal no está abierto, no renderiza nada.

  // Manejar los cambios en el formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Simular guardar los datos
  const handleSave = () => {
    console.log("Datos guardados:", formData);
    onClose(); // Cerrar el modal después de guardar
  };

  return (
    <div className="modal">
      <div className="modal_content">
        <h2>Formulario</h2>
        {/* Campos dinámicos según la sección */}
        {section === "precios" && (
          <>
            <label>
              Nombre de Membresía:
              <input
                type="text"
                name="nombreMembresia"
                onChange={handleChange}
              />
            </label>
            <label>
              Precio:
              <input type="number" name="precio" onChange={handleChange} />
            </label>
          </>
        )}
        {section === "promociones" && (
          <>
            <label>
              Título de Promoción:
              <input type="text" name="tituloPromocion" onChange={handleChange} />
            </label>
            <label>
              Descuento:
              <input type="text" name="descuento" onChange={handleChange} />
            </label>
          </>
        )}
        
        {section === "informacion-general" && (
            <>
                <label>
                    Información general:
                    <br />
                    <textarea name="info" onChange={handleChange}></textarea>
                </label>
            </>
        )}

        {section === "sucursales" && (
            <>
                <label>
                    Nombre de sucursal:
                    <input type="text" name="sucursal" onChange={handleChange} />
                </label>
                <label>
                    Dirección de sucursal:
                    <input type="url" name="direccion" onChange={handleChange} />
                </label>
            </>
        )}

        {section === "contacto" && (
            <>
                <label>
                    Correo electrónico:
                    <input type="email" name="correo" onChange={handleChange} />
                </label>
                <label>
                    Telefóno:
                    <input type="tel" name="telefono" onChange={handleChange} />
                </label>
                <label>
                    Redes sociales:
                    <input type="text" name="redes" onChange={handleChange} />
                </label>
            </>
        )}

        <button onClick={handleSave}>Guardar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default ModalForm;
