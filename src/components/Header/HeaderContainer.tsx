import React from "react";
import Header from "./Header";
import "./header.scss";

type Props = {
  whiteBg?: boolean;
};

export default function HeaderContainer({ whiteBg }: Props) {
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
        link: "olimp",
      },
    ],
    phoneLink: "https://wa.me/79963163149?text=",
    user: {
      role: "admin",
      name: "admin",
      mail: "admin.test@mail.ru",
    },
    groups: [
      {
        code: "sopr2025",
        name: "Сопровождение 2025",
        link: "",
      },
      {
        code: "group1",
        name: "1 группа",
        link: "group1",
      },
      {
        code: "group2",
        name: "2 группа",
        link: "group2",
      },
      {
        code: "intensive",
        name: "Группа ИНТЕНСИВ",
        link: "intensive",
      },
    ],
  };

  return <Header data={data} whiteBg={whiteBg} />;
}
