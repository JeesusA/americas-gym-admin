import React, { useState } from "react";

const Sidebar = ({ onSectionSelect }) => {

    // Estado para controlar la visiblidad del menú
    const [menuVisible, setMenuVisible] = useState(false);

    // Función para alternar la visibilidad del menú
    const toggleMenu = () => {setMenuVisible(!menuVisible);}

    return (
    <aside className="sidebar">
      {/* Botón del encabezado para desplegar el menú */}
      <h2 onClick={toggleMenu} className="sidebar-toggle">Panel de Edición</h2>
      
      {/* Menú desplegable controlado por estado */}
      {menuVisible && (<nav>
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
      </nav>)}
    </aside>
  );
};

export default Sidebar;
