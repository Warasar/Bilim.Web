import React from "react";
import Olimp from "./Olimp";
import "./olimp.scss";
import HeaderContainer from "../Header/HeaderContainer";
import FooterContainer from "../Footer/FooterContainer";

export default function OlimpContainer() {
  return (
    <div>
      <HeaderContainer />
      <Olimp />
      <FooterContainer />
    </div>
  );
}
