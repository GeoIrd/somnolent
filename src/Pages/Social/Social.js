import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Social.css";

const Social = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();

    const isExternalBrowser =
      userAgent.includes("safari") ||
      userAgent.includes("chrome") ||
      userAgent.includes("firefox") ||
      userAgent.includes("edg") || // Microsoft Edge
      userAgent.includes("opera") ||
      userAgent.includes("opr") || // Opera Mini/Mobile
      userAgent.includes("samsungbrowser") ||
      userAgent.includes("duckduckgo");

    // Dacă utilizatorul folosește un browser extern, redirecționează-l la pagina principală
    if (isExternalBrowser) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <section className="social">
      <div className="content">
        <img
          className="arrow"
          src="https://res.cloudinary.com/dsqwnuyiw/image/upload/v1725364734/arrowUP_wwlhzq.png"
          alt="arrow"
        />
        <div className="text">
          <h2>Apasă acele 3 puncte sus</h2>
          <img
            className="dots"
            src="https://res.cloudinary.com/dsqwnuyiw/image/upload/v1725365712/dots.jpg"
            alt="dots"
          />
          <p className="p-1">Deschide website-ul în Browser Extern:</p>
          tiktok:
          <img
            className="social-img"
            src="https://res.cloudinary.com/dsqwnuyiw/image/upload/v1725364714/externalbrowserimgs/tiktok_q1b7ti.jpg"
            alt="tiktok"
          />
          instagram:
          <img
            className="social-img"
            src="https://res.cloudinary.com/dsqwnuyiw/image/upload/v1725364714/externalbrowserimgs/ig_xckrea.jpg"
            alt="instagram"
          />
        </div>
      </div>
    </section>
  );
};

export default Social;
