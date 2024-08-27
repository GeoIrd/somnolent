import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import DreamCard from "../../Components/DreamCard/DreamCard";
import "./DreamList.css";
import { Search } from "../../Components/Icons/Icons";

const DreamList = () => {
  const [dreams, setDreams] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchDreams = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setDreams(userDoc.data().dreams || []);
        }
      }
    };

    fetchDreams();
  }, [auth, db]);

  const toggleFavorite = async (id) => {
    const user = auth.currentUser;
    const userDocRef = doc(db, "users", user.uid);

    const updatedDreams = dreams.map((dream) =>
      dream.id === id ? { ...dream, favorite: !dream.favorite } : dream
    );

    setDreams(updatedDreams);

    try {
      await updateDoc(userDocRef, {
        dreams: updatedDreams,
      });
    } catch (error) {
      console.error("Eroare la actualizarea stării de favorite:", error);
    }
  };

  const deleteDream = async (id) => {
    const user = auth.currentUser;
    const userDocRef = doc(db, "users", user.uid);

    const updatedDreams = dreams.filter((dream) => dream.id !== id);

    setDreams(updatedDreams);

    try {
      await updateDoc(userDocRef, {
        dreams: updatedDreams,
      });
    } catch (error) {
      console.error("Eroare la ștergerea visului:", error);
    }
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAndSortedDreams = dreams
    .filter(
      (dream) =>
        !dream.deleted &&
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
        <h2 className="text-2">Visele Generate</h2>

        <div className="controls">
          <div className="search">
            <input
              type="text"
              placeholder="Cauta titluri..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div className="search-icon">
              <Search></Search>
            </div>
          </div>
          <select value={sortOrder} onChange={handleSortChange}>
            <option value="desc">Cele mai recente</option>
            <option value="asc">Cele mai vechi</option>
          </select>
        </div>
        <div className="dream-sec">
          {filteredAndSortedDreams.length > 0 ? (
            filteredAndSortedDreams.map((dream) => (
              <DreamCard
                key={dream.id} // folosim id-ul visului
                title={dream.title}
                description={dream.description}
                isFavorite={dream.favorite}
                toggleFavorite={() => toggleFavorite(dream.id)} // Folosim ID-ul visului
                deleteDream={() => deleteDream(dream.id)} // Folosim ID-ul visului
                searchTerm={searchTerm}
                showDelete={true} // Afișăm iconița de ștergere
              />
            ))
          ) : (
            <p>Nu ai generat niciun vis.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default DreamList;
