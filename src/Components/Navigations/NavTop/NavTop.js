import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase.config"; // Asigură-te că acestă cale este corectă
import "./NavTop.css";
import Btn from "../../Btn/Btn";
import { RightToBracket } from "../../Icons/Icons";
import CreditIcon from "../../CreditIcon/CreditIcon";

const NavTop = () => {
  const [user, setUser] = useState(null);
  const [credits, setCredits] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        // Set up real-time listener for the user's document
        const userDocRef = doc(db, "users", user.uid);
        const unsubscribeDoc = onSnapshot(userDocRef, (docSnapshot) => {
          if (docSnapshot.exists()) {
            setCredits(docSnapshot.data().credits);
          }
        });

        // Cleanup listener on unmount or when user changes
        return () => {
          unsubscribeDoc();
        };
      } else {
        setUser(null);
        setCredits(0);
      }
    });

    // Cleanup auth listener on unmount
    return () => {
      unsubscribeAuth();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Adaugă evenimentul de ascultare pentru scroll
    window.addEventListener("scroll", handleScroll);

    // Cleanup pentru evenimentul de scroll la demontare
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`nav-top ${isScrolled ? "scrolled" : ""}`}>
      <div className="spa-bet">
        <Link to="/">
          <div className="logo-wrapper">
            <h2 className="logo">Somnolent Ai</h2>
          </div>
        </Link>
        {user ? (
          <Link to="/profile">
            <div className="user-info">
              <CreditIcon />
              <span className="user-credits">{credits} credite</span>
            </div>
          </Link>
        ) : (
          <Link to="/login">
            <Btn variant="primary">
              <RightToBracket /> Cont
            </Btn>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavTop;
