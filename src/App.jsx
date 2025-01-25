import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Section from "./components/Section";
import ModalForm from "./components/ModalForm";
import LandingPage from "./components/LandingPage"
import "./App.css";

const App = () => {

  const [activeSection, setActiveSection] = useState(""); // Estado para gestionar la sección activa
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal
  
  // Función para cambiar la sección activa
  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
  };

  // Abrir el modal
  const handleOpenModal = () => { setIsModalOpen(true); };

  // Cerrar el modal
  const handleCloseModal = () => { setIsModalOpen(false); };

  return (
    <div className="container">
      <Sidebar onSectionSelect={handleSectionChange} />
      {/* Mostrar solo la sección activa */}
      {activeSection === "precios" && (
        <Section
          id="precios"
          title="Editar Precios de Membresías"
          description="Aquí podrás agregar, editar o eliminar los precios de las membresías."
          buttonText="Agregar nuevo precio"
          onButtonClick={handleOpenModal}
        />
      )}
      {activeSection === "promociones" && (
        <Section
          id="promociones"
          title="Editar Promociones"
          description="Aquí podrás agregar, editar o eliminar las promociones disponibles."
          buttonText="Agregar nueva promoción"
          onButtonClick={handleOpenModal}
        />
      )}
      {activeSection === "informacion-general" && (
        <Section
          id="informacion-general"
          title="Editar Información General"
          description="Aquí podrás actualizar la información básica del gimnasio."
          buttonText="Editar información"
          onButtonClick={handleOpenModal}
        />
      )}
      {activeSection === "sucursales" && (
        <Section
          id="sucursales"
          title="Editar Información de Sucursales"
          description="Aquí podrás agregar, editar o eliminar sucursales."
          buttonText="Agregar nueva sucursal"
          onButtonClick={handleOpenModal}
        />
      )}
      {activeSection === "contacto" && (
        <Section
          id="contacto"
          title="Editar Información de Contacto"
          description="Aquí podrás actualizar el correo, teléfono y redes sociales."
          buttonText="Editar contacto"
          onButtonClick={handleOpenModal}
        />
      )}

      {activeSection === "landing-page" && <LandingPage></LandingPage>}

      {/* Modal Formulario*/}
      <ModalForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        section={activeSection}
      />
    </div>
  );
};

export default App;
