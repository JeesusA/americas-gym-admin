import React from "react";

const Section = ({ id, title, description, buttonText }) => {
  return (
    <section id={id}>
      <h1>{title}</h1>
      <p>{description}</p>
      <button>{buttonText}</button>
    </section>
  );
};

export default Section;
