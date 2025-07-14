import React from "react";
import Olimp from "./MotivationLetter";
import "./mletter.scss";
import HeaderContainer from "../Header/HeaderContainer";
import FooterContainer from "../Footer/FooterContainer";

export default function MotivationLetterContainer() {
  const data = {
    title: "Как написать мотивационное письмо",
    text: (
      <span>
        1. Посмотрите внимательно видео-урок
        <br />
        2. ⁠Сделайте заметки
        <br />
        3. ⁠Выполните домашнее задание
      </span>
    ),
    iframe: "https://rutube.ru/embed/1767523d49c8e60e602aa07ebebfab8a?p=H1nJfCLhdNjlLvDMfOXJ4g",
    docs: [
      {
        id: 0,
        name: "101 эссе",
        url: "https://drive.google.com/file/d/1Mxwrv-0oPhCX0-U2JwghYciubop8dKuP/view?usp=drive_link",
      },
      {
        id: 1,
        name: "Лексика: 1500 английских слов",
        url: "https://drive.google.com/file/d/1ym3_MoU1HfAuBEXG9YtjxysWbtfp8Emy/view?usp=drive_link",
      },
      {
        id: 2,
        name: '"Почему ты?" - структура идеального МП',
        url: "https://drive.google.com/file/d/1E0SbP2uVfy7CI33ou0D3JQcehuH4d3GX/view?usp=drive_link",
      },
      {
        id: 3,
        name: "Структура идеального МП",
        url: "https://drive.google.com/file/d/1JYaI145-iJlr7eHAor7fglTfdZW7z4Qj/view?usp=drive_link",
      },
      {
        id: 4,
        name: "Чек-вопросов для МП",
        url: "https://drive.google.com/file/d/1jgSk6_hM6bc62eDgYp6-en2wrOod8PvM/view?usp=drive_link",
      },
    ],
    requirements: "Требования к письму",
    requirementsText: (
      <span>
        • Объем письма: ≈400 слов.
        <br />• Вы можете писать как на русском, так и на английском языке, в зависимости от того, на каком языке вам
        комфортнее выражать свои мысли и на какое отделение вы поступаете.
        <br />
        <br />
        Ждем ваших писем и желаем удачи!
      </span>
    ),
    howWriteText: "Презентация со встречи",
    howIframe: "https://rutube.ru/embed/71c4ba062cfe0b3a53a1f631db5e243f?p=bXBx-_YjCWhsFmFqITbmxg",
    carousel: {
      title: "Презентация со встречи",
      items: [
        { id: 0, link: "1.jpg" },
        { id: 1, link: "2.jpg" },
        { id: 2, link: "3.jpg" },
        { id: 3, link: "4.jpg" },
        { id: 4, link: "5.jpg" },
        { id: 5, link: "6.jpg" },
        { id: 6, link: "7.jpg" },
        { id: 7, link: "8.jpg" },
        { id: 8, link: "9.jpg" },
        { id: 9, link: "10.jpg" },
        { id: 10, link: "11.jpg" },
      ],
    },
    carouselSecond: {
      title: "Примеры мотивационных писем",
      items: [
        { id: 0, link: "1.png" },
        { id: 1, link: "2.png" },
        { id: 2, link: "3.png" },
        { id: 3, link: "4.png" },
        { id: 4, link: "5.png" },
        { id: 5, link: "6.png" },
      ],
    },
  };

  return (
    <div>
      <HeaderContainer />
      <Olimp data={data} />
      <FooterContainer />
    </div>
  );
}
