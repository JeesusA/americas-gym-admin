import React, { useState, useEffect } from "react";

const Discount = () => {
  const [discountCode, setDiscountCode] = useState("");

  // Función para obtener el código de descuento
  const fetchDiscountCode = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/discount-code/generate");
      if (!response.ok) {
        throw new Error("Error al obtener el código de descuento.");
      }
      const data = await response.json();
      console.log(data);
      setDiscountCode(data.code); // Guardar el código en el estado
    } catch (error) {
      console.error("Error al obtener el código de descuento:", error);
    }
  };

  // Llamar a la función cuando se monte el componente
  useEffect(() => {
    fetchDiscountCode();
  }, []);

  return (
    <div>
      <h1 className="discount-title">Código de descuento</h1>
      <div className="card-discount">
        <h3 >¡Usa este código para obtener un descuento!</h3>
        <p className="promo-code">{discountCode ? discountCode : "Cargando código..."}</p>
      </div>
    </div>
  );
};

export default Discount;
