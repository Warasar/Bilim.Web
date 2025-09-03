/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState } from "react";
import Input from "../../modules/YaKIT.WEB.KIT/components/Input/Input";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

type Props = {
  data: any;
  dataFooter: any;
  sendMessage: (name: string, phone: string, mail: string) => void;
};

interface Slide {
  id: number;
  content: React.ReactNode;
}

export default function Tour({ data, dataFooter, sendMessage }: Props) {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [mail, setMail] = useState<string>("");
  const [name1, setName1] = useState<string>("");
  const [phone1, setPhone1] = useState<string>("");
  const [mail1, setMail1] = useState<string>("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  // меняет input
  const changedString = (e: any, code: string) => {
    if (code === "mail") {
      setMail(e.target.value);
    } else if (code === "phone") {
      setPhone(e.target.value);
    } else {
      setName(e.target.value);
    }
  };

  // меняет input1
  const changedString1 = (e: any, code: string) => {
    if (code === "mail") {
      setMail1(e.target.value);
    } else if (code === "phone") {
      setPhone1(e.target.value);
    } else {
      setName1(e.target.value);
    }
  };

  const nextSlide = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setIsAnimating(false);
    }, 150);
  };

  const prevSlide = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setIsAnimating(false);
    }, 150);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsAnimating(false);
    }, 150);
  };

  const slides = React.useMemo<Slide[]>(
    () => [
      {
        id: 0,
        content: (
          <div className="tour-otziv-items">
            <div className="tour-otziv-item">
              <div className="tour-otziv-item-header">
                <div className="tour-otziv-item-header-icon">Э</div>
                <div className="tour-text-medium tour-text-white">Эльвира А.</div>
              </div>
              <div className="tour-text-default tour-text-white">
                Доброе утро! Хочу выразить благодарность руководителям Bilim Sakha Kazakhstan за предоставление
                возможности получить международный диплом, организацию очень познавательного, актуального проекта. Сын
                под большим впечатлением, многое для себя узнал, с ребятами подружился. В общем использовал каникулы
                впрок. Спасибо вожатым за четкую работу и внимание! Хотим дальнейших указаний и предложений для
                достижения поставленных целей!❤️❤️❤️
              </div>
            </div>
            <div className="tour-otziv-item">
              <div className="tour-otziv-item-header">
                <div className="tour-otziv-item-header-icon">С</div>
                <div className="tour-text-medium tour-text-white">Саргылаана Ефимова</div>
              </div>
              <div className="tour-text-default tour-text-white">
                Добрый день. Мы родители Сандала, хотим выразить благодарность коллективу "Билим" за организацию
                увлекательного, познавательного профтура. Сын не был уверен в выборе будущей профессии, появилась цель и
                мечта 🙌 которого мы как родители добивались много лет а вы за неделю помогли ему в выборе. Желаю вам
                молодому коллективу удачи и реализовать все свои планы и достигать всех своих целей🙏🙏
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 1,
        content: (
          <div className="tour-otziv-items">
            <div className="tour-otziv-item">
              <div className="tour-otziv-item-header">
                <div className="tour-otziv-item-header-icon">L</div>
                <div className="tour-text-medium tour-text-white">~Liza</div>
              </div>
              <div className="tour-text-default tour-text-white">
                Хочу выразить огромную благодарность вашей компании за отлично организованную поездку в
                Казахстан!👋👋😍😍😍😍 Дети очень довольны и в полном восторге от путешествия 👍 Все было продумано до
                мелочей 🥳 дружелюбная атмосфера, экскурсии все 👍 особенно было самое главное ходили по вузам. Желаем
                удачи во всем и процветания в дальнейшем. Благодарим Билим Саха организацию🤞🤞🤞
              </div>
            </div>
            <div className="tour-otziv-item">
              <div className="tour-otziv-item-header">
                <div className="tour-otziv-item-header-icon">😃</div>
                <div className="tour-text-medium tour-text-white"></div>
              </div>
              <div className="tour-text-default tour-text-white">
                Здраствуйте👋 Огромная благодарность за такие впечатления Билим Саха и сопровождающим🤗 Сын просто в
                восторге, сказал что точно будет поступать в Алматы👍 Желаем удачи и процветания вашей организации👍🤗☺️
              </div>
            </div>
          </div>
        ),
      },
    ],
    []
  );

  const current = slides[currentSlide];

  return (
    <div className="tour">
      <div className="tour-relative">
        {/* главная плашка */}
        <div className="tour-bg">
          <div className="tour-container">
            <div className="tour-main">
              <div className="tour-main-item">
                <div className="tour-text-title">Профтуры и поступление в университеты</div>

                <div className="tour-text-medium tour-text-white">
                  Раньше мы помогали поступать только в Казахстан.
                  <br /> А сейчас помогаем школьникам из Якутии найти свой путь в университетах{" "}
                  <span className="tour-text-main">России, Казахстана, </span>а также открываем
                  <span className="tour-text-red"> Китай</span>
                </div>
              </div>

              <div className="tour-main-block">
                <div className="tour-text-medium">Заявка на бесплатную консультацию</div>

                <div className="tour-header-modal-item" key={`survey-item-name`}>
                  <div className="tour-text-default">Имя*</div>
                  <Input
                    value={name}
                    onValueChanged={(e: any) => changedString(e, "name")}
                    type={"string"}
                    size="big"
                    placeholder="Иван Иванов"
                  />
                </div>
                <div className="tour-header-modal-item" key={`survey-item-name`}>
                  <div className="tour-text-default">Телефон*</div>
                  <Input
                    value={phone}
                    onValueChanged={(e: any) => changedString(e, "phone")}
                    type={"phone"}
                    size="big"
                    placeholder="+ 7 (914) 999-99-99"
                  />
                </div>
                <div className="tour-header-modal-item" key={`survey-item-name`}>
                  <div className="tour-text-default">Электронная почта</div>
                  <Input
                    value={mail}
                    onValueChanged={(e: any) => changedString(e, "mail")}
                    type={"mail"}
                    size="big"
                    placeholder="example@mail.com"
                  />
                </div>
                <div
                  className={`tour-header-modal-button${name.length && phone.length ? "" : "-disabled"}`}
                  onClick={() => {
                    sendMessage(name, phone, mail);
                  }}
                >
                  Оставить заявку
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* о нас */}
        <div className="tour-container" id="tour_about">
          <div className="tour-about">
            <div className="tour-about-item">
              <div className="tour-text-semiTitle">О нас</div>
            </div>
            <div className="tour-about-item">
              <div className="tour-text-medium">
                Мы прошли путь, который вам только предстоит. Мы тоже когда-то были студентами за границей и на
                собственном опыте знаем, что значит — справляться со сложностями и преодолевать страх неизвестности.
              </div>

              <div className="tour-about-grid">
                <div className="tour-text-default">
                  С 2022 года являемся экспертами на рынке образования. Наша работа — это сотни довольных студентов,
                  которые учатся в престижных ВУЗах благодаря нашему сопровождению.
                </div>
                <div className="tour-text-default">
                  Мы предлагаем не просто услуги, а проверенные и надежные решения, которые избавят вас от стресса и
                  гарантируют результат.
                </div>
              </div>
            </div>
          </div>

          <div className="tour-number">
            <div className="tour-text-semiTitle tour-text-white tour-number-title">
              Миссия - Развивать Якутию через <span className="tour-text-red">образование</span>
            </div>
            <div className="tour-number-items" ref={ref}>
              <div className="tour-number-item">
                <div className="tour-text-title tour-text-red">
                  <CountUp duration={3} end={inView ? 250 : 0} />+
                </div>
                <div className="tour-text-default tour-text-white">Поступили в учебные заведения Казахстана</div>
              </div>
              <div className="tour-number-item">
                <div className="tour-text-title tour-text-red">
                  <CountUp end={inView ? 300 : 0} duration={3} />+
                </div>
                <div className="tour-text-default tour-text-white">Посетили профтуры БИЛИМ</div>
              </div>
              <div className="tour-number-item">
                <div className="tour-text-title tour-text-red">
                  <CountUp end={inView ? 30 : 0} duration={3} />%
                </div>
                <div className="tour-text-default tour-text-white">
                  Ребят с сопровождения получили 100% гранты и скидки
                </div>
              </div>
              <div className="tour-number-item">
                <div className="tour-text-title tour-text-red">
                  ~
                  <CountUp end={inView ? 73000 : 0} duration={7} separator=" " />
                </div>
                <div className="tour-text-default tour-text-white">Человек узнали об образовании в Казахстане</div>
              </div>
            </div>
          </div>
        </div>

        {/* видеообзор */}
        <div className="tour-bg" id="tour_video">
          <div className={`tour-container`}>
            <div className="tour-videos">
              <div className="tour-text-semiTitle tour-text-white">Видеообзоры университетов Казахстана</div>

              <div className="tour-videos-centered">
                <iframe
                  src={"https://rutube.ru/embed/a4711d52b19a43bbc09132dca84f396b?api=1"}
                  className="tour-videos-iframe"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="КАЗАХСТАҤҤА ҮӨРЭҔИРИИ: обзор SDU, Билим Саха-Казахстан"
                />
                <iframe
                  src={"https://rutube.ru/embed/f447f39ac48444442bdf436c9a9c2eb0?api=1"}
                  className="tour-videos-iframe"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="КАЗАХСТАҤҤА ҮӨРЭҔИРИИ: обзор SDU, Билим Саха-Казахстан"
                />
              </div>

              <div className="tour-videos-centered"></div>
            </div>
          </div>
        </div>

        <div className="tour-container" id="tour_products">
          {/* наши продукты */}
          <div className="tour-products">
            <div className="tour-text-semiTitle">Наши продукты</div>

            {/* верхняя часть */}
            <div className="tour-products-items">
              {/* КЗ */}
              <div className="tour-products-item">
                <div className="tour-products-item-header">
                  <div className="tour-products-item-header-title">
                    <div className="tour-text-medium tour-text-white">Профтур в Казахстан</div>
                    <div className="tour-text-medium tour-text-white">Алматы, Астана и Два города</div>
                  </div>
                  <div className="tour-products-icon-kz" />
                </div>
                <div className="tour-text-default tour-text-white tour-products-item-text">
                  Уже этой осенью мы летим в профтур по вузам Казахстана — сразу в два города: Алматы и Астану
                  <ol className="tour-products-ol">
                    <li>Астана: 25 октября — 1 ноября</li>
                    <li>Алматы: 27 октября — 2 ноября</li>
                    <li>Астана + Алматы: 25 октября — 1 ноября</li>
                  </ol>
                  <br />
                  Вас ждет:
                  <ol className="tour-products-ol">
                    <li>Посещение и знакомство с лучшими университетами Казахстана</li>
                    <li>Яркая туристическая и культурная программа </li>
                    <li>
                      Ребят будут сопровождать вожатые саха - студенты: от первых уст вы узнаете о том, как поступить,
                      готовиться к вступительным испытаниям, а также как можно выиграть грант, либо скидку
                    </li>
                    <li>Посещение офисов международных компаний</li>
                  </ol>
                </div>
              </div>

              {/* китай */}
              <div className="tour-products-item">
                <div className="tour-products-item-header">
                  <div className="tour-products-item-header-title">
                    <div className="tour-text-medium tour-text-white">Профтур в Китай</div>
                    <div className="tour-text-medium tour-text-white">Город Харбин</div>
                  </div>
                  <div className="tour-products-icon-china" />
                </div>
                <div className="tour-text-default tour-text-white tour-products-item-text">
                  Мы открываем новые горизонты - приглашаем на наш осенний профтур в Китае
                  <ol className="tour-products-ol">
                    <li>Харбин: 23 октября — 30 октября </li>
                  </ol>
                  <br />
                  Вас ждет:
                  <ol className="tour-products-ol">
                    <li>
                      Знакомство с двумя ведущими университетами Харбина — почувствуй себя студентом и узнай, как живут
                      и учатся китайские студенты
                    </li>
                    <li>Атмосфера современного мегаполиса покорит тебя своими контрастами и красотой</li>
                    <li>Яркая туристическая и культурная программа</li>
                    <li>Шоппинг, сафари - парк с тиграми, океанариум, день спа и многое другое</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* нижняя часть */}
            <div className="tour-products-itemsTriple">
              {/* полное сопровождение */}
              <div className="tour-products-item">
                <div className="tour-products-item-header">
                  <div className="tour-products-item-header-title">
                    <div className="tour-text-medium tour-text-white">Сопровождение по поступлению</div>
                  </div>

                  <div className="tour-products-icon-accopointment" />
                </div>
                <div className="tour-text-default tour-text-white tour-products-item-text">
                  Мы поможем поступить в университет Казахстана и осуществить мечту об учебе за границей:
                  <ol className="tour-products-ol">
                    <li>Подберем университет и программу, которая тебе подходит</li>
                    <li>Поможем с написанием мотивационного письма</li>
                    <li>Поможем подготовить все необходимые документы</li>
                    <li>Подготовим тебя к собеседованию</li>
                    <li>И самое главное - поможем получить грант на обучение</li>
                  </ol>
                </div>
              </div>

              {/* профориентация */}
              <div className="tour-products-item">
                <div className="tour-products-item-header">
                  <div className="tour-products-item-header-title">
                    <div className="tour-text-medium tour-text-white">Профориентация</div>
                  </div>
                  <div className="tour-products-icon-proforient" />
                </div>
                <div className="tour-text-default tour-text-white tour-products-item-text">
                  Это услуга для ребят, которые не могут определиться со своей будущей профессией и направлением
                  обучения
                  <br />
                  <br />
                  Наш эксперт поможет вам разобраться в себе, определить сильные стороны и создать траекторию будущего
                  развития
                </div>
              </div>

              {/* подбор рф */}
              <div className="tour-products-item">
                <div className="tour-products-item-header">
                  <div className="tour-products-item-header-title">
                    <div className="tour-text-medium tour-text-white">Подбор РФ</div>
                  </div>
                  <div className="tour-products-icon-russia" />
                </div>
                <div className="tour-text-default tour-text-white tour-products-item-text">
                  Если вы хотите поступить в ведущие университеты России, мы подберем для вас наиболее подходящие
                  университеты по вашим направлениям. С учетом вашего бюджета и личных предпочтений
                </div>
              </div>
            </div>
          </div>

          {/* отзывы */}
          <div className="tour-otziv" id="tour_otziv">
            <div className="tour-otziv-header">
              <div className="tour-otziv-header-item">
                <div className="tour-text-semiTitle">Отзывы наших клиентов</div>
                <div className="tour-text-medium">Положительные впечатления — одна из наших главных задач</div>
              </div>
              <div className="tour-otziv-arrows">
                <div className="tour-otziv-arrows-left" onClick={() => (isAnimating ? null : prevSlide())}>
                  <div className="tour-otziv-arrows-left-icon" />
                </div>
                <div className="tour-otziv-arrows-right" onClick={() => (isAnimating ? null : nextSlide())}>
                  <div className="tour-otziv-arrows-right-icon" />
                </div>
              </div>
            </div>

            <div className="tour-carousel">
              <div
                className={`tour-otziv-slide ${
                  isAnimating ? `tour-otziv-slide-animate` : `tour-otziv-slide-nonAnimate`
                }`}
              >
                <div className={`tour-otziv-slide-content`}>{current.content}</div>
              </div>

              <div className={`tour-otziv-dots`}>
                {slides.map((_, index) => (
                  <div
                    key={index}
                    onClick={() => (isAnimating ? null : goToSlide(index))}
                    className={`tour-otziv-dots-button ${
                      index === currentSlide ? `tour-otziv-dots-button-current` : `tour-otziv-dots-button-nocurrent`
                    } ${isAnimating ? "pointer-events-none" : ""}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* оставить заявку */}
          <div className="tour-zayavka">
            <div className="tour-zayavka-item">
              <div className="tour-zayavka-item-flex">
                <div className="tour-text-semiTitle tour-text-white">
                  Остались вопросы? <br /> Напишите нам!
                </div>
                <div className="tour-text-medium tour-text-white tour-zayavka-block-item-middle">
                  Задавайте любые интересующие вас вопросы и получите профессиональную консультацию от нашего
                  специалиста!
                </div>
              </div>

              <div className="tour-zayavka-block">
                <div className="tour-zayavka-block-item">
                  <div className="tour-text-medium tour-text-white tour-zayavka-block-item-middle">Телефон:</div>
                  <a
                    href={"tel:8(996)-316-31-49"}
                    target={"_blank"}
                    rel="noreferrer"
                    className="tour-text-medium tour-text-white tour-zayavka-block-item-text tour-zayavka-block-item-middle"
                  >
                    +7 (996) 316-31-49
                  </a>
                </div>
                <div className="tour-zayavka-block-item">
                  <div className="tour-text-medium tour-text-white tour-zayavka-block-item-middle">Почта:</div>
                  <a
                    href={"mailto:bilimsakhakz@gmail.com"}
                    target={"_blank"}
                    rel="noreferrer"
                    className="tour-text-medium tour-text-white tour-zayavka-block-item-text tour-zayavka-block-item-middle"
                  >
                    bilimsakhakz@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="tour-main-block">
              <div className="tour-header-modal-item" key={`survey-item-name`}>
                <div className="tour-text-default">Имя*</div>
                <Input
                  value={name1}
                  onValueChanged={(e: any) => changedString1(e, "name")}
                  type={"string"}
                  size="big"
                  placeholder="Иван Иванов"
                />
              </div>
              <div className="tour-header-modal-item" key={`survey-item-name`}>
                <div className="tour-text-default">Телефон*</div>
                <Input
                  value={phone1}
                  onValueChanged={(e: any) => changedString1(e, "phone")}
                  type={"phone"}
                  size="big"
                  placeholder="+ 7 (914) 999-99-99"
                />
              </div>
              <div className="tour-header-modal-item" key={`survey-item-name`}>
                <div className="tour-text-default">Электронная почта</div>
                <Input
                  value={mail1}
                  onValueChanged={(e: any) => changedString1(e, "mail")}
                  type={"mail"}
                  size="big"
                  placeholder="example@mail.com"
                />
              </div>
              <div
                className={`tour-header-modal-button${name1.length && phone1.length ? "" : "-disabled"}`}
                onClick={() => {
                  sendMessage(name1, phone1, mail1);
                }}
              >
                Оставить заявку
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* футер */}
      {dataFooter ? (
        <div className="tour-footer">
          <div className="tour-container">
            <div className="tour-footer-container">
              <div className="tour-footer-first">
                <div className="tour-footer-item-header">
                  <div className="tour-footer-item-flexColumn">
                    <div className="tour-footer-logo" />
                    <div className="tour-text-default tour-text-white tour-footer-subtitle">
                      {dataFooter.subtitle.text}
                    </div>
                  </div>
                </div>
                <div className="tour-footer-icons">
                  {dataFooter.icons.map((item: any, index: number) => {
                    return (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className={`tour-footer-icons-${item.code}`}
                        key={`tour-footer-icons-${item.code}_${index}`}
                      >
                        <div className={`tour-footer-icons-${item.code}-icon`} />
                      </a>
                    );
                  })}
                </div>
                <div className="tour-footer-second">
                  {dataFooter.data.map((item: any, index: number) => {
                    return (
                      <div className="tour-footer-item" key={`tour-footer-item_${index}`}>
                        <div className="tour-text-medium tour-text-white">{item.name}</div>
                        <div className="tour-footer-item-flexColumn">
                          {item.items.map((child: any) => {
                            return (
                              <div
                                className="tour-footer-item-flex"
                                key={`tour-footer-item-flex_${index}_${child.code}`}
                              >
                                <div className={`tour-footer-item-icon-${child.icon}`} />
                                <a
                                  href={child.link}
                                  target={index === 0 ? "_self" : "_blank"}
                                  rel="noreferrer"
                                  className="tour-text-default tour-text-white tour-footer-item-text"
                                >
                                  {child.name}
                                </a>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <iframe src={dataFooter.map.link} className="tour-footer-map" />
            </div>

            <div className="tour-footer-end">
              <div className="tour-footer-end-grid">
                <div className="tour-footer-end-flexColumn">
                  <div className="tour-text-small tour-text-sub">{dataFooter.end.title}</div>
                  <div className="tour-footer-end-flex">
                    {dataFooter.end.items.map((item: any, index: number) => {
                      return (
                        <div className="tour-text-small tour-text-sub" key={`tour-footer-end-text_${index}`}>
                          {item.text}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="tour-text-small tour-text-sub">{dataFooter.end.text}</div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
