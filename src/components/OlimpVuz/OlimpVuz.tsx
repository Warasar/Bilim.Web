import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const className = "olimpvuz";

type Props = {
  findData: any;
};

export default function OlimpVuz({ findData }: Props) {
  const [data, setData] = useState<any>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<any>(null);

  useEffect(() => {
    if (findData) {
      setData(findData);
      setActiveTab(findData.videos[0]);
    }
  }, [findData]);

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsAnimating(false);
    }, 150);
  };

  const nextSlide = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % data.carousel.items.length);
      setIsAnimating(false);
    }, 150);
  };

  const prevSlide = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + data.carousel.items.length) % data.carousel.items.length);
      setIsAnimating(false);
    }, 150);
  };

  return (
    <div className={className}>
      {data ? (
        <div className={`${className}-main`}>
          {data.dop_title ? (
            <div className={`${className}-dop`}>
              <div className={`${className}-dop-title`}>{data.dop_title}</div>
              {data.dop_subtitle ? <div className={`${className}-dop-subtitle`}>{data.dop_subtitle}</div> : null}
            </div>
          ) : null}

          <div className={`${className}-title`}>{data.title}</div>
          {data.subtitle ? <div className={`${className}-subtitle`}>{data.subtitle}</div> : null}

          {data.docs?.length ? (
            <div className={`${className}-docs`}>
              {data.docs.map((item: any) => {
                return (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    key={`${className}-docs-item_${item.id}`}
                    className={`${className}-docs-item`}
                  >
                    <div className={`${className}-docs-item-text`}>{item.name}</div>
                    <div className={`${className}-docs-item-icon`} />
                  </a>
                );
              })}
            </div>
          ) : null}

          {data.videos?.length ? (
            <div className={`${className}-video`}>
              <div className={`${className}-video-header`}>
                <div className={`${className}-video-tabs`}>
                  {data.videos.map((item: any) => {
                    return (
                      <div
                        className={`${className}-video-tabs-item${activeTab.id === item.id ? "-active" : ""}`}
                        key={`${className}-video-tabs-item_${item.id}`}
                        onClick={() => setActiveTab(item)}
                      >
                        {item.name}
                      </div>
                    );
                  })}
                </div>
              </div>

              {activeTab ? (
                <div className={`${className}-video-content`}>
                  <div className={`${className}-video-title`}>{activeTab.title}</div>
                  {activeTab.subtitle ? (
                    <div className={`${className}-video-subtitle`}>{activeTab.subtitle}</div>
                  ) : null}

                  <iframe
                    src={activeTab.iframe}
                    className={`${className}-video-iframe`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={activeTab.title}
                  />

                  {activeTab.docs?.length ? (
                    <div className={`${className}-video-docs`}>
                      {activeTab.docs.map((item: any) => {
                        return (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            key={`${className}-docs-item_${item.id}`}
                            className={`${className}-docs-item`}
                          >
                            <div className={`${className}-docs-item-text`}>{item.name}</div>
                            <div className={`${className}-docs-item-icon`} />
                          </a>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : null}

          {data.meeting ? (
            <div className={`${className}-video`}>
              <div className={`${className}-video-header`}>
                <div className={`${className}-video-header-title`}>{data.meeting.name}</div>
              </div>
              <div className={`${className}-video-content`}>
                <iframe
                  style={{ marginTop: "12px" }}
                  src={data.meeting.iframe}
                  className={`${className}-video-iframe`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={data.meeting.name}
                />
              </div>
            </div>
          ) : null}

          {data.carousel ? (
            <div className={`${className}-carousel`}>
              <div className={`${className}-carousel-header`}>
                <div className={`${className}-carousel-header-title`}>{data.carousel.title}</div>
              </div>

              {/* влево вправо кнопки */}
              <div className={`${className}-carousel-button-left`} onClick={() => (isAnimating ? null : prevSlide())}>
                <div className={`${className}-carousel-button-left-icon`} />
              </div>

              <div className={`${className}-carousel-button-right`} onClick={() => (isAnimating ? null : nextSlide())}>
                <div className={`${className}-carousel-button-right-icon`} />
              </div>

              {/* контент */}
              <div className={`${className}-carousel-block`}>
                <div
                  className={`${className}-carousel-slide ${
                    isAnimating ? `${className}-carousel-slide-animate` : `${className}-carousel-slide-nonAnimate`
                  }`}
                >
                  <img
                    src={`/assets/olimp/sdu_presentation/${data.carousel.items[currentSlide].link}`}
                    alt=""
                    className={`${className}-carousel-slide-content`}
                  />
                </div>
              </div>

              {/* точки */}
              <div className={`${className}-carousel-dots`}>
                {data.carousel.items.map((img: any, index: number) => (
                  <div
                    key={index}
                    onClick={() => (isAnimating ? null : goToSlide(index))}
                    className={`${className}-carousel-dots-button ${
                      index === currentSlide
                        ? `${className}-carousel-dots-button-current`
                        : `${className}-carousel-dots-button-nocurrent`
                    } ${isAnimating ? "pointer-events-none" : ""}`}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div className={`${className}-empty`}>
          <div className={`${className}-empty-text`}>Страница находится еще в стадии разработки</div>
          <NavLink to="/olimp" className={`${className}-empty-button`}>
            <div className={`${className}-empty-button-text`}>Вернуться назад</div>
          </NavLink>
        </div>
      )}
    </div>
  );
}
