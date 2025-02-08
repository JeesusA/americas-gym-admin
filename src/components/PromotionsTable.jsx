import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

const PromotionsTable = ({ onClose }) => {
  const [promociones, setPromociones] = useState([]);
  const [editMode, setEditMode] = useState(null); // ID de la promoción en edición
  const [editData, setEditData] = useState({ nombre_promocion: "", descuento: "" });

  // Obtener promociones desde el backend
  useEffect(() => {
    const fetchPromociones = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/promociones");
        if (!response.ok) {
          throw new Error("Error al obtener promociones");
        }
        const data = await response.json();
        setPromociones(data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchPromociones();
  }, []);

  // Manejar cambio en los inputs de edición
  const handleInputChange = (e, field) => {
    setEditData({ ...editData, [field]: e.target.value });
  };

  // Guardar cambios en la promoción
  const handleSave = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/promociones/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar la promoción");
      }

      // Actualizar el estado con los nuevos valores
      setPromociones(
        promociones.map((promo) =>
          promo.id === id ? { ...promo, ...editData } : promo
        )
      );

      setEditMode(null); // Salir del modo edición
      socket.emit("enviarNotificacion", {message: "✅ Promoción actualizada correctamente."})
    } catch (error) {
      console.log("Error editando promoción:", error);
      alert("Hubo un problema al actualizar la promoción.");
    }
  };

  // Eliminar una promoción
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/promociones/${id}`, { method: "DELETE" });
      setPromociones(promociones.filter((promo) => promo.id !== id));
      socket.emit("enviarNotificacion", {message: "❌ Promoción eliminada correctamente."})
    } catch (error) {
      console.log("Error eliminando promoción", error);
    }
  };

  return (
    <div id="promotions-container">
      <h2 id="promotions-title">Lista de Promociones</h2>
      <button id="promotions-back-button" onClick={onClose}>Regresar</button>

      <ul id="promotions-list">
        {promociones.map((promo) => (
          <li key={promo.id} className="promotion-item">
            {editMode === promo.id ? (
              <span className="promotion-text">
                <input
                  type="text"
                  value={editData.nombre_promocion}
                  onChange={(e) => handleInputChange(e, "nombre_promocion")}
                />
                <input
                  type="number"
                  value={editData.descuento}
                  onChange={(e) => handleInputChange(e, "descuento")}
                />
              </span>
            ) : (
              <span className="promotion-text">
                {promo.nombre_promocion} - {promo.descuento}%
              </span>
            )}

            {editMode === promo.id ? (
              <button
                id={`save-${promo.id}`}
                className="promotion-save-button"
                onClick={() => handleSave(promo.id)}
              >
                Guardar
              </button>
            ) : (
              <button
                id={`edit-${promo.id}`}
                className="promotion-edit-button"
                onClick={() => {
                  setEditMode(promo.id);
                  setEditData({ nombre_promocion: promo.nombre_promocion, descuento: promo.descuento });
                }}
              >
                Editar
              </button>
            )}
            <button id={`delete-${promo.id}`} className="promotion-delete-button" onClick={() => handleDelete(promo.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PromotionsTable;
