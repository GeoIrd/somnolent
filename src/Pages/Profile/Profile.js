import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import Btn from "../../Components/Btn/Btn";
import { toast, ToastContainer } from "react-toastify";
import { db } from "../../firebase.config"; // Asigură-te că această cale este corectă
import "./Profile.css";

import {
  HeartIcon,
  HouseIcon,
  ListIcon,
  MoonIcon,
} from "../../Components/Icons/Icons";
import CreditIcon from "../../Components/CreditIcon/CreditIcon";

const Profile = () => {
  const navigate = useNavigate(); // Hook pentru navigare
  const [user, setUser] = useState(null);
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        // Setează un abonament pentru a asculta schimbările în documentul utilizatorului
        const userDocRef = doc(db, "users", user.uid);
        const unsubscribeDoc = onSnapshot(userDocRef, (docSnapshot) => {
          if (docSnapshot.exists()) {
            setCredits(docSnapshot.data().credits);
          }
        });

        // Curăță abonamentul la demontare
        return () => unsubscribeDoc();
      } else {
        setUser(null);
        setCredits(0);
        navigate("/login");
      }
    });

    // Curăță abonamentul de autentificare la demontare
    return () => unsubscribeAuth();
  }, [navigate]);

  const handleSignOut = async () => {
    const confirm = window.confirm("Sigur vrei să ieși din cont?");
    if (confirm) {
      try {
        await auth.signOut();
        toast.success("Ai ieșit din cont!");
        navigate("/login");
      } catch (error) {
        toast.error("Eroare la ieșirea din cont!");
      }
    }
  };

  return (
    <section className="profile">
      <div className="content">
        <h2 className="text-2">Contul tău:</h2>
        <div className="profile-info">
          <Link to="/">
            <div className="info">
              <HouseIcon></HouseIcon>
              <h3>Home page</h3>
            </div>
          </Link>
          <Link to="/list">
            <div className="info">
              <ListIcon></ListIcon> <h3>visele generate</h3>
            </div>
          </Link>

          <Link to="/favourites">
            <div className="info">
              <HeartIcon></HeartIcon> <h3>visele favorite</h3>
            </div>
          </Link>

          <Link to="/generate">
            <div className="info">
              <MoonIcon></MoonIcon> <h3>Generează Vis</h3>
            </div>
          </Link>

          <div className="info">
            <CreditIcon></CreditIcon>{" "}
            <h3>
              {" "}
              <Link to="/buy-credits">Număr de credite: {credits} </Link>
            </h3>
          </div>
        </div>
        <Link to="/buy-credits">
          <div className="btns">
            <Btn variant="primary">Cumpără credite</Btn>
          </div>
        </Link>
        <div className="signout" onClick={handleSignOut}>
          Ieși din cont
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </section>
  );
};

export default Profile;
