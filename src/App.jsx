import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Section from "./components/Section";
import "./App.css"

const App = () => {

  // Estado para gestionar la sección activa
  const [activeSection, setActiveSection] = useState("");

  // Función para cambiar la sección activa
  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
  }

  return (
    <div className="container">
      <Sidebar onSectionSelect={handleSectionChange}/>
      <main className="content">
        {/* Mostrar solo la sección activa */}
        {activeSection === "precios" && (<Section
          id="precios"
          title="Editar Precios de Membresías"
          description="Aquí podrás agregar, editar o eliminar los precios de las membresías."
          buttonText="Agregar nuevo precio"
        />)}

        {activeSection === "promociones" && (<Section
          id="promociones"
          title="Editar Promociones"
          description="Aquí podrás agregar, editar o eliminar las promociones disponibles."
          buttonText="Agregar nueva promoción"
        />)}
        
        {activeSection === "informacion-general" && (<Section
          id="informacion-general"
          title="Editar Información General"
          description="Aquí podrás actualizar la información básica del gimnasio."
          buttonText="Editar información"
        />)}
        
        {activeSection === "sucursales" && (<Section
          id="sucursales"
          title="Editar Información de Sucursales"
          description="Aquí podrás agregar, editar o eliminar sucursales."
          buttonText="Agregar nueva sucursal"
        />)}

        {activeSection === "contacto" && (<Section
          id="contacto"
          title="Editar Información de Contacto"
          description="Aquí podrás actualizar el correo, teléfono y redes sociales."
          buttonText="Editar contacto"
        />)}
        
      </main>
    </div>
  );
};

export default App;
