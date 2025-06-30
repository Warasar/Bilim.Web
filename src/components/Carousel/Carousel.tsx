import React, { useState } from "react";
import { Modal } from "antd";

const className = "carousel";

interface Slide {
  id: number;
  content: React.ReactNode;
}

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [clickedEmojis, setClickedEmojis] = useState<Set<string>>(new Set());
  const [showPhoto, setShowPhoto] = useState(false);

  const renderTail = () => {
    return (
      <svg viewBox="0 0 8 13" height="13" width="8" className={`${className}-tail`} version="1.1" x="0px" y="0px">
        <path fill="currentColor" d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z" />
      </svg>
    );
  };

  const handleEmojiClick = (emoji: string) => {
    setClickedEmojis((prev) => new Set([...prev, emoji]));
    setTimeout(() => {
      setClickedEmojis((prev) => {
        const n = new Set(prev);
        n.delete(emoji);
        return n;
      });
    }, 600);
  };

  const slides = React.useMemo<Slide[]>(
    () => [
      {
        id: 0,
        content: (
          <div className={`${className}-item0`}>
            <div className={`${className}-item0-title`}>
              Какие приложения* вам <br /> понадобятся во время <br /> Сопровождения?
            </div>
            <div className={`${className}-item0-subtitle`}>И правила, которые необходимо учитывать</div>
            <div className={`${className}-item0-description`}>
              *все приложения можно скачать на телефон <br /> на Android через Google Market <br /> на iOS через App
              Store
            </div>
          </div>
        ),
      },
      {
        id: 1,
        content: (
          <div className={`${className}-item1`}>
            <div className={`${className}-item1-header`}>
              <div className={`${className}-item1-whatsapp`} />
              <div className={`${className}-item1-title`}>Whatsapp</div>
            </div>

            <div className={`${className}-item1-content`}>
              <div className={`${className}-item1-bignumber`}>1</div>
              <div className={`${className}-item1-main`}>
                <div className={`${className}-item1-main-text`}>
                  Необходим для связи с нами, Билим, также для группы Сопровождения, где будет вся необходимая
                  информация. После прочтения сообщений, принятия всех заданий просим реагировать на них, так мы поймем,
                  что вы прочитали и приняли информацию.
                </div>
                <div className={`${className}-item1-main-emojis`}>
                  {["👍", "❤️", "😂", "😮", "😢", "🙏"].map((emoji) => (
                    <div
                      key={emoji}
                      onClick={() => handleEmojiClick(emoji)}
                      className={`${className}-item1-main-emojis-item
                            ${clickedEmojis.has(emoji) ? `${className}-item1-main-emojis-item-bounce` : ""}`}
                    >
                      {clickedEmojis.has(emoji) && <span className={`${className}-item1-main-emojis-item-ping`} />}
                      {emoji}
                    </div>
                  ))}
                  <div className={`${className}-item1-main-emojis-plus`}>+</div>
                </div>

                {/* хвостик */}
                {renderTail()}
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 2,
        content: (
          <div className={`${className}-item2`}>
            <div className={`${className}-item2-header`}>
              <div className={`${className}-item2-telegram`} />
              <div className={`${className}-item2-title`}>Telegram</div>
            </div>

            <div className={`${className}-item2-content`}>
              <div className={`${className}-item2-bignumber`}>2</div>
              <div className={`${className}-item2-main`}>
                <div className={`${className}-item2-main-text`}>
                  На компьютере/ноутбуке можно сидеть через веб-телеграмм:&nbsp;
                  <a
                    href="https://web.telegram.org/"
                    className={`${className}-item2-main-link`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    telegram.org
                  </a>
                  <br />
                  <br />
                  Телеграмм понадобится для прохождения Online Профтура и разных групп. Во время Профтура просмотрите
                  каждое видео, ознакомьтесь со всеми документами.
                </div>

                {/* хвостик */}
                {renderTail()}
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 3,
        content: (
          <div className={`${className}-item3`}>
            <div className={`${className}-item3-header`}>
              <div className={`${className}-item3-gmail`} />
              <div className={`${className}-item3-title`}>Почта</div>
            </div>

            <div className={`${className}-item3-content`}>
              <div className={`${className}-item3-bignumber`}>3</div>
              <div className={`${className}-item3-main`}>
                <div className={`${className}-item3-main-text`}>
                  На компьютере/ноутбуке можно сидеть <br /> через сайт:&nbsp;
                  <a
                    href="https://gmail.com/"
                    className={`${className}-item3-main-link`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    gmail.com
                  </a>
                  <br />
                  <br />
                  Понадобится для отправки своих работ и выполненных заданий. <br />
                  Всегда подписывайте свои письма, работы, документы:
                  <div className={`${className}-item3-main-text-centered`}>"Фамилия Имя, Какая работа"</div>
                  Пример смотрите на следующем слайде.
                </div>

                {/* хвостик */}
                {renderTail()}
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 4,
        content: (
          <div className={`${className}-item4`}>
            <div className={`${className}-item4-header`}>
              <div className={`${className}-item4-gmail`} />
              <div className={`${className}-item4-title`}>Почта</div>
            </div>

            <div className={`${className}-item4-content`}>
              <div className={`${className}-item4-photo`} onClick={() => setShowPhoto(true)} />
              <div className={`${className}-item4-flex`}>
                <div className={`${className}-item4-text`}>1 - адрес отправителя</div>
                <div className={`${className}-item4-text`}>2 - Фамилия Имя, Какая работа</div>
                <div className={`${className}-item4-text`}>3 - прикрепляете свою работу</div>
              </div>
            </div>

            <Modal
              open={showPhoto}
              onCancel={() => setShowPhoto(false)}
              footer={false}
              width={"70vw"}
              title={<>Почта</>}
            >
              <div className={`${className}-item4-photoBig`} />
            </Modal>
          </div>
        ),
      },
      {
        id: 5,
        content: (
          <div className={`${className}-item5`}>
            <div className={`${className}-item5-header`}>
              <div className={`${className}-item5-gmail`} />
              <div className={`${className}-item5-title`}>Почта</div>
            </div>

            <div className={`${className}-item5-content`}>
              <div className={`${className}-item5-pdf`} style={{ justifyContent: "end" }}>
                <div className={`${className}-item5-pdf-centered`}>
                  <div className={`${className}-item5-pdf-icon`} />
                </div>

                <div className={`${className}-item5-pdf-text`}>document 12e02-1is 2025-05-25(1)</div>
                <div className={`${className}-item5-pdf-centered`}>
                  <div className={`${className}-item5-pdf-cancel`} />
                </div>
              </div>

              <div className={`${className}-item5-text`}>
                Не только письма нужно подписывать, но и сами <b>документы</b>, которые вы отправляете!
                <br />
                Когда учитель загружает вашу работу, он может её потерять, а по имени можно все легко найти.
              </div>

              <div className={`${className}-item5-pdf`}>
                <div className={`${className}-item5-pdf-centered`}>
                  <div className={`${className}-item5-pdf-icon`} />
                </div>
                <div className={`${className}-item5-pdf-text`}>
                  Иванов Дмитрий Мотивацион <br /> ное письмо
                </div>
                <div className={`${className}-item5-pdf-centered`}>
                  <div className={`${className}-item5-pdf-accept`} />
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 6,
        content: (
          <div className={`${className}-item6`}>
            <div className={`${className}-item6-header`}>
              <div className={`${className}-item6-zoom`} />
              <div className={`${className}-item6-title`}>Zoom</div>
            </div>

            <div className={`${className}-item6-content`}>
              <div className={`${className}-item6-bignumber`}>4</div>
              <div className={`${className}-item6-main`}>
                <div className={`${className}-item6-main-text`}>
                  На компьютере/ноутбуке можно подключиться <br /> через сайт:&nbsp;
                  <a
                    href="https://zoom.com/ru/"
                    className={`${className}-item6-main-link`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    zoom.com/ru
                  </a>
                  <br />
                  <br />
                  Понадобится для онлайн-встреч на разные темы. <br />
                  Для подключения необходимы:
                  <div className={`${className}-item6-main-subtext`}>работающие камера, микрофон.</div>
                  <br />
                  На встречи заходите вовремя, активно отвечайте, делайте необходимые заметки.
                </div>

                {/* хвостик */}
                {renderTail()}
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 7,
        content: (
          <div className={`${className}-item7`}>
            <div className={`${className}-item7-header`}>
              <div className={`${className}-item7-zoom`} />
              <div className={`${className}-item7-title`}>Zoom</div>
            </div>

            <div className={`${className}-item7-content`}>
              <div className={`${className}-item7-photo`} />
              <div className={`${className}-item7-main`}>
                <div className={`${className}-item7-main-text`}>
                  Обязательно подпишите свое имя в zoom. <br />
                  Для этого зайдите в{" "}
                  <span className={`${className}-item7-main-subtext`}>
                    настройки - мой профиль - отображаемое имя -
                  </span>
                  &nbsp;вписываете свои фамилию и имя.
                  <br />
                  <br />
                  Чтобы зайти на конференцию, нажмите на ссылку, которую вам отправили. При необходимости введите
                  пароль.
                </div>

                {/* хвостик */}
                {renderTail()}
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 8,
        content: (
          <div className={`${className}-item8`}>
            <div className={`${className}-item8-header`}>
              <div className={`${className}-item8-icon`}>
                <div className={`${className}-item8-bgwhite`} />
                <div className={`${className}-item8-powerpoint`} />
              </div>
              <div className={`${className}-item8-icon`}>
                <div className={`${className}-item8-bgwhite1`} />
                <div className={`${className}-item8-word`} />
              </div>

              <div className={`${className}-item8-title`}>Power Point & Word</div>
            </div>

            <div className={`${className}-item8-content`}>
              <div className={`${className}-item8-bignumber`}>5</div>
              <div className={`${className}-item8-main`}>
                <div className={`${className}-item8-main-text`}>
                  На компьютере/ноутбуке можно скачать Microsoft Office, спиздив у цыган.
                  <br />
                  <br />
                  Если не получается спиздить, то можно использовать приложения Google. Смотрите на следующем слайде.
                </div>

                {/* хвостик */}
                {renderTail()}
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 9,
        content: (
          <div className={`${className}-item9`}>
            <div className={`${className}-item9-header`}>
              <div className={`${className}-item9-googledrive`} />
              <div className={`${className}-item9-title`}>Google Drive</div>
            </div>

            <div className={`${className}-item9-content`}>
              <div className={`${className}-item9-main`}>
                <div className={`${className}-item9-main-photo`} />
                <div className={`${className}-item9-main-item`}>
                  <div className={`${className}-item9-main-text`}>
                    Зайдите на свой диск - облачное хранение Google, где вы можете хранить свои документы.
                    <br />
                    <div className={`${className}-item9-main-div`}>
                      <a
                        href="https://drive.google.com/"
                        className={`${className}-item9-main-link`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        drive.google.com
                      </a>
                    </div>
                    Слева сверху найдите <span className={`${className}-item9-main-subtext`}>"создать"</span>, где
                    выйдет следующий список. Если хотите создать документ, зайдите в <br />
                    <span className={`${className}-item9-main-subtext`}>"Google Документы"</span>, если презентацию
                    <span className={`${className}-item9-main-subtext`}> - "Google Презентации"</span>
                  </div>
                </div>

                {/* хвостик */}
                {renderTail()}
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 10,
        content: (
          <div className={`${className}-item10`}>
            <div className={`${className}-item10-header`}>
              <div className={`${className}-item10-rutube`} />
              <div className={`${className}-item10-title`}>Rutube</div>
            </div>

            <div className={`${className}-item10-content`}>
              {/* <div className={`${className}-item10-bignumber`}>6</div> */}
              <div className={`${className}-item10-main`}>
                <div className={`${className}-item10-main-text`}>
                  На данной платформе мы будем загружать записи наших встреч, а также отправлять ссылки на видео,
                  которые мы уже загрузили! <br />
                  <br />
                  Приложение загружать необязательно, просто нажимайте на саму ссылку.
                </div>

                {/* хвостик */}
                {renderTail()}
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 11,
        content: (
          <div className={`${className}-item11`}>
            <div className={`${className}-item11-header`}>
              <div className={`${className}-item11-bilim`} />
              <div className={`${className}-item11-title`}>Время работы</div>
            </div>

            <div className={`${className}-item11-content`}>
              <div className={`${className}-item11-main`}>
                <div className={`${className}-item11-main-text`}>
                  Вы можете обращаться к нам в рабочее время:
                  <br /> <br />
                  <div style={{ textAlign: "center" }}>
                    ПН-СБ: 11:00-19:00ч <br /> ВС: выходной
                  </div>
                  <br />
                  Благодарим за понимание!
                </div>
              </div>
            </div>
          </div>
        ),
      },
    ],
    [clickedEmojis, showPhoto]
  );

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

  const current = slides[currentSlide];

  return (
    <div className={`${className}`}>
      <div className={`${className}-block`}>
        {/* голова */}
        <div className={`${className}-header`}>
          <h1 className={`${className}-header-title`}>Регламент работы Сопровождения 2025</h1>
          <div className={`${className}-header-name`}>BILIM</div>
        </div>

        {/* основное */}
        <div className={`${className}-content`}>
          {/* влево вправо кнопки */}
          <div className={`${className}-button-left`} onClick={() => (isAnimating ? null : prevSlide())}>
            <div className={`${className}-button-left-icon`} />
          </div>

          <div className={`${className}-button-right`} onClick={() => (isAnimating ? null : nextSlide())}>
            <div className={`${className}-button-right-icon`} />
          </div>

          {/* контент */}
          <div
            className={`${className}-slide ${
              isAnimating ? `${className}-slide-animate` : `${className}-slide-nonAnimate`
            }`}
          >
            <div className={`${className}-slide-content`}>{current.content}</div>
          </div>
        </div>

        {/* точки */}
        <div className={`${className}-dots`}>
          {slides.map((_, index) => (
            <div
              key={index}
              onClick={() => (isAnimating ? null : goToSlide(index))}
              className={`${className}-dots-button ${
                index === currentSlide ? `${className}-dots-button-current` : `${className}-dots-button-nocurrent`
              } ${isAnimating ? "pointer-events-none" : ""}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
