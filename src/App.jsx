import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify"; // Importar React Toastify
import "react-toastify/dist/ReactToastify.css"; // Importar estilos de las notificaciones
import Sidebar from "./components/Sidebar";
import Section from "./components/Section";
import ModalForm from "./components/ModalForm";
import LandingPage from "./components/LandingPage";
import PromotionsTable from "./components/PromotionsTable";
import "./App.css";

const socket = io("http://localhost:3001");

const App = () => {

  const [activeSection, setActiveSection] = useState(""); // Estado para gestionar la sección activa
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal
  const [showPromotionsTable, setShowPromotionsTable] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Función para cambiar la sección activa
  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
  };

  useEffect(() => {
    socket.on("notificacion", (data) => {
        console.log("🔔 Notificación recibida en frontend:", data.message);
        toast.success(data.message, { autoClose:3000 }); // Mostrar notificacion pop-up
    });

    return () => {
        socket.off("notificacion");
    };
  }, []);
  
  // Abrir el modal
  const handleOpenModal = () => { setIsModalOpen(true); };

  // Cerrar el modal
  const handleCloseModal = () => { setIsModalOpen(false); };

  return (
    <div className="container">
      <Sidebar onSectionSelect={handleSectionChange} />

      {/* Componente que muestra las notificaciones pop-up */}
      <ToastContainer position="top-right" autoClose={3000}/>

      {/* Mostrar solo la sección activa */}
      {activeSection === "precios" && (
        <Section
          id="precios"
          title="Editar Precios de Membresías"
          description="Aquí podrás agregar los precios de las membresías."
          buttonText="Agregar nuevo precio"
          onButtonClick={handleOpenModal}
        />
      )}
      {activeSection === "promociones" && !showPromotionsTable ? (
        <Section
          id="promociones"
          title="Editar Promociones"
          description="Aquí podrás agregar y actualizar las promociones disponibles."
          buttonText="Agregar nueva promoción"
          onButtonClick={handleOpenModal}
          extraButtons={[{ text: "Actualizar", onClick: () => setShowPromotionsTable(true) }]} // NUEVO
        />
      ) : activeSection === "promociones" && showPromotionsTable ? (
        <PromotionsTable onClose={() => setShowPromotionsTable(false)} />
      ) : null}
      {activeSection === "informacion-general" && (
        <Section
          id="informacion-general"
          title="Editar Información General"
          description="Aquí podrás agregar la información básica del gimnasio."
          buttonText="Editar información"
          onButtonClick={handleOpenModal}
        />
      )}
      {activeSection === "sucursales" && (
        <Section
          id="sucursales"
          title="Editar Información de Sucursales"
          description="Aquí podrás agregar sucursales."
          buttonText="Agregar nueva sucursal"
          onButtonClick={handleOpenModal}
        />
      )}
      {activeSection === "contacto" && (
        <Section
          id="contacto"
          title="Editar Información de Contacto"
          description="Aquí podrás agregar el correo, teléfono y redes sociales."
          buttonText="Editar contacto"
          onButtonClick={handleOpenModal}
        />
      )}

      {activeSection === "landing-page" && <LandingPage></LandingPage>}

      {/* Modal Formulario */}
      <ModalForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        section={activeSection}
      />
    </div>
  );
};

export default App;
