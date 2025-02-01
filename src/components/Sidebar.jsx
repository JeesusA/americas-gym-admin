import React, { useState, useEffect } from "react";
import { use } from "react";

// Maneja la seccion abierta
const Sidebar = ({ onSectionSelect }) => {

  // Maneja el estado de abierto/cerrado del sidebar para el uso del icono de hamburguesa en pantallas pequeñas
  const [isOpen, setIsOpen] = useState(false); 

  // Estado para el modo oscuro
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Cambia el tema y guarda la preferencia en localStorage
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Alternar el modo
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar_logo">AMERICA´S GYM</div>

      {/* Botón para alternar entre modo claro y oscuro */}
      <button id="theme-toggle" onClick={toggleTheme}>
        {darkMode ? "☀️ Modo Claro" : "🌙 Modo Oscuro"}
      </button>

      <div className={`sidebar_items ${isOpen && "open"}`} onClick={ () => setIsOpen(!isOpen)}>
        <a href="#precios" onClick={() => onSectionSelect("precios")}>Precios de Membresías</a>
        <a href="#promociones" onClick={() => onSectionSelect("promociones")}>Promociones</a>
        <a href="#informacion-general" onClick={() => onSectionSelect("informacion-general")}>Información General</a>
        <a href="#sucursales" onClick={() => onSectionSelect("sucursales")}>Sucursales</a>
        <a href="#contacto" onClick={() => onSectionSelect("contacto")}>Contacto</a>    
        <a href="#landing-page" onClick={() => onSectionSelect("landing-page")}>Ver Landing Page</a>    
      </div>

      <div className={`sidebar_toggle ${isOpen && "open"}`} onClick={ () => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </aside>
  );
};

export default Sidebar;
