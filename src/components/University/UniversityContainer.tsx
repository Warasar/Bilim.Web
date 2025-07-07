import React, { useEffect, useState } from "react";
import Vuz from "./University";
import "./university.scss";
import HeaderContainer from "../Header/HeaderContainer";
import FooterContainer from "../Footer/FooterContainer";
import { useParams } from "react-router";
import Loader from "../../modules/YaKIT.WEB.KIT/components/Loader/Loader";

const className = "university";

export default function UniversityContainer() {
  const [data, setData] = useState<any>(null);
  const { code } = useParams();

  const buttons = [
    {
      code: "0",
      name: "Назад",
      link: "vuz",
    },
    {
      code: "1",
      name: "Факультеты",
      link: "fakultet",
      scroll: true,
    },
    {
      code: "2",
      name: "Процесс поступления",
      link: "fakultet",
      scroll: true,
    },
    {
      code: "3",
      name: "Необходимые документы",
      link: "fakultet",
      scroll: true,
    },
    {
      code: "4",
      name: "Общежитие",
      link: "fakultet",
      scroll: true,
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const newData: any = [
      {
        code: "sdu",
        iframe: "https://rutube.ru/embed/a4711d52b19a43bbc09132dca84f396b?api=1",
        name: "УНИВЕРСИТЕТ SDU",
        content: <span className={`${className}-header-left-italic`}>САХАЛАР ТО5О КАЗАХСТАНЫ ТАЛАЛЛАРЫЙ?</span>,
        fakultet: {
          title: "ФАКУЛЬТЕТЫ",
          data: [
            {
              id: 0,
              name: "Факультет BUSINESS SCHOOL",
              opened: false,
              items: [
                {
                  id: 0,
                  name: "МЕНЕДЖМЕНТ",
                  opened: false,
                  text: "Эта программа дает студентам фундаментальные знания о бизнесе и общем менеджменте. Вы получите углубленные знания и понимание широкого спектра дисциплин, от микроэкономики и анализа данных, до управленческого учета и стратегии, а также широкий обзор предпринимательского дела, что поможет Вам начать и преуспеть в продвижении своей карьеры в том направлении, которое Вы пожелаете. Вы получите глобальную перспективу в управлении предприятиями. Сфокусируете свое обучение на международных аспектах бизнес-стратегий и применении структурного подхода к формулированию успешных стратегий в сложных условиях.",
                  price: "Стоимость обучения за год - 6 000 долларов",
                },
              ],
            },
          ],
        },
      },
    ];

    setData(newData);
  };

  return (
    <div>
      <HeaderContainer buttons={buttons} />
      {data ? (
        <Vuz findData={data.find((f: any) => f.code === code)} className={className} />
      ) : (
        <div className="loading">
          <Loader absolute />
        </div>
      )}
      <FooterContainer />
    </div>
  );
}
