import React from "react";

import "./Btn.css";

const Btn = ({ children, variant }) => {
  return <button className={`btn ${variant}`}>{children}</button>;
};

export default Btn;
