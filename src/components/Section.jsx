import React from "react";

// Componente reutilizable para mostrar diferentes secciones
const Section = ({ id, title, description, buttonText, onButtonClick, extraButtons = [] }) => {
  return (
    <section id={id}>
      <h1>{title}</h1>
      <p>{description}</p>
      <div className="buttons-container">
        <button className="button-agregar" onClick={onButtonClick}>
          {buttonText}
        </button>

        {/* Renderizar botones adicionales si existen */}
        {extraButtons.map((btn, index) => (
          <button key={index} className="button-actualizar" onClick={btn.onClick}>
            {btn.text}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Section;
