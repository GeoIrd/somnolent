import React, { useState } from "react";
import MistralClient from "@mistralai/mistralai";
import "./Mistral.css";

const Mistral = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState(null);

  const handleSendMessage = async () => {
    const apiKey = "zLbywpDKAlgWYF88dTf94NNJMMlamajm";
    const client = new MistralClient(apiKey);

    if (
      !inputMessage.toLowerCase().includes("vis") &&
      !inputMessage.toLowerCase().includes("visez") &&
      !inputMessage.toLowerCase().includes("visat")
    ) {
      setResponseMessage("Îmi pare rău, răspund doar la întrebări cu vise.");
      return;
    }

    try {
      const chatResponse = await client.chat({
        model: "mistral-large-latest",
        messages: [
          {
            role: "user",
            content: `Acesta este visul utilizatorului: ${inputMessage}. Descifreazal si scrie ce semnificatie are, fara disclaimer.`,
          },
        ],
        language: "ro",
      });

      setResponseMessage(chatResponse.choices[0].message.content);
    } catch (error) {
      console.error("Error during chat request:", error);
      setResponseMessage("A apărut o eroare în timpul procesării cererii.");
    }

    setInputMessage("");
  };

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <section className="mistral">
      <div className="content">
        {!responseMessage ? (
          <p className="p-1">
            Te rugăm să ne împărtășești visul tău într-un mod cât mai detaliat
            și clar posibil. Cu cât descrierea este mai bogată în informații, cu
            atât interpretarea generată de inteligența artificială va fi mai
            precisă și relevantă pentru tine.
          </p>
        ) : (
          <div className="answer">
            <p className="p-1">{responseMessage}</p>
          </div>
        )}

        <div className="input-text">
          <input
            type="text"
            placeholder="Scrie visul tau..."
            value={inputMessage}
            onKeyPress={handleInputKeyPress}
            onChange={handleInputChange}
          />
          <button className="send-btn" onClick={handleSendMessage}>
            <img
              src="https://res.cloudinary.com/dsqwnuyiw/image/upload/v1711565459/send_arrow_fypqlo.webp"
              alt="send btn"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Mistral;
