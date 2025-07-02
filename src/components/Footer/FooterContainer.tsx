import React from "react";
import "./footer.scss";
import Footer from "./Footer";
import { IfooterDataMain } from "./footerType";

export default function FooterContainer() {
  const data: IfooterDataMain = {
    subtitle: "Профориентационные туры и поступления в университет",
    icons: [
      {
        code: "phone",
        link: "tel:8(996)-316-31-49",
      },
      {
        code: "mail",
        link: "mailto:bilimsakhakz@gmail.com",
      },
      {
        code: "telegram",
        link: "https://t.me/bilim_sakha_kz",
      },
    ],
    data: [
      {
        code: "service",
        name: "Наши услуги",
        items: [
          {
            code: "proftur",
            name: "Онлайн-профтур",
            link: "vuz",
            icon: null,
          },
          {
            code: "letter",
            name: "Мотивационное письмо",
            link: "motivation_letter",
            icon: null,
          },
          {
            code: "olimp",
            name: "Подготовка к олимпиадам",
            link: "olimp",
            icon: null,
          },
        ],
      },
      {
        code: "contacts",
        name: "Контакты",
        items: [
          {
            code: "address",
            name: "Ленина 17, 3 этаж, 317 кабинет",
            link: "https://go.2gis.com/aF3vy",
            icon: null,
          },
          {
            code: "mail",
            name: "bilimsakhakz@gmail.com",
            link: "mailto:bilimsakhakz@gmail.com",
            icon: null,
          },
          {
            code: "phone",
            name: "+7(996)-316-31-49",
            link: "tel:8(996)-316-31-49",
            icon: null,
          },
        ],
      },
    ],
    map: "https://yandex.ru/map-widget/v1/?um=constructor%3Aacd31406be142409874e9ba98a164917a66b08da8cf1d7fbbe5080c57a5bae2a&amp;source=constructor",
    end: {
      title: "ИНДИВИДУАЛЬНЫЙ ПРЕДПРИНИМАТЕЛЬ КУЗЬМИНА ДАЙАНА ВИКТОРОВНА",
      info: [
        {
          code: "inn",
          text: "ИНН: 142702654743",
        },
        {
          code: "ogrnip",
          text: "ОГРНИП: 323140000042525",
        },
      ],
      text: "© 2025 BILIM. Все права защищены.",
    },
  };

  return <Footer data={data} />;
}
