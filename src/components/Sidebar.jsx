import React from "react";

const Sidebar = ({ onSectionSelect }) => {
  return (
    <aside className="sidebar">
      <h2>Panel de Edición</h2>
      <nav>
        <ul>
          <li>
            <button onClick={() => onSectionSelect("precios")}>Precios de Membresías</button>
          </li>
          <li>
            <button onClick={() => onSectionSelect("promociones")}>Promociones</button>
          </li>
          <li>
            <button onClick={() => onSectionSelect("informacion-general")}>Informacion General</button>
          </li>
          <li>
            <button onClick={() => onSectionSelect("sucursales")}>Sucursales</button>
          </li>
          <li>
            <button onClick={() => onSectionSelect("contacto")}>Contacto</button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
