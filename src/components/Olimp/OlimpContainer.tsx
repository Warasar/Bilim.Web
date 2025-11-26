import React from "react";
import Olimp from "./Olimp";
import "./olimp.scss";
import HeaderContainer from "../Header/HeaderContainer";
import FooterContainer from "../Footer/FooterContainer";
import { useCurrentUser } from "../../hooks/useCurrentUser";

export default function OlimpContainer() {
  useCurrentUser();

  const data = {
    title: "Подготовка к олимпиадам",
    spisok: [
      {
        id: 0,
        name: "SDU",
        link: "sdu",
      },
      {
        id: 1,
        name: "ТУРАН",
        link: "turan",
      },
      {
        id: 2,
        name: "AlmaU",
        link: "almau",
      },
      {
        id: 3,
        name: "NARXOZ",
        link: "narxoz",
      },
      {
        id: 4,
        name: "KBTU",
        link: "kbtu",
      },
      {
        id: 5,
        name: "Caspian University",
        link: "caspainuniversity",
      },
      {
        id: 6,
        name: "Nazarbaev University",
        link: "nazarbaevuniversity",
      },
      {
        id: 7,
        name: "UIB",
        link: "uib",
      },
    ],
    carousel: {
      title: "ОБЩАЯ ПРЕЗЕНТАЦИЯ ПО ВСЕМ КОНКУРСАМ НА ГРАНТ 2025 год",
      items: [
        { id: 0, link: "1.png" },
        { id: 1, link: "2.png" },
        { id: 2, link: "3.png" },
        { id: 3, link: "4.png" },
        { id: 4, link: "5.png" },
        { id: 5, link: "6.png" },
        { id: 6, link: "7.png" },
        { id: 7, link: "8.png" },
        { id: 8, link: "9.png" },
        { id: 9, link: "10.png" },
        { id: 10, link: "11.png" },
        { id: 11, link: "12.png" },
        { id: 12, link: "13.png" },
        { id: 13, link: "14.png" },
        { id: 14, link: "15.png" },
        { id: 15, link: "16.png" },
        { id: 16, link: "17.png" },
        { id: 17, link: "18.png" },
        { id: 18, link: "19.png" },
        { id: 19, link: "20.png" },
        { id: 20, link: "21.png" },
        { id: 21, link: "22.png" },
        { id: 22, link: "23.png" },
        { id: 23, link: "24.png" },
        { id: 24, link: "25.png" },
      ],
    },
    videos: [
      {
        id: 0,
        title: "Видео со встречи",
        subtitle: '"ВСЕ КОНКУРСЫ/ОЛИМПИАДЫ НА ГРАНТ НА 2025 ГОД"',
        name: "Конкурсы на грант",
        text: (
          <span>
            <b>Здесь мы разобрали:</b>
            <br />● в каких университетах проводятся конкурсы
            <br />● даты подачи заявок
            <br />● условия конкурсов
          </span>
        ),
        iframe: "https://rutube.ru/embed/d433723b7c4217d3467fb64445f3d66c?p=opwCjfR8au6uYrQ_yEXWNQ",
      },
      {
        id: 1,
        title: "Видео со встречи",
        subtitle: '"СТИПЕНДИАЛЬНАЯ ПРОГРАММА 2025"',
        name: "Стипендиальная программа",
        text: (
          <span>
            Стипендиальная программа болонского процесса - большой <br /> правительственный конкурс на 100% гранты для
            всех иностранцев. <br /> Участвует множество вузов-партнеров.
          </span>
        ),
        iframe: "https://rutube.ru/embed/3b89bce4688529abd5f9211940bb4298?p=VBedb5mjM26RUVpykjSxpg",
      },
      {
        id: 2,
        title: "Видео-урок по собеседованию",
        subtitle: '"УРОК СОБЕСЕДОВАНИЕ 2025"',
        name: "Видео по собеседованию",
        text: (
          <span>
            Домашнее задание:
            <br />
            подготовьте свои ответы на предложенные вопросы
            <br />
            (не обращайте внимание на дз в видео/презентации)
          </span>
        ),
        iframe: "https://rutube.ru/embed/171d13992ad1ff9a23e2075a14622212?p=JdZ9Fp3SAD6XpkGod_whQg",
      },
    ],
    docs: [
      {
        id: 0,
        name: "Презентация стипендиальная программа",
        url: "https://drive.google.com/file/d/1iExWYNxA60XBr8N_bWtZk4ZtDukebuRg/view?usp=drive_link",
      },
      {
        id: 1,
        name: "Примеры мотивационного письма",
        url: "https://drive.google.com/file/d/1d21ALOR3b46RMMdZfAR9kYfHQgKHUJ1s/view?usp=drive_link",
      },
      {
        id: 2,
        name: "Рекомендательное письмо",
        url: "https://drive.google.com/file/d/1xLBIsu9gN4CoKLnVIbvTT6H6WFPw2SKL/view?usp=drive_link",
      },
      {
        id: 3,
        name: "Презентация собеседование",
        url: "https://drive.google.com/file/d/1nBpRrksFJVQYKVlPTqPUdnORCNFSdAWW/view?usp=drive_link",
      },
      {
        id: 4,
        name: "Банк вопросов по собеседованию",
        url: "https://drive.google.com/file/d/1CeNhlL-ilxP7d4bVl0-fbSMpHLreKlAm/view?usp=drive_link",
      },
      {
        id: 5,
        name: "Стандарты форматирования документов",
        url: "https://drive.google.com/file/d/1q6p-uw5nTA9Sj3FaBNfhHASSSKppKrP6/view?usp=drive_link",
      },
    ],
  };

  return (
    <div>
      <HeaderContainer />
      <Olimp data={data} />
      <FooterContainer />
    </div>
  );
}
