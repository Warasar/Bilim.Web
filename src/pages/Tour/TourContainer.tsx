import React, { useEffect, useState } from "react";
import Tour from "./Tour";
import "./tour.scss";
import TourHeader from "../../components/Tour/TourHeader";
import { requestGet, requestPost } from "../../actions/actions";
import { message } from "antd";
import Loader from "../../modules/YaKIT.WEB.KIT/components/Loader/Loader";

export type ITerms = {
  short: string;
  long: string;
};

export default function TourContainer() {
  const [data, setData] = useState<any>(null);
  const [terms, setTerms] = useState<ITerms>({
    short: "",
    long: "",
  });
  const [dataFooter, setDataFooter] = useState<any>(null);
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoader(true);

    const terms: ITerms = {
      short: "",
      long: "",
    };

    const terms1 = await requestGet(`terms/1`);
    if (terms1?.items?.data?.length) {
      terms.short = terms1.items.data;
    }

    const terms2 = await requestGet(`terms/2`);
    if (terms2?.items?.data?.length) {
      terms.long = terms2.items.data;
    }

    const newData = {
      title: "Подготовка к олимпиадам",
    };

    const newDataFooter = {
      icons: [
        {
          id: 5,
          dataType: "object",
          code: "footer_phone",
          ord: 10,
          isVisible: true,
          link: "tel:8(996)-316-31-49",
        },
        {
          id: 6,
          dataType: "object",
          code: "footer_mail",
          ord: 20,
          isVisible: true,
          link: "mailto:bilimsakhakz@gmail.com",
        },
        {
          id: 7,
          dataType: "object",
          code: "footer_telegram",
          ord: 30,
          isVisible: true,
          link: "https://t.me/bilim_sakha_kz",
        },
      ],
      data: [
        {
          id: 12,
          dataType: "object",
          code: "contacts",
          ord: 20,
          isVisible: true,
          name: "Контакты",
          items: [
            {
              id: 13,
              dataType: "object",
              code: "address",
              ord: 20,
              isVisible: true,
              name: "Ленина 17, 3 этаж, 317 кабинет",
              link: "https://go.2gis.com/aF3vy",
              parentId: 12,
              icon: "locationFooter",
            },
            {
              id: 14,
              dataType: "object",
              code: "mail",
              ord: 30,
              isVisible: true,
              name: "bilimsakhakz@gmail.com",
              link: "mailto:bilimsakhakz@gmail.com",
              parentId: 12,
              icon: "mailFooter",
            },
            {
              id: 15,
              dataType: "object",
              code: "phone",
              ord: 40,
              isVisible: true,
              name: "+7(996)-316-31-49",
              link: "tel:8(996)-316-31-49",
              parentId: 12,
              icon: "phoneFooter",
            },
          ],
        },
      ],
      map: {
        id: 67,
        dataType: "object",
        ord: 35,
        isVisible: true,
        link: "https://yandex.ru/map-widget/v1/?um=constructor%3Aacd31406be142409874e9ba98a164917a66b08da8cf1d7fbbe5080c57a5bae2a&amp;source=constructor",
      },
      end: {
        id: 16,
        dataType: "object",
        ord: 10,
        isVisible: true,
        title: "ИНДИВИДУАЛЬНЫЙ ПРЕДПРИНИМАТЕЛЬ КУЗЬМИНА ДАЙААНА ВИКТОРОВНА",
        text: "© 2025 BILIM. Все права защищены.",
        items: [
          {
            id: 17,
            dataType: "object",
            code: "inn",
            ord: 20,
            isVisible: true,
            text: "ИНН: 142702654743",
            parentId: 16,
          },
          {
            id: 18,
            dataType: "object",
            code: "ogrnip",
            ord: 30,
            isVisible: true,
            text: "ОГРНИП: 323140000042525",
            parentId: 16,
          },
        ],
      },
      subtitle: {
        id: 72,
        dataType: "object",
        ord: 10,
        isVisible: true,
        text: "Профориентационные туры и поступление в университеты",
      },
    };

    setTerms(terms);
    setData(newData);
    setDataFooter(newDataFooter);
    setLoader(false);
  };

  const sendMessage = async (name: string, phone: string, mail: string) => {
    setLoader(true);

    const newMessage: any = await requestPost("application", {
      name,
      phoneNumber: phone,
      email: mail,
    });

    if (newMessage) {
      message.success("Успешно отправлено!");
    } else {
      message.error("Произошла ошибка при отправке заявки, пожайлуста попробуйте позже.");
    }

    setLoader(false);
  };

  return data ? (
    <div>
      {loader ? <Loader absolute /> : null}
      <TourHeader sendMessage={sendMessage} terms={terms} />
      <Tour data={data} dataFooter={dataFooter} sendMessage={sendMessage} terms={terms} />
    </div>
  ) : null;
}
