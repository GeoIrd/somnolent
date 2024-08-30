import React, { useEffect, useState } from "react";
import "./TikTokWarning.css";

const TikTokWarning = () => {
  const [isTikTokBrowser, setIsTikTokBrowser] = useState(true);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/tiktok/.test(userAgent.toLowerCase())) {
      setIsTikTokBrowser(true);
    }
  }, []);

  const handleRedirect = () => {
    // Redirecționează utilizatorul către un URL generic sau pagină care le oferă mai multe informații.
    window.location.href = "https://www.somnolentai.com"; // Înlocuiește cu URL-ul aplicației tale sau pagină informativă
  };

  return isTikTokBrowser ? (
    <div className="oauth-warning">
      <p>
        Se pare că folosești browserul TikTok. Pentru autentificarea cu Google,
        te rugăm să folosești un browser extern precum Chrome sau Safari.
      </p>
      <button onClick={handleRedirect} className="redirect-button">
        Deschide în browserul tău
      </button>
    </div>
  ) : null;
};

export default TikTokWarning;
