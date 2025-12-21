import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const className = "olimp";

type Props = {
  data: any;
};

export default function Olimp({ data }: Props) {
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<any>(
    data.find((f: any) => f.containerCode === "olimpVideos")?.data[0]
  );

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
      setCurrentSlide(
        (prev) =>
          (prev + 1) %
          data.find((f: any) => f.containerCode === "olimpCarousel").items.data
            .length
      );
      setIsAnimating(false);
    }, 150);
  };

  const prevSlide = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    setTimeout(() => {
      setCurrentSlide(
        (prev) =>
          (prev -
            1 +
            data.find((f: any) => f.containerCode === "olimpCarousel").items
              .data.length) %
          data.find((f: any) => f.containerCode === "olimpCarousel").items.data
            .length
      );
      setIsAnimating(false);
    }, 150);
  };

  return (
    <div className={className}>
      <div className={`${className}-main`}>
        {data.map((block: any) => {
          if (block.containerCode === "olimpHeader") {
            return (
              <div className={`${className}-title`}>{block.items.title}</div>
            );
          }

          if (block.containerCode === "olimpCards") {
            return (
              <div className={`${className}-spisok`}>
                {block.data
                  .filter((f: any) => f.isVisible)
                  .map((item: any) => {
                    return (
                      <NavLink
                        to={`${item.code}`}
                        key={`${className}-spisok-item_${item.id}`}
                        className={`${className}-spisok-item`}
                      >
                        {item.name}
                      </NavLink>
                    );
                  })}
              </div>
            );
          }

          if (block.containerCode === "olimpCarousel") {
            return (
              <div className={`${className}-carousel`}>
                <div className={`${className}-carousel-header`}>
                  <div className={`${className}-carousel-header-title`}>
                    {block.items.title}
                  </div>
                </div>

                <div
                  className={`${className}-carousel-button-left`}
                  onClick={() => (isAnimating ? null : prevSlide())}
                >
                  <div className={`${className}-carousel-button-left-icon`} />
                </div>

                <div
                  className={`${className}-carousel-button-right`}
                  onClick={() => (isAnimating ? null : nextSlide())}
                >
                  <div className={`${className}-carousel-button-right-icon`} />
                </div>

                <div className={`${className}-carousel-block`}>
                  <div
                    className={`${className}-carousel-slide ${
                      isAnimating
                        ? `${className}-carousel-slide-animate`
                        : `${className}-carousel-slide-nonAnimate`
                    }`}
                  >
                    <img
                      src={`/assets/olimp_presentation/${data.find((f: any) => f.containerCode === "olimpCarousel").items.data[currentSlide].link}`}
                      alt=""
                      className={`${className}-carousel-slide-content`}
                    />
                  </div>
                </div>

                <div className={`${className}-carousel-dots`}>
                  {block.items.data.map((img: any, index: number) => (
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
            );
          }

          if (block.containerCode === "olimpVideos") {
            return (
              <div className={`${className}-video`}>
                <div className={`${className}-video-tabs`}>
                  {block.data
                    .filter((f: any) => f.isVisible)
                    .map((item: any) => {
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
                    <div className={`${className}-video-title`}>
                      {activeTab.header}
                    </div>
                    {activeTab.title ? (
                      <div
                        className={`${className}-video-subtitle`}
                        dangerouslySetInnerHTML={{
                          __html: activeTab.title,
                        }}
                      />
                    ) : null}
                    <iframe
                      src={activeTab.link}
                      className={`${className}-video-iframe`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={activeTab.header}
                    />
                    {activeTab.description ? (
                      <div
                        className={`${className}-video-text`}
                        dangerouslySetInnerHTML={{
                          __html: activeTab.description,
                        }}
                      />
                    ) : null}
                  </div>
                ) : null}
              </div>
            );
          }

          if (block.containerCode === "olimpPlates") {
            return (
              <div className={`${className}-docs`}>
                {block.data
                  .filter((f: any) => f.isVisible)
                  .map((item: any) => {
                    return (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        key={`${className}-docs-item_${item.id}`}
                        className={`${className}-docs-item`}
                      >
                        <div className={`${className}-docs-item-text`}>
                          {item.name}
                        </div>
                        <div className={`${className}-docs-item-icon`} />
                      </a>
                    );
                  })}
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}
