import React, { useState } from "react";
import { Image } from "antd";
import emptyPic from "../../assets/icons/default/emptyPic.png";

type Props = {
  title: string;
  data: any[];
};

export default function OlimpCarousel({ title, data }: Props) {
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

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
      setCurrentSlide((prev) => (prev + 1) % data.length);
      setIsAnimating(false);
    }, 150);
  };

  const prevSlide = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + data.length) % data.length);
      setIsAnimating(false);
    }, 150);
  };

  return (
    <div className={`olimp-carousel`}>
      <div className={`olimp-carousel-header`}>
        <div className={`olimp-carousel-header-title`}>{title}</div>
      </div>

      <div className={`olimp-carousel-button-left`} onClick={() => (isAnimating ? null : prevSlide())}>
        <div className={`olimp-carousel-button-left-icon`} />
      </div>

      <div className={`olimp-carousel-button-right`} onClick={() => (isAnimating ? null : nextSlide())}>
        <div className={`olimp-carousel-button-right-icon`} />
      </div>

      <div className={`olimp-carousel-block`}>
        <div
          className={`olimp-carousel-slide ${
            isAnimating ? `olimp-carousel-slide-animate` : `olimp-carousel-slide-nonAnimate`
          }`}
        >
          <Image
            className={`olimp-carousel-slide-content`}
            src={`${data[currentSlide].image}`}
            style={{
              objectFit: "cover",
              overflow: "hidden",
              objectPosition: "top",
            }}
            preview={false}
            fallback={emptyPic}
          />
        </div>
      </div>

      <div className={`olimp-carousel-dots`}>
        {data.map((img: any, index: number) => (
          <div
            key={index}
            onClick={() => (isAnimating ? null : goToSlide(index))}
            className={`olimp-carousel-dots-button ${
              index === currentSlide ? `olimp-carousel-dots-button-current` : `olimp-carousel-dots-button-nocurrent`
            } ${isAnimating ? "pointer-events-none" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
