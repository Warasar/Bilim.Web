import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const className = "olimp";

type Props = {
  data: any;
};

export default function Olimp({ data }: Props) {
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<any>(data.videos[0]);

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
      <div className={`${className}-main`}>
        <div className={`${className}-title`}>{data.title}</div>

        <div className={`${className}-spisok`}>
          {data.spisok.map((item: any) => {
            return (
              <NavLink
                to={`${item.link}`}
                key={`${className}-spisok-item_${item.id}`}
                className={`${className}-spisok-item`}
              >
                {item.name}
              </NavLink>
            );
          })}
        </div>

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
                src={`/assets/olimp_presentation/${data.carousel.items[currentSlide].link}`}
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

        <div className={`${className}-video`}>
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

          {activeTab ? (
            <div className={`${className}-video-content`}>
              <div className={`${className}-video-title`}>{activeTab.title}</div>
              {activeTab.subtitle ? <div className={`${className}-video-subtitle`}>{activeTab.subtitle}</div> : null}
              <iframe
                src={activeTab.iframe}
                className={`${className}-video-iframe`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={activeTab.title}
              />
              {activeTab.text ? <div className={`${className}-video-text`}>{activeTab.text}</div> : null}
            </div>
          ) : null}
        </div>

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
      </div>
    </div>
  );
}
