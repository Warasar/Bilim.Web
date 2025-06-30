import React from "react";
import Header from "./Header";
import "./header.scss";

export default function HeaderContainer() {
  const data = {
    buttons: [
      {
        name: "Главное",
        code: "1",
        link: "",
      },
      {
        name: "Онлайн-профтур",
        code: "2",
        link: "vuz",
      },
      {
        name: "Подготовка к олимпиадам",
        code: "3",
        link: "sduolimp",
      },
    ],
  };

  return <Header data={data} />;
}
