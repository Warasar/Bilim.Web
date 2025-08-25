import React from "react";
import Typewriter from "typewriter-effect";

type Props = {
  data: any;
};

export default function Tour({ data }: Props) {
  const scrollFunc = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  const goToPrice = () => {
    const element = document.getElementById(`tour-price`);

    if (element) {
      window.scrollTo({
        top: element.offsetTop - 24,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="tour">
      <div className={`tour-container`}>
        <div className="tour-centered">
          <div className={`tour-main`}>
            <div className="tour-main-item">
              <div className="tour-main-dates">03 ЯНВАРЯ - 10 ЯНВАРЯ</div>
              <div className="tour-main-texts">
                <div className="tour-main-text">ОНЛАЙН-ПРОФТУР</div>
                <div className="tour-main-text">
                  <Typewriter
                    options={{
                      strings: "ОТ КОМПАНИИ «БИЛИМ САХА КАЗАХСТАН»",
                      autoStart: true,
                      loop: false,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="tour-main-item">
              <div className="tour-main-block">
                <div className="tour-main-block-colorFullBg" />
                <div className="tour-main-img" />
              </div>
              <div className="tour-main-grid">
                <div className="tour-main-title">
                  ПОСТУПЛЕНИЕ <br />{" "}
                  <span className="tour-main-subtitle">В УНИВЕРСИТЕТЫ</span>{" "}
                  КАЗАХСТАНА
                  <br /> В <span className="tour-main-subtitle">2025</span> ГОДУ
                </div>
                <div className="tour-main-button" onClick={() => goToPrice()}>
                  Присоединиться
                </div>
              </div>
            </div>

            {/* мышка */}
            <div className={`main-main-mouse`} onClick={scrollFunc}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32px"
                height="32px"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-mouse hidden h-7 w-7 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 xl:block"
                aria-hidden="true"
              >
                <rect x="5" y="2" width="14" height="20" rx="7" />
                <path d="M12 6v4" />
              </svg>
            </div>
          </div>
        </div>

        <div className="tour-need">
          <div className="tour-need-title">Кому подойдет?</div>
          <div className="tour-need-items">
            <div className="tour-need-item">
              <div className="tour-need-item-grid">
                <div className="tour-need-item">
                  <div className="tour-need-item-number">1</div>
                  <div className="tour-need-item-text">Школьникам</div>
                </div>

                <div className="tour-need-item-icon-school" />
              </div>

              <div className="tour-need-item-subtext">
                Тем, кто планирует поступление в университеты Казахстана и хочет
                получить полную информацию о процессе
              </div>
            </div>

            <div className="tour-need-item">
              <div className="tour-need-item-grid">
                <div className="tour-need-item">
                  <div className="tour-need-item-number">2</div>
                  <div className="tour-need-item-text">Родителям</div>
                </div>

                <div className="tour-need-item-icon-parents" />
              </div>
              <div className="tour-need-item-subtext">
                Которые хотят помочь своим детям с выбором университета и понять
                все нюансы поступления
              </div>
            </div>

            <div className="tour-need-item">
              <div className="tour-need-item-grid">
                <div className="tour-need-item">
                  <div className="tour-need-item-number">3</div>
                  <div className="tour-need-item-text">Студентам</div>
                </div>

                <div className="tour-need-item-icon-graduated" />
              </div>
              <div className="tour-need-item-subtext">
                Желающим перевестись в Казахстанские университеты или получить
                второе высшее образование
              </div>
            </div>
          </div>
        </div>

        <div className="tour-about">
          <div className="tour-about-grid">
            <div className="tour-about-block">
              <div className="tour-about-block-colorFullBg" />
              <div className="tour-about-img" />
            </div>

            <div className="tour-about-texts">
              <div className="tour-about-texts-title">БИЛИМ САХА КАЗАХСТАН</div>
              <div className="tour-about-texts-text">
                ПОМОЩЬ ПО ПОСТУПЛЕНИЮ В УЧЕБНЫЕ ЗАВЕДЕНИЯ КАЗАХСТАНА
              </div>
              <div className="tour-about-texts-mission">НАША МИССИЯ</div>
              <div className="tour-about-texts-text">
                ПОМОЧЬ СЛЕДУЮЩЕМУ ПОКОЛЕНИЮ ЧЕРЕЗ ПРИВИТИЕ ЦЕННОСТЕЙ
                ОБРАЗОВАНИЯ, КАЧЕСТВЕННЫЙ НЕТВОРКИНГ, СОЗДАНИЕ СРЕДЫ И
                КУЛЬТУРНЫЙ ОБМЕН
              </div>
            </div>
          </div>

          <div className="tour-about-items">
            <div className="tour-about-item">
              <div className="tour-about-item-title">22</div>
              <div className="tour-about-item-text">
                университета-партнера в Казахстане
              </div>
            </div>

            <div className="tour-about-item">
              <div className="tour-about-item-title">60+</div>
              <div className="tour-about-item-text">
                зачисленных учеников в учебные заведения Казахстана
              </div>
            </div>

            <div className="tour-about-item">
              <div className="tour-about-item-title">80</div>
              <div className="tour-about-item-text">
                детей прошли наши офлайн профтуры
              </div>
            </div>

            <div className="tour-about-item">
              <div className="tour-about-item-title">45000</div>
              <div className="tour-about-item-text">
                человек после выпуска на YouTube узнали об образовании в
                Казахстане
              </div>
            </div>
          </div>

          <div className="tour-about-item-last">
            <div />
            <div className="tour-about-item">
              <div className="tour-about-item-title">250</div>
              <div className="tour-about-item-text">
                человек посетили нашу офлайн встречу в Якутске
              </div>
            </div>
            <div />
          </div>
        </div>

        <div className="tour-wait">
          <div className="tour-wait-title">ЧТО ВАС ЖДЕТ НА ПРОФТУРЕ</div>
          <div className="tour-wait-subtitle">03 ЯНВАРЯ - 10 ЯНВАРЯ</div>

          <div className="tour-wait-block">
            <div className="tour-wait-flex">
              <div className="tour-wait-item">
                10 видеообзоров лучших университетов Алматы и 1 Международный
                Казахско-Турецкий Университет в Туркестане
              </div>
              <div className="tour-wait-item">
                Общий чат для всех участников и чат с менторами для тарифов
                «Стандарт» и «VIP»
              </div>
              <div className="tour-wait-item">Прямой эфир об олимпиадах</div>
            </div>
            <div className="tour-wait-gridRow">
              <div className="tour-wait-gridColumn">
                <div className="tour-wait-gridRow">
                  <div className="tour-wait-item">
                    Видео-интервью с представителями учебных заведений
                  </div>
                  <div className="tour-wait-item">Пробный урок английского</div>
                </div>
                <div className="tour-wait-vip">
                  <div className="tour-wait-vip-text">
                    РОЗЫГРЫШ БЕСПЛАТНОЙ ПУТЕВКИ НА ВЕСЕННИЙ ПРОФТУР ДЛЯ ТАРИФОВ
                    «СТАНДАРТ» и «VIP».
                  </div>
                  <div className="tour-wait-vip-subtext">
                    *для выявления победителя будем вести рейтинг активности
                  </div>
                </div>
              </div>
              <div className="tour-wait-img" />
            </div>
          </div>
        </div>

        <div className="tour-education">
          <div className="tour-education-title">КАК ПРОХОДИТ ОБУЧЕНИЕ</div>

          <div className="tour-education-items">
            <div className="tour-education-item">
              <div className="tour-education-item-number">1</div>
              <div className="tour-education-item-text">Видео-обзоры</div>
              <div className="tour-education-item-subtext">
                в записи в закрытой группе в Telegram <br />
                Длительность: 15-30 минут
              </div>
            </div>

            <div className="tour-education-item">
              <div className="tour-education-item-number">2</div>
              <div className="tour-education-item-text">Домашние задания</div>
            </div>

            <div className="tour-education-item">
              <div className="tour-education-item-number">3</div>
              <div className="tour-education-item-text">
                Дополнительные материалы
              </div>
              <div className="tour-education-item-subtext">
                в pdf-формате для удобства
              </div>
            </div>
          </div>
        </div>

        <div className="tour-itog">
          <div className="tour-itog-title">ПО ИТОГУ ПРОФТУРА ВЫ:</div>

          <div className="tour-itog-items">
            <div className="tour-itog-block">
              <div className="tour-itog-block-colorFullBg" />
              <div className="tour-itog-img" />
            </div>

            <div className="tour-itog-gridRow">
              <div className="tour-itog-item">
                → Выберете университет или несколько университетов, куда
                запланируете поступать
              </div>
              <div className="tour-itog-item">
                → Начнете готовиться к вступительным экзаменам
              </div>
              <div className="tour-itog-item">
                → Узнаете свой уровень английского языка
              </div>
            </div>

            <div className="tour-itog-gridRow">
              <div className="tour-itog-item">
                → Определитесь со своей будущей специализацией
              </div>
              <div className="tour-itog-vip">
                → Получите готовое мотивационное письмо при выборе тарифа «VIP»
              </div>
              <div className="tour-itog-item">
                → Попадете в сообщество единомышленников
              </div>
            </div>
          </div>
        </div>

        <div className="tour-enjoy">
          <div className="tour-enjoy-title">
            ПРИСОЕДИНЯЙТЕСЬ, ЧТОБЫ УЗНАТЬ ВСЁ ОБ УЧЕБЕ В КАЗАХСТАНЕ
          </div>
          <div className="tour-enjoy-items">
            <div className="tour-enjoy-imgs-turan" />
            <div className="tour-enjoy-imgs-vuz" />
            <div className="tour-enjoy-imgs-caspian" />
            <div className="tour-enjoy-imgs-sdu" />
          </div>
        </div>

        <div className="tour-price" id={"tour-price"}>
          <div className="tour-price-title">ВЫБЕРИ СВОЙ</div>

          <div className="tour-price-items">
            <div className="tour-price-block">
              <div className="tour-price-block-header">«БАЗА»</div>
              <div className="tour-price-block-main">
                <div className="tour-price-block-item">
                  <div className="tour-price-block-text">
                    Видеообзоры 10+ университетов:
                  </div>
                  <div className="tour-price-block-subtext">
                    • Полный обзор кампусов
                  </div>
                  <div className="tour-price-block-subtext">
                    • Особенности каждого университета
                  </div>
                </div>

                <div className="tour-price-block-item">
                  <div className="tour-price-block-text">
                    Спикеры — представители университетов:
                  </div>
                  <div className="tour-price-block-subtext">
                    • Этапы поступления
                  </div>
                  <div className="tour-price-block-subtext">
                    • Популярные направления и специальности
                  </div>
                  <div className="tour-price-block-subtext">
                    • Список необходимых документов
                  </div>
                  <div className="tour-price-block-subtext">
                    • Информация о грантах и скидках
                  </div>
                  <div className="tour-price-block-subtext">
                    • Дедлайны и важные сроки
                  </div>
                </div>

                <div className="tour-price-block-item">
                  <div className="tour-price-block-text">
                    Пробный урок английского:
                  </div>
                  <div className="tour-price-block-subtext">
                    • Оценка уровня языка участников
                  </div>
                  <div className="tour-price-block-subtext">
                    • Скидка на курсы от TYL GLOBAL
                  </div>
                </div>

                <div className="tour-price-block-item">
                  <div className="tour-price-block-text">Общий чат:</div>
                  <div className="tour-price-block-subtext">
                    • Возможность общения и обмена опытом между участниками
                  </div>
                </div>

                <div className="tour-price-block-lineNumber">9 500₽</div>
                <div className="tour-price-block-number">7 500₽</div>

                <div className="tour-price-block-container">
                  <a
                    className="tour-price-block-button"
                    href={"https://payform.ru/cb39dDV/"}
                    target="_blank"
                    rel="noreferrer"
                  >
                    ЗАБРОНИРОВАТЬ МЕСТО
                  </a>
                </div>
              </div>
            </div>

            <div className="tour-price-block">
              <div className="tour-price-block-header">«СТАНДАРТ»</div>
              <div className="tour-price-block-main">
                <div className="tour-price-block-item">
                  <div className="tour-price-block-text">
                    Видеообзоры 10+ университетов:
                  </div>
                  <div className="tour-price-block-subtext">
                    • Полный обзор кампусов
                  </div>
                  <div className="tour-price-block-subtext">
                    • Особенности каждого университета
                  </div>
                </div>

                <div className="tour-price-block-item">
                  <div className="tour-price-block-text">
                    Спикеры — представители университетов:
                  </div>
                  <div className="tour-price-block-subtext">
                    • Этапы поступления
                  </div>
                  <div className="tour-price-block-subtext">
                    • Популярные направления и специальности
                  </div>
                  <div className="tour-price-block-subtext">
                    • Список необходимых документов
                  </div>
                  <div className="tour-price-block-subtext">
                    • Информация о грантах и скидках
                  </div>
                  <div className="tour-price-block-subtext">
                    • Дедлайны и важные сроки
                  </div>
                </div>

                <div className="tour-price-block-item">
                  <div className="tour-price-block-text">
                    Пробный урок английского:
                  </div>
                  <div className="tour-price-block-subtext">
                    • Оценка уровня языка участников
                  </div>
                  <div className="tour-price-block-subtext">
                    • Скидка на курсы от TYL GLOBAL
                  </div>
                </div>

                <div className="tour-price-block-item">
                  <div className="tour-price-block-text">Общий чат:</div>
                  <div className="tour-price-block-subtext">
                    • Возможность общения и обмена опытом между участниками
                  </div>
                </div>

                <div className="tour-price-block-standart">
                  <div className="tour-price-block-item">
                    <div className="tour-price-block-standart-text">
                      Список всех специальностей:
                    </div>
                    <div className="tour-price-block-standart-subtext">
                      • PDF-файлы со списком всех направлений и ценами
                    </div>
                  </div>

                  <div className="tour-price-block-item">
                    <div className="tour-price-block-standart-text">
                      Обзор общежитий:
                    </div>
                    <div className="tour-price-block-standart-subtext">
                      • Отзывы студентов из Якутии об условиях проживания
                    </div>
                  </div>

                  <div className="tour-price-block-item">
                    <div className="tour-price-block-standart-text">
                      Прямой эфир с представителем университета:
                    </div>
                    <div className="tour-price-block-standart-subtext">
                      • Как подготовиться к успешной сдаче олимпиады, чтобы
                      выиграть грант или скидку?
                    </div>
                  </div>

                  <div className="tour-price-block-item">
                    <div className="tour-price-block-standart-text">
                      Чат с менторами:
                    </div>
                    <div className="tour-price-block-standart-subtext">
                      • Возможность задавать вопросы и получать обратную связь
                    </div>
                  </div>
                </div>

                <div className="tour-price-block-lineNumber">20 000₽</div>
                <div className="tour-price-block-number">15 000₽</div>

                <div className="tour-price-block-container">
                  <a
                    className="tour-price-block-button"
                    href={"https://payform.ru/9c39dCl/"}
                    target="_blank"
                    rel="noreferrer"
                  >
                    ЗАБРОНИРОВАТЬ МЕСТО
                  </a>
                </div>

                <div className="tour-price-block-limit">ЛИМИТ: 50 МЕСТ</div>
              </div>
            </div>

            <div className="tour-price-block">
              <div className="tour-price-block-header">«VIP»</div>
              <div className="tour-price-block-main">
                <div className="tour-price-block-item">
                  <div className="tour-price-block-text">
                    Видеообзоры 10+ университетов:
                  </div>
                  <div className="tour-price-block-subtext">
                    • Полный обзор кампусов
                  </div>
                  <div className="tour-price-block-subtext">
                    • Особенности каждого университета
                  </div>
                </div>

                <div className="tour-price-block-item">
                  <div className="tour-price-block-text">
                    Спикеры — представители университетов:
                  </div>
                  <div className="tour-price-block-subtext">
                    • Этапы поступления
                  </div>
                  <div className="tour-price-block-subtext">
                    • Популярные направления и специальности
                  </div>
                  <div className="tour-price-block-subtext">
                    • Список необходимых документов
                  </div>
                  <div className="tour-price-block-subtext">
                    • Информация о грантах и скидках
                  </div>
                  <div className="tour-price-block-subtext">
                    • Дедлайны и важные сроки
                  </div>
                </div>

                <div className="tour-price-block-item">
                  <div className="tour-price-block-text">
                    Пробный урок английского:
                  </div>
                  <div className="tour-price-block-subtext">
                    • Оценка уровня языка участников
                  </div>
                  <div className="tour-price-block-subtext">
                    • Скидка на курсы от TYL GLOBAL
                  </div>
                </div>

                <div className="tour-price-block-item">
                  <div className="tour-price-block-text">Общий чат:</div>
                  <div className="tour-price-block-subtext">
                    • Возможность общения и обмена опытом между участниками
                  </div>
                </div>

                <div className="tour-price-block-standart">
                  <div className="tour-price-block-item">
                    <div className="tour-price-block-standart-text">
                      Список всех специальностей:
                    </div>
                    <div className="tour-price-block-standart-subtext">
                      • PDF-файлы со списком всех направлений и ценами
                    </div>
                  </div>

                  <div className="tour-price-block-item">
                    <div className="tour-price-block-standart-text">
                      Обзор общежитий:
                    </div>
                    <div className="tour-price-block-standart-subtext">
                      • Отзывы студентов из Якутии об условиях проживания
                    </div>
                  </div>

                  <div className="tour-price-block-item">
                    <div className="tour-price-block-standart-text">
                      Прямой эфир с представителем университета:
                    </div>
                    <div className="tour-price-block-standart-subtext">
                      • Как подготовиться к успешной сдаче олимпиады, чтобы
                      выиграть грант или скидку?
                    </div>
                  </div>

                  <div className="tour-price-block-item">
                    <div className="tour-price-block-standart-text">
                      Чат с менторами:
                    </div>
                    <div className="tour-price-block-standart-subtext">
                      • Возможность задавать вопросы и получать обратную связь
                    </div>
                  </div>
                </div>

                <div className="tour-price-block-vip">
                  <div className="tour-price-block-vip-text">
                    Розыгрыш 1 путевки на весенний офлайн профтур
                  </div>
                </div>

                <div className="tour-price-block-vip">
                  <div className="tour-price-block-vip-text">
                    Годовое сопровождение стоимостью 50 000₽
                  </div>
                  <div className="tour-price-block-vip-subtext">
                    Сопровождение абитуриента в течение года, начиная от выбора
                    направления и подачи документов до заселения осенью в
                    общежитие
                  </div>
                </div>

                <div className="tour-price-block-vip">
                  <div className="tour-price-block-vip-text">
                    Конкурс на мотивационное письмо
                  </div>
                  <div className="tour-price-block-vip-subtext">
                    Возможность принять участие с проверкой от эксперта
                  </div>
                </div>

                <div className="tour-price-block-lineNumber">75 000₽</div>
                <div className="tour-price-block-number">60 000₽</div>

                <div className="tour-price-block-container">
                  <a
                    className="tour-price-block-button"
                    href={"https://payform.ru/ar39dD7/"}
                    target="_blank"
                    rel="noreferrer"
                  >
                    ЗАБРОНИРОВАТЬ МЕСТО
                  </a>
                </div>

                <div className="tour-price-block-limit">ЛИМИТ: 20 МЕСТ</div>
              </div>
            </div>
          </div>
        </div>

        <div className="tour-question">
          <div className="tour-question-title">
            остались вопросы? Напишите нам
          </div>
          <a
            className="tour-question-button"
            href={"https://wa.me/77053729660"}
            target="_blank"
            rel="noreferrer"
          >
            <div className="tour-question-button-whatsapp" />
            <div className="tour-question-button-text">Whatsapp</div>
          </a>
        </div>
      </div>
    </div>
  );
}
