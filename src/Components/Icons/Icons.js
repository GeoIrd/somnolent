import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse as faHouseIcon,
  faList,
  faHeart,
  faMoon,
  faRightToBracket,
  faPaperPlane,
  faTrash,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import { faHeart as halfHeart } from "@fortawesome/free-regular-svg-icons";

import "./Icons.css";
import { faGoogle, faSquareFacebook } from "@fortawesome/free-brands-svg-icons";

export const HouseIcon = () => {
  return <FontAwesomeIcon className="icon" icon={faHouseIcon} />;
};

export const ListIcon = () => {
  return <FontAwesomeIcon className="icon" icon={faList} />;
};

export const HeartIcon = () => {
  return <FontAwesomeIcon className="icon" icon={faHeart} />;
};

export const MoonIcon = () => {
  return <FontAwesomeIcon className="icon" icon={faMoon} />;
};

export const RightToBracket = () => {
  return <FontAwesomeIcon className="icon" icon={faRightToBracket} />;
};

export const PaperPlane = () => {
  return <FontAwesomeIcon className="icon" icon={faPaperPlane} />;
};

export const Facebook = () => {
  return <FontAwesomeIcon className="icon" icon={faSquareFacebook} />;
};

export const Google = () => {
  return <FontAwesomeIcon className="icon" icon={faGoogle} />;
};

export const Heart = () => {
  return <FontAwesomeIcon className="icon" icon={faHeart} />;
};

export const HalfHeart = () => {
  return <FontAwesomeIcon className="icon" icon={halfHeart} />;
};

export const Trash = () => {
  return <FontAwesomeIcon className="icon" icon={faTrash} />;
};

export const Search = () => {
  return <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />;
};
