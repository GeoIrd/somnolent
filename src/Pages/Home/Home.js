import React, { useEffect, useState } from "react";
import "./Home.css";
import Btn from "../../Components/Btn/Btn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faBrain,
  faStar,
  faRobot,
  faNetworkWired,
  faMagic,
  faChartLine,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import { Link as LinkScroll } from "react-scroll";
import {
  faInstagram,
  faTiktok,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import SimpleSlider from "../../Components/Slider/Slider";

const Home = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [dreamsCount, setDreamsCount] = useState(0);
  const [starsCount, setStarsCount] = useState(0);

  useEffect(() => {
    const incrementValue = (endValue, setter, interval = 50) => {
      let currentValue = 0;
      const increment = Math.ceil(endValue / 100);

      const intervalId = setInterval(() => {
        currentValue += increment;
        if (currentValue >= endValue) {
          currentValue = endValue;
          clearInterval(intervalId);
        }
        setter(currentValue);
      }, interval);
    };

    incrementValue(523, setUsersCount); // Example: 523 active users
    incrementValue(7600, setDreamsCount); // Example: 7600 dreams generated
    incrementValue(350, setStarsCount); // Example: 350 stars rating
  }, []);

  return (
    <>
      <section className="home">
        <div className="content">
          <h1 className="text-1">
            Află secretele <br /> viselor tale prin <br />{" "}
            <span className="underlined-gradient">Inteligenta Artificiala</span>
          </h1>
          <p className="p-1">
            Folosește Inteligența Artificială pentru a interpreta semnificațiile
            viselor tale.
          </p>
          <div className="btns">
            <Btn variant="primary">
              <Link to="/generate">Incercă Acum !</Link>
            </Btn>
            <Btn variant="secondary">
              <LinkScroll
                to="how-it-works"
                smooth={true}
                duration={2000}
                offset={0}
                className="scroll-link"
              >
                Cum funcționează ?
              </LinkScroll>
            </Btn>
          </div>
        </div>
        <div className="proof">
          <div className="proof-item">
            <FontAwesomeIcon icon={faUsers} className="proof-icon" />
            <p className="proof-number">+{usersCount}</p>
            <p className="proof-label">Useri Activi Lunar</p>
          </div>
          <div className="proof-item">
            <FontAwesomeIcon icon={faBrain} className="proof-icon" />
            <p className="proof-number">+{dreamsCount}</p>
            <p className="proof-label">Vise Generate</p>
          </div>
          <div className="proof-item">
            <FontAwesomeIcon icon={faStar} className="proof-icon" />
            <p className="proof-number">+{starsCount}</p>
            <p className="proof-label">Recenzii pozitive</p>
          </div>
        </div>
      </section>

      <div className="how-it-works" id="how-it-works">
        <div className="howitworks">
          <div className="content">
            <h2 className="text-1">
              <span className="underlined-gradient">Cum funcționează?</span>
            </h2>
            <div className="cards">
              <div className="card">
                <FontAwesomeIcon icon={faRobot} className="proof-icon" />
                <h3 className="">Inteligența Artificială </h3>
                <p className="p-1">
                  Algoritmul nostru avansat utilizează AI pentru a analiza și a
                  interpreta visele tale.
                </p>
              </div>
              <div className="card">
                <FontAwesomeIcon icon={faNetworkWired} className="proof-icon" />
                <h3 className="">Rețele Neurale</h3>
                <p className="p-1">
                  Folosim rețele neurale complexe pentru a înțelege profunzimile
                  subconștientului tău.
                </p>
              </div>
              <div className="card">
                <FontAwesomeIcon icon={faMagic} className="proof-icon" />
                <h3 className="">Personalizare Unică</h3>
                <p className="p-1">
                  Fiecare vis este unic, iar interpretarea ta va fi
                  personalizată pentru tine.
                </p>
              </div>
              <div className="card">
                <FontAwesomeIcon icon={faChartLine} className="proof-icon" />
                <h3 className="">Îmbunătățire Continuă</h3>
                <p className="p-1">
                  Sistemul nostru evoluează constant pentru a-ți oferi rezultate
                  din ce în ce mai precise.
                </p>
              </div>
            </div>
            <div className="btns">
              <Btn variant="primary">
                <Link to="/generate">Incercă Acum !</Link>
              </Btn>
              <Btn variant="secondary">
                <LinkScroll
                  to="reviews"
                  smooth={true}
                  duration={1000}
                  offset={0}
                  className="scroll-link"
                >
                  Recenzii
                </LinkScroll>
              </Btn>
            </div>
          </div>
        </div>
        <div className="reviews" id="reviews">
          <div className="content">
            <h2 className="text-1">
              <span className="underlined-gradient">Ce spun utilizatorii?</span>
            </h2>
            <p className="p-1">
              Descoperă ce spun utilizatorii despre experiența lor de
              interpretare a viselor.
            </p>
            <SimpleSlider></SimpleSlider>
            <div className="btns">
              <Btn variant="primary">
                <Link to="/generate">Incercă Acum !</Link>
              </Btn>
              <Btn variant="secondary">
                <LinkScroll
                  to="contact"
                  smooth={true}
                  duration={1000}
                  offset={0}
                  className="scroll-link"
                >
                  Contact
                </LinkScroll>
              </Btn>
            </div>
          </div>
        </div>
        <div className="contacts" id="contact">
          <div className="content">
            <h2 className="text-1">
              <span className="underlined-gradient">Ai nevoie de ajutor?</span>
            </h2>
            <p className="p-1">
              Doriți să discutăm o posibilă colaborare, aveți întrebări
              suplimentare sau aveți nevoie de asistență pentru clienți?
            </p>
            <div className="contact-option">
              <div className="contact">
                <Link to="https://wa.me/40728739818" target="_blank">
                  <div className="contact-title">
                    <FontAwesomeIcon
                      icon={faWhatsapp}
                      className="contact-icon"
                    />

                    <h3>Număr de Whatsapp</h3>
                  </div>
                </Link>
              </div>

              <div className="contact">
                <Link to="https://tiktok.com/@somnolentai" target="_blank">
                  <div className="contact-title">
                    <FontAwesomeIcon icon={faTiktok} className="contact-icon" />
                    <h3>Pagină de TikTok</h3>
                  </div>
                </Link>
              </div>

              <div className="contact">
                <Link
                  to="https://www.instagram.com/somnolentai/"
                  target="_blank"
                >
                  <div className="contact-title">
                    <FontAwesomeIcon
                      icon={faInstagram}
                      className="contact-icon"
                    />
                    <h3>Pagină de Instagram</h3>
                  </div>
                </Link>
              </div>

              <div className="contact">
                <Link to="tel:+40728739818">
                  <div className="contact-title">
                    <FontAwesomeIcon icon={faPhone} className="contact-icon" />
                    <h3>Număr de telefon</h3>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="yrd">
          <Link to="https://yrd.agency">
            <p className="p-1">{"Made with <3 by Yrd.Agency"}</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
