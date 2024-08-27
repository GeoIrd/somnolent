import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loader from "../Loader/Loader";

const PrivateRoute = ({ element }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Changed to `null` for better initial state handling
  const auth = getAuth();
  const navigate = useNavigate(); // Hook to programmatically navigate

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false); // Finished checking auth status
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, [auth, navigate]);

  useEffect(() => {
    if (isAuthenticated === false && !loading) {
      // Delay navigation slightly to allow the toast to show up
      const timer = setTimeout(() => navigate("/login"), 1); // 5 seconds delay
      return () => clearTimeout(timer); // Cleanup timeout if the component unmounts
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return <Loader />; // Show loader while checking auth status
  }

  if (isAuthenticated) {
    return element; // Render the protected element if authenticated
  }

  return (
    <>
      {/* Fallback content to avoid blank page */}
      <div style={{ textAlign: "center" }}>
        <section className="redirect">
          <div className="content">
            <h2 className="">
              Acceseaza contul tau pentru a avea acces la aceasta functie
            </h2>
          </div>
        </section>
      </div>
    </>
  );
};

export default PrivateRoute;
