import React, { useEffect } from "react";
import Vuz from "./Vuz";
import "./vuz.scss";
import HeaderContainer from "../Header/HeaderContainer";
import FooterContainer from "../Footer/FooterContainer";
import { requestGet } from "../../actions/actions";

export default function VuzContainer() {
  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    const currentUser = await requestGet(`currentUser`);
    console.log(currentUser);
  };

  const data = {
    iframe: "https://rutube.ru/embed/f447f39ac48444442bdf436c9a9c2eb0?p=AYHTgIum8M0TdfM23jtYpg?api=1",
    timings: [
      {
        id: 0,
        time: "00:00",
        text: "тизер",
        second: 0,
      },
      {
        id: 1,
        time: "00:30",
        text: "начало",
        second: 30,
      },
      {
        id: 2,
        time: "03:06",
        text: "Анжелика Цой, студентка SDU, программа Foundation",
        second: 186,
      },
      {
        id: 3,
        time: "03:55",
        text: "Эрчимэн Пахомов, студент SDU, программа Foundation",
        second: 235,
      },
      {
        id: 4,
        time: "05:39",
        text: "Юрий Григорьев, студент 1 курса SDU, направление «Журналистика»",
        second: 339,
      },
      {
        id: 5,
        time: "06:56",
        text: "Никита Попов, студент 1 курса UIB, направление «Бизнес администрирование»",
        second: 416,
      },
      {
        id: 6,
        time: "08:44",
        text: "Когда образовался Билим?",
        second: 524,
      },
      {
        id: 7,
        time: "15:23",
        text: "Университет UIB - Университет Международного бизнеса",
        second: 923,
        bold: true,
      },
      {
        id: 8,
        time: "21:25",
        text: "Нарыйа Константинова, студентка 1 курса UIB, направление «Менеджмент»",
        second: 1285,
      },
      {
        id: 9,
        time: "22:41",
        text: "Уруйдаан Баишев, студент 1 курсa UIB, направление «Маркетинг в цифровой экономике»",
        second: 1361,
      },
      {
        id: 10,
        time: "23:27",
        text: "Уйгун Прокопьев, студент 1 курса UIB, направление «Бизнес администрирование»",
        second: 1407,
      },
      {
        id: 11,
        time: "27:05",
        text: "Лучшие условия для детей",
        second: 1625,
      },
      {
        id: 12,
        time: "28:37",
        text: "КБТУ - Казахстанско-Британский Технический университет",
        second: 1717,
        bold: true,
      },
      {
        id: 13,
        time: "36:33",
        text: "Павел Строев, студент 1 курса КБТУ, направление «Вычислительная техника и программное обеспечение»",
        second: 2193,
      },
      {
        id: 14,
        time: "38:02",
        text: "Алексей Харитонов, студент 1 курса КБТУ, направление «Информационные системы»",
        second: 2282,
      },
      {
        id: 15,
        time: "38:29",
        text: "Кэскил Ефимов, студент 1 курса КБТУ, направление «Информационные системы»",
        second: 2309,
      },
      {
        id: 16,
        time: "44:56",
        text: "Виктория Ноева, студентка 1 курса КБТУ, направление «Химическая инженерия»",
        second: 2696,
      },
      {
        id: 17,
        time: "47:04",
        text: "Услуга «Сопровождение»",
        second: 2824,
      },
      {
        id: 18,
        time: "49:44",
        text: "Университет NARXOZ",
        second: 2984,
        bold: true,
      },
      {
        id: 19,
        time: "54:26",
        text: "Айман Искакова, начальник отдела по работе с иностранными студентами и преподавателями университета NARXOZ",
        second: 3266,
      },
      {
        id: 20,
        time: "57:56",
        text: "Николай Артемьев, основатель проекта TYL GLOBAL",
        second: 3476,
      },
      {
        id: 21,
        time: "01:00:05",
        text: "Комрон, координатор иностранных студентов университета NARXOZ",
        second: 3605,
      },
      {
        id: 22,
        time: "01:04:24",
        text: "Роксана Егорова, студентка 1 курса NARXOZ, направление «Международные отношения»",
        second: 3864,
      },
      {
        id: 23,
        time: "01:04:55",
        text: "Ньургустан Софронов, студент 1 курса NARXOZ, направление «Международные отношения», Айсен Винокуров, студент 1 курса NARXOZ, направление «Digital engineering»",
        second: 3895,
      },
      {
        id: 24,
        time: "01:08:35",
        text: "Лагерь по направлениям IT и английскому языку",
        second: 4115,
      },
      {
        id: 25,
        time: "01:09:51",
        text: "КазНИТУ - Казахский Национальный Исследовательский технический университет им. М.К. Сатпаева",
        second: 4191,
        bold: true,
      },
      {
        id: 26,
        time: "01:12:30",
        text: "Димаш, студент университета КазНИТУ",
        second: 4350,
      },
      {
        id: 27,
        time: "01:13:36",
        text: "София Ефремова, студентка 1 курса КазНИТУ, направление «Дизайн»",
        second: 4416,
      },
      {
        id: 28,
        time: "01:15:15",
        text: "Марс Нарбаев, директор приемной комиссии КазНИТУ",
        second: 4515,
      },
      {
        id: 29,
        time: "01:21:04",
        text: "Онлайн Профтур",
        second: 4864,
      },
      {
        id: 30,
        time: "01:22:34",
        text: "Университет SDU",
        second: 4954,
        bold: true,
      },
      {
        id: 31,
        time: "01:24:24",
        text: "Бейбыт Дюсупов, директор отдела международных отношений SDU",
        second: 5064,
      },
      {
        id: 32,
        time: "01:26:10",
        text: "Дайаана Турантаева, студентка 1 курса SDU, направление «2 иностранных языка»",
        second: 5170,
      },
      {
        id: 33,
        time: "01:30:17",
        text: "Камила Калачева, студентка SDU, программа Foundation",
        second: 5417,
      },
      {
        id: 34,
        time: "01:31:06",
        text: "Победители Олимпиады SDU",
        second: 5466,
      },
      {
        id: 35,
        time: "01:31:15",
        text: "Тимур Ильин, выиграл 50% скидку, студент 1 курса SDU, направление «Переводческое дело»",
        second: 5475,
      },
      {
        id: 36,
        time: "01:31:38",
        text: "Владислав Иванов, выиграл 100% грант, студент 1 курса SDU, направление «Computer Science»",
        second: 5498,
      },
      {
        id: 37,
        time: "01:31:54",
        text: "Тимур Петров, выиграл 100% грант, студент 1 курса SDU, направление «Computer Science»",
        second: 5514,
      },
      {
        id: 38,
        time: "01:34:32",
        text: "Надя Брик, родитель студента UIB",
        second: 5672,
      },
      {
        id: 39,
        time: "01:38:37",
        text: "Концовка",
        second: 5917,
      },
    ],
    text: "Вас ждет 14 видеообзоров лучших университетов города Алматы и 1 Международный университет Туркестана. Здесь вы найдете всю важную информацию - видео-обзоры университетов, направления и специальности, процесс поступления, стоимость обучения, информация по общежитию. Нажмите на интересующий вас ВУЗ и вы найдете все необходимые материалы.",
    vuzes: [
      {
        code: "sdu",
        nameShort: "SDU",
        name: "Сулейман Демирел Университет",
        photo: "sdu.jpg",
      },
      {
        code: "atu",
        nameShort: "ATU",
        name: "Алматинский Технологический Университет",
        photo: "atu.jpg",
      },
      {
        code: "kbtu",
        nameShort: "КБТУ",
        name: "Казахстанско-Британский Технологический Университет",
        photo: "kbtu.jpg",
      },
      {
        code: "narxoz",
        nameShort: "НАРХОЗ",
        name: "НАРХОЗ Университет",
        photo: "narxoz.png",
      },
      {
        code: "etu",
        nameShort: "ЕТУ",
        name: "Евразийский Технический Университет",
        photo: "etu.jpg",
      },
      {
        code: "kimep",
        nameShort: "КИМЭП",
        name: "Евразийский Технический Университет",
        photo: "kimep.jpg",
      },
      {
        code: "caspianuniversity",
        nameShort: "Caspian University",
        name: "Каспийский Университет",
        photo: "caspianuniversity.jpg",
      },
      {
        code: "almau",
        nameShort: "AlmaU",
        name: "Алматы Менеджмент Университет",
        photo: "almau.jpg",
      },
      {
        code: "turan",
        nameShort: "ТУРАН",
        name: "Туран Университет",
        photo: "turan.jpg",
      },
      {
        code: "kaznitu",
        nameShort: "КазНИТУ",
        name: "Казахский Национальный Исследовательский Технический университет им. К.И.Сатпаева",
        photo: "kaznitu.jpg",
      },
      {
        code: "kazgasa",
        nameShort: "КазГАСА",
        name: "Казахская Головная Архитектурно-Строительная Академия",
        photo: "kazgasa.jpg",
      },
      {
        code: "kaznmu",
        nameShort: "КазНМУ",
        name: "Казахский Национальный Медицинский Университет",
        photo: "kaznmu.jpg",
      },
      {
        code: "muit",
        nameShort: "МУИТ",
        name: "Международный Университет Информационных Технологий",
        photo: "muit.jpg",
      },
      {
        code: "uib",
        nameShort: "UIB",
        name: "Университет Международного Бизнеса",
        photo: "uib.jpg",
      },
      {
        code: "mktu",
        nameShort: "МКТУ",
        name: "Международный Казахско-Турецкий Университет им. Х.А.Ясави",
        photo: "mktu.jpeg",
      },
    ],
  };

  return (
    <div>
      <HeaderContainer />
      <Vuz data={data} />
      <FooterContainer />
    </div>
  );
}
