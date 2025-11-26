import React, { useEffect, useState } from "react";
import "./olimpvuz.scss";
import HeaderContainer from "../Header/HeaderContainer";
import FooterContainer from "../Footer/FooterContainer";
import OlimpVuz from "./OlimpVuz";
import { useParams } from "react-router";
import Loader from "../../modules/YaKIT.WEB.KIT/components/Loader/Loader";
import { useCurrentUser } from "../../hooks/useCurrentUser";

export default function OlimpVuzContainer() {
  const [data, setData] = useState<any>(null);
  const { code } = useParams();

  useCurrentUser();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const newData: any = [
      {
        code: "sdu",
        dop_title: "Олимпиада ISPT от университета SDU",
        dop_subtitle: (
          <span>
            На 2025 год неизвестны даты, условия участия в олимпиаде. <br />
            Как только информация появится, мы вам сообщим. Следите за обновлениями. <br />
            Ниже вы найдете разбор двух вариантов теста олимпиады ISPT за 2024 год, а также запись и презентацию со
            встречи с представителем университета SDU.
          </span>
        ),
        title: "Разбор 2 вариантов теста олимпиады SDU (ISPT) за 2024 год",
        subtitle: (
          <span>
            Ниже вы найдете записи уроков/встреч, где мы разобрали сразу два варианта тестов, обе части - английский
            язык и математика-логика.
            <br />
            Также вы можете скачать файлы с готовыми ответами.
          </span>
        ),
        docs: [
          {
            id: 0,
            name: "Вариант 385",
            url: "https://drive.google.com/file/d/1Ez0nC3wqFp_XQcLgR4lI0Ob0KmZYleEA/view?usp=drive_link",
          },
          {
            id: 1,
            name: "Вариант 390",
            url: "https://drive.google.com/file/d/1Q5wlslKXZIIpy_PxGculj9mClj5THmZb/view?usp=drive_link",
          },
        ],
        videos: [
          {
            id: 0,
            title: "Эксперт Зухра - Вариант 390",
            subtitle: "Разбор части по английскому языку",
            name: "Англ. язык - 390 вариант",
            iframe: "https://rutube.ru/embed/0b7e2f8c1fb6959b74ac84c909111f0e?p=8idRz29y41uqZiNuHEopcQ",
            docs: [
              {
                id: 0,
                name: "Презентация урока",
                url: "https://drive.google.com/file/d/1GNLuBDXeyc_f2donyb9jKWMAW_EIdV0r/view?usp=sharing",
              },
              {
                id: 1,
                name: "Ответы части АНГЛИЙСКОГО языка варианта 390",
                url: "https://drive.google.com/file/d/1GNLuBDXeyc_f2donyb9jKWMAW_EIdV0r/view?usp=sharing",
              },
            ],
          },
          {
            id: 1,
            title: "Эксперт Зухра - Вариант 385",
            subtitle: "Разбор части по английскому языку",
            name: "Англ. язык - 385 вариант",
            iframe: "https://rutube.ru/embed/6dd37fe11b947308fb9fe9797cf5e632?p=MuaiJvw3g0AYLEzGZ70AzQ",
            docs: [
              {
                id: 0,
                name: "Ответы части АНГЛИЙСКОГО языка варианта 385",
                url: "https://drive.google.com/file/d/1GNLuBDXeyc_f2donyb9jKWMAW_EIdV0r/view?usp=sharing",
              },
            ],
          },
          {
            id: 2,
            title: "Эксперт Сандал - Вариант 385",
            subtitle: "Разбор части по математике-логике",
            name: "Математика - 385 вариант",
            iframe: "https://rutube.ru/embed/41d20e34c85383f87b2325554689bcaa?p=M7RNHt7KwPSm5bs4DH-RFg",
            docs: [
              {
                id: 0,
                name: "Ответы части по МАТЕМАТИКЕ-ЛОГИКЕ вариант 385",
                url: "https://drive.google.com/file/d/1K_wKkWO5_Z_R1fqXZICu8iDywjHbnLds/view?usp=drive_link",
              },
            ],
          },
          {
            id: 3,
            title: "Эксперт Сандал - Вариант 390",
            subtitle: "Разбор части по математике-логике",
            name: "Математика - 390 вариант",
            iframe: "https://rutube.ru/embed/e061b9ee7ee4500545acb1893c2ea877?p=6pUHuEDjuTFqmnVBKu3yWA",
            docs: [
              {
                id: 0,
                name: "Ответы части по МАТЕМАТИКЕ-ЛОГИКЕ вариант 390",
                url: "https://drive.google.com/file/d/1pW9do4RpH1W12kCO2gBlLklJRtSJu8jV/view?usp=drive_link",
              },
            ],
          },
        ],
        meeting: {
          name: "Встреча с представителем университета SDU",
          iframe: "https://rutube.ru/embed/0b4b7ebe05dc70fbc916c294769f19e8?p=O4ps6IGbJYJzZxn0FitW5A",
        },
        carousel: {
          title: "Ответы на вопросы и презентация со встречи с представителем университета SDU",
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
            { id: 11, link: "12.jpg" },
            { id: 12, link: "13.jpg" },
            { id: 13, link: "14.jpg" },
            { id: 14, link: "15.jpg" },
            { id: 15, link: "16.jpg" },
            { id: 16, link: "17.jpg" },
            { id: 17, link: "18.jpg" },
            { id: 18, link: "19.jpg" },
            { id: 19, link: "20.jpg" },
            { id: 20, link: "21.jpg" },
            { id: 21, link: "22.jpg" },
            { id: 22, link: "23.jpg" },
            { id: 23, link: "24.jpg" },
          ],
        },
      },
      {
        code: "turan",
        dop_title: null,
        dop_subtitle: null,
        title: "Условия олимпиады на грант от университета TURAN",
        subtitle: (
          <span>
            Ниже вы найдете записи уроков/встреч, где мы разобрали сразу два варианта тестов, обе части - английский
            язык и математика-логика.
            <br />
            Также вы можете скачать файлы с готовыми ответами.
          </span>
        ),
        docs: [
          {
            id: 0,
            name: "Вариант 385",
            url: "https://drive.google.com/file/d/1Ez0nC3wqFp_XQcLgR4lI0Ob0KmZYleEA/view?usp=drive_link",
          },
          {
            id: 1,
            name: "Вариант 390",
            url: "https://drive.google.com/file/d/1Q5wlslKXZIIpy_PxGculj9mClj5THmZb/view?usp=drive_link",
          },
        ],
        videos: [
          {
            id: 0,
            title: "Эксперт Зухра - Вариант 390",
            subtitle: "Разбор части по английскому языку",
            name: "Англ. язык - 390 вариант",
            iframe: "https://rutube.ru/embed/0b7e2f8c1fb6959b74ac84c909111f0e?p=8idRz29y41uqZiNuHEopcQ",
            docs: [
              {
                id: 0,
                name: "Презентация урока",
                url: "https://drive.google.com/file/d/1GNLuBDXeyc_f2donyb9jKWMAW_EIdV0r/view?usp=sharing",
              },
              {
                id: 1,
                name: "Ответы части АНГЛИЙСКОГО языка варианта 390",
                url: "https://drive.google.com/file/d/1GNLuBDXeyc_f2donyb9jKWMAW_EIdV0r/view?usp=sharing",
              },
            ],
          },
          {
            id: 1,
            title: "Эксперт Зухра - Вариант 385",
            subtitle: "Разбор части по английскому языку",
            name: "Англ. язык - 385 вариант",
            iframe: "https://rutube.ru/embed/6dd37fe11b947308fb9fe9797cf5e632?p=MuaiJvw3g0AYLEzGZ70AzQ",
            docs: [
              {
                id: 0,
                name: "Ответы части АНГЛИЙСКОГО языка варианта 385",
                url: "https://drive.google.com/file/d/1GNLuBDXeyc_f2donyb9jKWMAW_EIdV0r/view?usp=sharing",
              },
            ],
          },
          {
            id: 2,
            title: "Эксперт Сандал - Вариант 385",
            subtitle: "Разбор части по математике-логике",
            name: "Математика - 385 вариант",
            iframe: "https://rutube.ru/embed/41d20e34c85383f87b2325554689bcaa?p=M7RNHt7KwPSm5bs4DH-RFg",
            docs: [
              {
                id: 0,
                name: "Ответы части по МАТЕМАТИКЕ-ЛОГИКЕ вариант 385",
                url: "https://drive.google.com/file/d/1K_wKkWO5_Z_R1fqXZICu8iDywjHbnLds/view?usp=drive_link",
              },
            ],
          },
          {
            id: 3,
            title: "Эксперт Сандал - Вариант 390",
            subtitle: "Разбор части по математике-логике",
            name: "Математика - 390 вариант",
            iframe: "https://rutube.ru/embed/e061b9ee7ee4500545acb1893c2ea877?p=6pUHuEDjuTFqmnVBKu3yWA",
            docs: [
              {
                id: 0,
                name: "Ответы части по МАТЕМАТИКЕ-ЛОГИКЕ вариант 390",
                url: "https://drive.google.com/file/d/1pW9do4RpH1W12kCO2gBlLklJRtSJu8jV/view?usp=drive_link",
              },
            ],
          },
        ],
        meeting: null,
        carousel: null,
      },
    ];

    setData(newData);
  };

  return (
    <div>
      <HeaderContainer />
      {data?.length ? (
        <OlimpVuz findData={data.find((f: any) => f.code === code)} />
      ) : (
        <div className="loading">
          <Loader absolute />
        </div>
      )}
      <FooterContainer />
    </div>
  );
}
