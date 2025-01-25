import React, { useState } from "react";
import { use } from "react";

const Sidebar = ({ onSectionSelect }) => {

    const [isOpen, setIsOpen] = useState(false);


    return (
    <aside className="sidebar">
        <div className="sidebar_logo">AMERICA´S GYM</div>
        <div className={`sidebar_items ${isOpen && "open"}`} onClick={ () => setIsOpen(!isOpen)}>
            <a href="#precios" onClick={() => onSectionSelect("precios")}>Precios de Membresías</a>
            <a href="#promociones" onClick={() => onSectionSelect("promociones")}>Promociones</a>
            <a href="#informacion-general" onClick={() => onSectionSelect("informacion-general")}>Información General</a>
            <a href="#sucursales" onClick={() => onSectionSelect("sucursales")}>Sucursales</a>
            <a href="#contacto" onClick={() => onSectionSelect("contacto")}>Contacto</a>    
            <a href="#landing-page" className="landing" onClick={() => onSectionSelect("landing-page")}>Ver Landing Page</a>    
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
