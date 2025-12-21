import React, { useState } from "react";

const className = "mletter";

type Props = {
  data: any;
};

export default function MotivationLetter({ data }: Props) {
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isAnimating2, setIsAnimating2] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [currentSlide2, setCurrentSlide2] = useState<number>(0);

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
        (prev) => (prev + 1) % data.presentation.carousel1.items.length
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
          (prev - 1 + data.presentation.carousel1.items.length) %
          data.presentation.carousel1.items.length
      );
      setIsAnimating(false);
    }, 150);
  };

  const goToSlideSecond = (index: number) => {
    if (isAnimating2 || index === currentSlide2) return;
    setIsAnimating2(true);
    setTimeout(() => {
      setCurrentSlide2(index);
      setIsAnimating2(false);
    }, 150);
  };

  const nextSlideSecond = () => {
    if (isAnimating2) return;

    setIsAnimating2(true);

    setTimeout(() => {
      setCurrentSlide2(
        (prev) => (prev + 1) % data.presentation.carousel2.items.length
      );
      setIsAnimating2(false);
    }, 150);
  };

  const prevSlideSecond = () => {
    if (isAnimating2) return;

    setIsAnimating2(true);

    setTimeout(() => {
      setCurrentSlide2(
        (prev) =>
          (prev - 1 + data.presentation.carousel2.items.length) %
          data.presentation.carousel2.items.length
      );
      setIsAnimating2(false);
    }, 150);
  };

  return (
    <div className={className}>
      <div className={`${className}-main`}>
        {/* header */}
        <div className={`${className}-title`}>{data.header.title}</div>
        <div className={`${className}-text`}>
          {data.header.list.map((item: any) => {
            return <div>{item}</div>;
          })}
        </div>
        <iframe
          src={data.header.video}
          className={`${className}-iframe`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={data.header.title}
        />
        <div className={`${className}-docs`}>
          {data.header.cards.map((item: any, index: number) => {
            return (
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                key={`${className}-docs-item_${index}`}
                className={`${className}-docs-item`}
              >
                <div className={`${className}-docs-item-text`}>{item.name}</div>
                <div className={`${className}-docs-item-icon`} />
              </a>
            );
          })}
        </div>

        {/* requirements */}
        <div className={`${className}-title`}>{data.requirements.title}</div>
        <div
          className={`${className}-text`}
          dangerouslySetInnerHTML={{ __html: data.requirements.content }}
        />

        <div className={`${className}-title`} style={{ marginTop: "60px" }}>
          Презентация со встречи
        </div>
        <iframe
          src={data.presentation.video}
          className={`${className}-iframe`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={"Презентация со встречи"}
        />

        <div className={`${className}-carousel`}>
          <div className={`${className}-carousel-header`}>
            <div className={`${className}-carousel-header-title`}>
              {data.presentation.carousel1.title}
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
                src={`/assets/mletter/presentation/${data.presentation.carousel1.items[currentSlide].link}`}
                alt=""
                className={`${className}-carousel-slide-content`}
              />
            </div>
          </div>

          <div className={`${className}-carousel-dots`}>
            {data.presentation.carousel1.items.map(
              (img: any, index: number) => (
                <div
                  key={index}
                  onClick={() => (isAnimating ? null : goToSlide(index))}
                  className={`${className}-carousel-dots-button ${
                    index === currentSlide
                      ? `${className}-carousel-dots-button-current`
                      : `${className}-carousel-dots-button-nocurrent`
                  } ${isAnimating ? "pointer-events-none" : ""}`}
                />
              )
            )}
          </div>
        </div>

        <div className={`${className}-carousel`}>
          <div className={`${className}-carousel-header`}>
            <div className={`${className}-carousel-header-title`}>
              {data.presentation.carousel2.title}
            </div>
          </div>

          <div
            className={`${className}-carousel-button-left`}
            onClick={() => (isAnimating2 ? null : prevSlideSecond())}
          >
            <div className={`${className}-carousel-button-left-icon`} />
          </div>

          <div
            className={`${className}-carousel-button-right`}
            onClick={() => (isAnimating2 ? null : nextSlideSecond())}
          >
            <div className={`${className}-carousel-button-right-icon`} />
          </div>

          <div className={`${className}-carousel-block`}>
            <div
              className={`${className}-carousel-slide ${
                isAnimating2
                  ? `${className}-carousel-slide-animate`
                  : `${className}-carousel-slide-nonAnimate`
              }`}
            >
              <img
                src={`/assets/mletter/example/${data.presentation.carousel2.items[currentSlide2].link}`}
                alt=""
                className={`${className}-carousel-slide-content`}
              />
            </div>
          </div>

          <div className={`${className}-carousel-dots`}>
            {data.presentation.carousel2.items.map(
              (img: any, index: number) => (
                <div
                  key={index}
                  onClick={() => (isAnimating2 ? null : goToSlideSecond(index))}
                  className={`${className}-carousel-dots-button ${
                    index === currentSlide2
                      ? `${className}-carousel-dots-button-current`
                      : `${className}-carousel-dots-button-nocurrent`
                  } ${isAnimating2 ? "pointer-events-none" : ""}`}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
