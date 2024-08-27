import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SuccessPage.css";
import Btn from "../../Components/Btn/Btn";

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/success", { replace: true }); // Naviga senza aggiornare i crediti
  }, [navigate]);

  return (
    <section className="success">
      <div className="content">
        <h2 className="text-2">Plataaa este confirmataaa!!</h2>
        <p className="p-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore,
          repellat?
        </p>
        <div className="btns">
          <Btn variant="primary">Genereaza un vis</Btn>
          <Btn variant="secondary">Contul tau</Btn>
        </div>
        <img
          src="https://res.cloudinary.com/dsqwnuyiw/image/upload/v1724250923/mobile-payment_n4wtfa.png"
          alt="success img"
        />
      </div>
    </section>
  );
};

export default SuccessPage;
