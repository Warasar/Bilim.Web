import React from "react";
import Vuz from "./Vuz";
import "./vuz.scss";
import HeaderContainer from "../Header/HeaderContainer";
import FooterContainer from "../Footer/FooterContainer";

export default function VuzContainer() {
  return (
    <div>
      <HeaderContainer />
      <Vuz />
      <FooterContainer />
    </div>
  );
}
