import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase.config";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { Facebook, Google } from "../../Components/Icons/Icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSigningIn, setIsSigningIn] = useState(false); // Stato per tracciare se il login è in corso

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setTimeout(() => navigate("/profile"), 3000);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSignIn = async (provider) => {
    setIsSigningIn(true); // Disabilita i pulsanti di login
    try {
      await signInWithPopup(auth, provider);
      toast.success("Ai intrat în cont!");
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        toast.error(
          "Fereastra di autenticazione è stata chiusa. Per favore riprova."
        );
      } else {
        console.error("Eroare la autentificare:", error.message);
        toast.error("Eroare la intrarea în cont!");
      }
    } finally {
      setIsSigningIn(false); // Rendi di nuovo i pulsanti cliccabili
    }
  };

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    handleSignIn(provider);
  };

  const handleFacebookSignIn = () => {
    const provider = new FacebookAuthProvider();
    handleSignIn(provider);
  };

  return (
    <section className="login">
      <div className="content">
        <h2 className="text-2">Intră în cont</h2>
        <div className="login-btns">
          <p>Accesează cu Google:</p>
          <button
            className="login-btn google-btn"
            onClick={handleGoogleSignIn}
            disabled={isSigningIn} // Disabilita il pulsante se il login è in corso
          >
            <Google />
            Sign in with Google
          </button>
          <div className="line"></div>
          <p>Accesează cu Facebook:</p>
          <button
            className="login-btn facebook-btn"
            onClick={handleFacebookSignIn}
            disabled={isSigningIn} // Disabilita il pulsante se il login è in corso
          >
            <Facebook />
            Sign in with Facebook
          </button>
        </div>
        <p className="p-1 free-credit">
          <img
            src="https://res.cloudinary.com/dsqwnuyiw/image/upload/v1711565459/home_shape_sxxfum.webp"
            alt="credit img"
          />
          Intră în cont și obții 1 credit gratuit.
        </p>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </section>
  );
};

export default Login;
