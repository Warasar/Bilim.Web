import React, { useState } from "react";
import { Image } from "antd";
import emptyPic from "../../assets/icons/default/emptyPic.png";

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
    <div className={`mletter-carousel`}>
      <div className={`mletter-carousel-header`}>
        <div className={`mletter-carousel-header-title`}>{title}</div>
      </div>

      <div className={`mletter-carousel-button-left`} onClick={() => (isAnimating ? null : prevSlide())}>
        <div className={`mletter-carousel-button-left-icon`} />
      </div>

      <div className={`mletter-carousel-button-right`} onClick={() => (isAnimating ? null : nextSlide())}>
        <div className={`mletter-carousel-button-right-icon`} />
      </div>

      <div className={`mletter-carousel-block`}>
        <div
          className={`mletter-carousel-slide ${
            isAnimating ? `mletter-carousel-slide-animate` : `mletter-carousel-slide-nonAnimate`
          }`}
        >
          <Image
            className={`mletter-carousel-slide-content`}
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

      <div className={`mletter-carousel-dots`}>
        {data.map((img: any, index: number) => (
          <div
            key={index}
            onClick={() => (isAnimating ? null : goToSlide(index))}
            className={`mletter-carousel-dots-button ${
              index === currentSlide ? `mletter-carousel-dots-button-current` : `mletter-carousel-dots-button-nocurrent`
            } ${isAnimating ? "pointer-events-none" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
