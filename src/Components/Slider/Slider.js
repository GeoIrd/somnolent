import React from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import "./SimpleSlider.css";

const reviews = [
  {
    name: "Andrei Popescu",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    review:
      "Somnolentai m-a ajutat să înțeleg visele mele într-un mod cu totul nou!",
  },
  {
    name: "Maria Ionescu",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    review:
      "Incredibil cât de precisă este interpretarea! Am rămas uimită de acuratețea viselor mele.",
  },
  {
    name: "Alexandru Dobre",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    review:
      "O experiență cu adevărat fascinantă! Recomand Somnolentai tuturor!",
  },
  {
    name: "Ioana Georgescu",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    review:
      "Nu am crezut că visele mele ascund atâtea semnificații până nu am folosit această aplicație.",
  },
  {
    name: "Radu Mihai",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    review:
      "Aplicația este simplu de folosit și oferă interpretări extrem de detaliate.",
  },
  {
    name: "Elena Rusu",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    review:
      "Un instrument excelent pentru a descifra semnificațiile viselor. Îmi place foarte mult!",
  },
  {
    name: "Cristina Popa",
    image: "https://randomuser.me/api/portraits/women/7.jpg",
    review:
      "Mă simt mult mai conectată la subconștientul meu după ce folosesc Somnolentai.",
  },
  {
    name: "Mihai Stan",
    image: "https://randomuser.me/api/portraits/men/8.jpg",
    review: "Recomand cu căldură Somnolentai! Este o aplicație revoluționară.",
  },
  {
    name: "Ana Tudor",
    image: "https://randomuser.me/api/portraits/women/9.jpg",
    review:
      "Interfața este intuitivă, iar rezultatele sunt foarte precise. Excelentă aplicație!",
  },
  {
    name: "George Vasilescu",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
    review:
      "Somnolentai a schimbat complet felul în care îmi interpretez visele. Este uimitor!",
  },
];

export default function SimpleSlider() {
  var settings = {
    dots: true, // Afișează punctele de navigare
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Activează autoplay
    autoplaySpeed: 5000, // Setează viteza de autoplay la 3 secunde
  };

  return (
    <Slider {...settings}>
      {reviews.map((review, index) => (
        <div key={index} className="review-card">
          <img src={review.image} alt={review.name} className="review-image" />
          <h3 className="review-name">{review.name}</h3>
          <p className="review-text">
            <FontAwesomeIcon icon={faQuoteLeft} className="quote-left" />
            {review.review}
            <FontAwesomeIcon icon={faQuoteRight} className="quote-right" />
          </p>
        </div>
      ))}
    </Slider>
  );
}
