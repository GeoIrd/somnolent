import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { auth } from "../../firebase.config"; // Asigură-te că imporți corect Firebase
import CreditIcon from "../../Components/CreditIcon/CreditIcon";
import "./BuyCredits.css";
import Loader from "../../Components/Loader/Loader";
import Btn from "../../Components/Btn/Btn";
import { Link, useNavigate } from "react-router-dom"; // Importă useNavigate

// Înlocuiește cu cheia publică Stripe
const stripePromise = loadStripe(
  "pk_live_51Pry1NEbUVQRsZzGqIkzIYOrifkZLiG4GJOj6eUmGkT2JHBXuz98as8iBifPZh8aplskaF2PWkwa6P4yaj9oADfh00CEF7mDeS"
);

const BuyCredits = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Utilizează useNavigate

  const makePayment = async (amount, credits) => {
    setLoading(true);
    setError(null);

    try {
      const stripe = await stripePromise;

      if (!stripe) {
        throw new Error("Stripe.js has not loaded correctly.");
      }

      const user = auth.currentUser;
      const userId = user ? user.uid : "unknown";

      // Asigură-te că credits sunt întregi
      const intCredits = Math.floor(credits);

      const response = await fetch(
        "https://somnolent-api.onrender.com/api/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount, credits: intCredits, userId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const session = await response.json();

      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      setError("Failed to initiate payment. Please try again.");
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleHelpClick = () => {
    navigate("/", { replace: true }); // Navighează către pagina principală
    setTimeout(() => {
      window.scrollTo({
        top: document.getElementById("contact")?.offsetTop,
        behavior: "smooth",
      });
    }, 200); // Așteaptă scurt timp pentru ca pagina să se încarce
  };

  return (
    <section className="buy-credits">
      <div className="content">
        <h2 className="text-2">Cumpără Credite</h2>
        <div className="prices">
          <div className="price" onClick={() => makePayment(1000, 1)}>
            <CreditIcon /> 1 credit: 10 ron
          </div>
          <div className="price" onClick={() => makePayment(2500, 2)}>
            <CreditIcon /> 3 credite: 25 ron
          </div>
          <div className="price" onClick={() => makePayment(5000, 3)}>
            <CreditIcon /> 5 credite: 35 ron
          </div>
        </div>
        <p className="p-1">
          *Fiecare vis pe care îl accesezi în aplicația noastră are un cost de
          doar 1 credit.
        </p>
        <div className="btns">
          <Link to="/profile">
            <Btn variant="primary">Profil</Btn>
          </Link>
          <div onClick={handleHelpClick}>
            <Btn variant={"secondary"}>Ai nevoie de ajutor ?</Btn>
          </div>
        </div>
      </div>

      {loading && <Loader />}
      {error && <p className="error-message">{error}</p>}
    </section>
  );
};

export default BuyCredits;
