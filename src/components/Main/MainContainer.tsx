import React, { Fragment } from "react";
import Main from "./Main";
import "./main.scss";
import HeaderContainer from "../Header/HeaderContainer";
import CalendarContainer from "../Calendar/CalendarContainer";
import CarouselContainer from "../Carousel/CarouselContainer";
import FooterContainer from "../Footer/FooterContainer";

export default function MainContainer() {
  const data = {
    title1: "Сопровождение",
    title2: "по поступлению",
    title3: "в казахстан",
    text: "Здесь вы найдёте все важные уроки, которые помогут с поступлением — от выбора вуза до подготовки к экзаменам",
    welcome: "Добро пожаловать на сайт «Билим»",
    buttons: [
      {
        code: "1",
        name: "Онлайн-профтур",
        link: "",
        icon: "users",
        text: "Виртуальные экскурсии по университетам и знакомство с программами обучения",
      },
      {
        code: "2",
        name: "Мотивационное письмо",
        link: "",
        icon: "message",
        text: "Помощь в написании убедительных мотивационных писем для поступления",
      },
      {
        code: "3",
        name: "Подготовка к олимпиадам",
        link: "",
        icon: "cup",
        text: "Интенсивная подготовка к предметным олимпиадам и конкурсам",
      },
    ],
  };

  return (
    <Fragment>
      <HeaderContainer />
      <Main data={data} />
      <CalendarContainer />
      <CarouselContainer />
      <FooterContainer />
    </Fragment>
  );
}
