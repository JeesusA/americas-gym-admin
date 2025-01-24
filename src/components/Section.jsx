import React, { useState } from "react";

const Section = ({ id, title, description, buttonText, onButtonClick }) => {
  return (
    <section id={id}>
      <h1>{title}</h1>
      <p>{description}</p>
      <button onClick={onButtonClick}>{buttonText}</button>
    </section>
  );
};

export default Section;
