import React, { useEffect, useState, useRef } from "react";
import MistralClient from "@mistralai/mistralai";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./DreamGenerate.css";
import { PaperPlane } from "../../Components/Icons/Icons";
import Loader from "../../Components/Loader/Loader";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useNavigate } from "react-router-dom"; // Importă useNavigate

const DreamGenerate = ({ setLoading, loading }) => {
  const [inputMessage, setInputMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState(null);
  const [credits, setCredits] = useState(0);
  const [lastDreamId, setLastDreamId] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const textareaRef = useRef(null);

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchLastDream = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const dreams = userDoc.data().dreams || [];
          if (dreams.length > 0) {
            const lastDream = dreams[dreams.length - 1]; // Ultimul vis
            setResponseMessage(lastDream.description);
            setLastDreamId(lastDream.id);
            setIsFavorite(lastDream.favorite);
          }
        }
      }
    };

    fetchLastDream();
  }, [auth, db]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          await setDoc(userDocRef, { credits: 1, dreams: [] });
          setCredits(1);
        } else {
          setCredits(userDoc.data().credits);
        }
      }
    });

    return () => unsubscribe();
  }, [auth, db]);

  const navigate = useNavigate(); // Inițializează useNavigate

  const handleSendMessage = async () => {
    const isValidInput = /vis|visat|visez/i.test(inputMessage);

    if (!isValidInput) {
      toast.error("Scrie visul tău complet!");
      setInputMessage("");
      return;
    }

    const user = auth.currentUser;
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userCredits = userDoc.data().credits;

      if (userCredits > 0) {
        await updateDoc(userDocRef, { credits: userCredits - 1 });
        setCredits(userCredits - 1);

        setLoading(true);
        const client = new MistralClient("zLbywpDKAlgWYF88dTf94NNJMMlamajm");
        const chatPromise = client.chat({
          model: "mistral-large-latest",
          messages: [
            {
              role: "user",
              content: `Bună! Eu sunt SomnolentAI, asistentul tău pentru interpretarea viselor. Ai avut următorul vis: '${inputMessage}'. Permite-mi să îți explic ce semnifică acest vis. Ofer analiză detaliată, structurat într-o listă numerotată, fiecare punct explicând simbolurile și temele principale din visul tău. Să începem!`,
            },
          ],
          language: "ro",
        });

        toast.promise(chatPromise, {
          pending: "Se generează visul...",
          success: "Visul a fost generat cu succes! 🎉",
          error: "Eroare la generarea visului 😢",
        });

        try {
          const chatResponse = await chatPromise;
          const generatedDream = chatResponse.choices[0].message.content;

          setResponseMessage(generatedDream);
          setInputMessage("");

          const dreamId = Date.now().toString();

          const newDream = {
            id: dreamId,
            title: inputMessage,
            description: generatedDream,
            favorite: false,
            deleted: false,
            timestamp: new Date(),
          };

          await updateDoc(userDocRef, {
            dreams: arrayUnion(newDream),
          });

          setLastDreamId(dreamId);
          setIsFavorite(false);
        } catch (error) {
          console.error("Eroare în timpul cererii de chat:", error);
        } finally {
          setLoading(false);
        }
      } else {
        toast.error("Nu ai suficiente credite pentru a genera un nou vis.");
        setInputMessage("");

        // Redirecționează la "/buy-credits" după 3 secunde
        setTimeout(() => {
          navigate("/buy-credits");
        }, 3000);
      }
    }
  };

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleNewDreamClick = () => {
    textareaRef.current.focus();
    setResponseMessage(null);
  };

  const handleAddToFavorites = async () => {
    const user = auth.currentUser;
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const dreams = userDoc.data().dreams;
      const updatedDreams = dreams.map((dream) =>
        dream.id === lastDreamId
          ? { ...dream, favorite: !dream.favorite }
          : dream
      );

      await updateDoc(userDocRef, { dreams: updatedDreams });

      const dream = updatedDreams.find((dream) => dream.id === lastDreamId);
      if (dream) {
        const isFavorite = dream.favorite;

        setIsFavorite(isFavorite);

        if (isFavorite) {
          toast.success("Visul a fost adăugat la favorite!");
        } else {
          toast.error("Visul a fost eliminat din favorite!");
        }
      } else {
        toast.error("Eroare: Visul nu a fost găsit.");
      }
    } else {
      toast.error("Eroare: Documentul utilizatorului nu există.");
    }
  };

  return (
    <>
      <section className="generate">
        {loading && <Loader />}
        <div className="content">
          <h2 className="text-2">Generează visul</h2>
          <p className="p-1">
            Cu cât descrierea este mai bogată în informații, cu atât
            interpretarea va fi mai relevantă.
          </p>

          <div className="input-text">
            <textarea
              ref={textareaRef}
              placeholder="Am visat că foloseam SomnoletAI..."
              value={inputMessage}
              onKeyPress={handleInputKeyPress}
              onChange={handleInputChange}
            />
            <div className="send-btn" onClick={handleSendMessage}>
              <PaperPlane />
            </div>
          </div>

          {responseMessage && (
            <div>
              <div
                className="answer"
                dangerouslySetInnerHTML={{
                  __html: formatDream(responseMessage),
                }}
              ></div>
              <div className="action-btns">
                <div className="action action1" onClick={handleAddToFavorites}>
                  {isFavorite ? "Scoate de la favorite" : "Adaugă la favorite"}
                </div>
                <div className="action action2" onClick={handleNewDreamClick}>
                  Generează un nou vis
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

const formatDream = (text) => {
  let formattedText = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Eliminare simbol ": -"
  formattedText = formattedText.replace(/:\s*-\s*/g, "");

  // Formatare pentru titlurile marcate cu "###"
  formattedText = formattedText.replace(/###\s(.*?)\n/g, "<h3>$1</h3><br />");

  // Formatare pentru listele numerice
  formattedText = formattedText.replace(
    /(\d+)\.\s/g,
    "<p class='numbered-item'>$1. "
  );

  // Adăugare de line break după fiecare element de listă
  formattedText = formattedText.replace(
    /(\d+\..*?)(<br \/>|<\/strong>)/g,
    "<br /><br />$1</p><br />$2"
  );

  return formattedText;
};

export default DreamGenerate;
