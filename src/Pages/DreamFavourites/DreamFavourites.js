import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import DreamCard from "../../Components/DreamCard/DreamCard";
import "./DreamFavourites.css";
import { Search } from "../../Components/Icons/Icons";

const DreamFavourites = () => {
  const [favorites, setFavorites] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchFavorites = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const allDreams = userDoc.data().dreams || [];
          setFavorites(allDreams.filter((dream) => dream.favorite));
        }
      }
    };

    fetchFavorites();
  }, [auth, db]);

  const toggleFavorite = async (id) => {
    const user = auth.currentUser;
    const userDocRef = doc(db, "users", user.uid);

    const updatedFavorites = favorites.map((dream) =>
      dream.id === id ? { ...dream, favorite: !dream.favorite } : dream
    );

    setFavorites(updatedFavorites.filter((dream) => dream.favorite));

    try {
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const allDreams = userDoc.data().dreams || [];
        const updatedDreams = allDreams.map((dream) =>
          dream.id === id // folosim id în loc de title
            ? { ...dream, favorite: !dream.favorite }
            : dream
        );

        await updateDoc(userDocRef, {
          dreams: updatedDreams,
        });
      }
    } catch (error) {
      console.error("Eroare la actualizarea stării de favorite:", error);
    }
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredFavorites = favorites
    .filter((dream) =>
      dream.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.timestamp - b.timestamp
        : b.timestamp - a.timestamp
    );

  return (
    <section className="list">
      <div className="content">
        <h2 className="text-2">Visele favorite</h2>

        <div className="controls">
          <div className="search">
            <input
              type="text"
              placeholder="Cauta titluri..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div className="search-icon">
              <Search />
            </div>
          </div>
          <select value={sortOrder} onChange={handleSortChange}>
            <option value="desc">Cele mai recente</option>
            <option value="asc">Cele mai vechi</option>
          </select>
        </div>

        <div className="dream-sec">
          {filteredFavorites.length > 0 ? (
            filteredFavorites.map((dream) => (
              <DreamCard
                key={dream.id} // folosim id-ul visului
                title={dream.title}
                description={dream.description}
                isFavorite={dream.favorite}
                toggleFavorite={() => toggleFavorite(dream.id)} // Folosim ID-ul visului
                searchTerm={searchTerm}
                showDelete={false} // Nu afișăm iconița de ștergere
              />
            ))
          ) : (
            <p>Nu ai niciun vis favorit.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default DreamFavourites;
