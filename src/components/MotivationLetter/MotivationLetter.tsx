import React, { Fragment } from "react";
import MotivationLetterCarousel from "./MotivationLetterCarousel";

const className = "mletter";

type Props = {
  data: any;
};

export default function MotivationLetter({ data }: Props) {
  return (
    <div className={className}>
      <div className={`${className}-main`}>
        {data
          .filter((f: any) => f.isVisible)
          .map((block: any) => {
            if (block.containerCode === "mLetterHeader") {
              return (
                <Fragment>
                  <div className={`${className}-title`}>{block.items.title}</div>
                  <div className={`${className}-text`}>
                    {block.items.list.map((item: any) => {
                      return <div>{item}</div>;
                    })}
                  </div>
                  <iframe
                    src={block.items.video}
                    className={`${className}-iframe`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={block.items.title}
                  />
                  <div className={`${className}-docs`}>
                    {block.items.cards.map((item: any, index: number) => {
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
                </Fragment>
              );
            }

            if (block.containerCode === "mLetterRequirements") {
              return (
                <Fragment>
                  <div className={`${className}-title`}>{block.items.title}</div>
                  <div className={`${className}-text`} dangerouslySetInnerHTML={{ __html: block.items.content }} />
                </Fragment>
              );
            }

            if (block.containerCode === "mLetterVideo") {
              return (
                <iframe
                  src={block.items.link}
                  className={`${className}-iframe`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={"Презентация со встречи"}
                />
              );
            }

            if (
              (block.containerCode === "mLetter1Carousel" || block.containerCode === "mLetter2Carousel") &&
              block.data?.length
            ) {
              return <MotivationLetterCarousel title={block.items.title} data={block.data} />;
            }

            return null;
          })}
      </div>
    </div>
  );
}
