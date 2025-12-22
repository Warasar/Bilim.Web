import React, { useState } from "react";
import { Image } from "antd";
import emptyPic from "../../assets/icons/default/emptyPic.png";

const className = "mletter";

type Props = {
  title: string;
  data: any[];
};

export default function MotivationLetterCarousel({ title, data }: Props) {
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
    <div className={`${className}-carousel`}>
      <div className={`${className}-carousel-header`}>
        <div className={`${className}-carousel-header-title`}>{title}</div>
      </div>

      <div className={`${className}-carousel-button-left`} onClick={() => (isAnimating ? null : prevSlide())}>
        <div className={`${className}-carousel-button-left-icon`} />
      </div>

      <div className={`${className}-carousel-button-right`} onClick={() => (isAnimating ? null : nextSlide())}>
        <div className={`${className}-carousel-button-right-icon`} />
      </div>

      <div className={`${className}-carousel-block`}>
        <div
          className={`${className}-carousel-slide ${
            isAnimating ? `${className}-carousel-slide-animate` : `${className}-carousel-slide-nonAnimate`
          }`}
        >
          <Image
            className={`${className}-carousel-slide-content`}
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

      <div className={`${className}-carousel-dots`}>
        {data.map((img: any, index: number) => (
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
