/* eslint-disable jsx-a11y/iframe-has-title */
import React, { Fragment, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import OlimpCarousel from "../Olimp/OlimpCarousel";

const className = "olimpvuz";

type Props = {
  data: any;
};

export default function OlimpVuz({ data }: Props) {
  const [activeTab, setActiveTab] = useState<any>(null);

  useEffect(() => {
    if (data && data.some((f: any) => f.itemType === "multiwindow")) {
      setActiveTab(data.find((f: any) => f.itemType === "multiwindow").contents[0]);
    }
  }, [data]);

  return (
    <div className={className}>
      {data?.length ? (
        <div className={`${className}-main`}>
          {data.map((block: any) => {
            if (block.itemType === "banner") {
              return (
                <div className={`${className}-dop`}>
                  <div className={`${className}-dop-title`}>{block.title}</div>
                  {block.text ? <div className={`${className}-dop-subtitle`}>{block.text}</div> : null}
                </div>
              );
            }

            if (block.itemType === "header") {
              return (
                <Fragment>
                  <div className={`${className}-title`}>{block.title}</div>
                  <div className={`${className}-subtitle`}>{block.text}</div>
                  <div className={`${className}-docs`}>
                    {block.contents
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
                            <div className={`${className}-docs-item-text`}>{item.name}</div>
                            <div className={`${className}-docs-item-icon`} />
                          </a>
                        );
                      })}
                  </div>
                </Fragment>
              );
            }

            if (block.itemType === "multiwindow") {
              return (
                <div className={`${className}-video`}>
                  <div className={`${className}-video-header`}>
                    <div className={`${className}-video-tabs`}>
                      {block.contents.map((item: any) => {
                        return (
                          <div
                            className={`${className}-video-tabs-item${activeTab?.id === item.id ? "-active" : ""}`}
                            key={`${className}-video-tabs-item_${item.id}`}
                            onClick={() => setActiveTab(item)}
                          >
                            {item.optionName}
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
                        src={activeTab.video}
                        className={`${className}-video-iframe`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={activeTab.title}
                      />

                      {activeTab.buttons?.length ? (
                        <div className={`${className}-video-docs`}>
                          {activeTab.buttons.map((item: any) => {
                            return (
                              <a
                                href={item.link}
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
              );
            }

            if (block.itemType === "video") {
              return (
                <div className={`${className}-video`}>
                  <div className={`${className}-video-header`}>
                    <div className={`${className}-video-header-title`}>{block.title}</div>
                  </div>
                  <div className={`${className}-video-content`}>
                    <iframe
                      style={{ marginTop: "12px" }}
                      src={block.contents.link}
                      className={`${className}-video-iframe`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={block.title}
                    />
                  </div>
                </div>
              );
            }

            if (block.itemType === "carousel") {
              return (
                <div style={{ marginTop: "20px", width: "100%" }}>
                  <OlimpCarousel title={block.title} data={block.contents} />
                </div>
              );
            }

            if (block.itemType === "list") {
              return (
                <div className={`university-item`}>
                  <div className={`university-item-header`}>
                    <div className={`university-item-header-title`}>{block.title}</div>
                    {block.subtitle ? <div className={`university-item-header-subtitle`}>{block.subtitle}</div> : null}
                  </div>
                  <div className={`university-dormitory`}>
                    <div className={`university-dormitory-items`}>
                      {block.contents
                        .filter((f: any) => f.isVisible)
                        .map((content: any) => {
                          return (
                            <div
                              className={`university-steps-item-block`}
                              key={`university-steps-item-block_${content.id}`}
                            >
                              <div className={`university-steps-item-block-icon`} />
                              <div className={`university-steps-item-block-texts`}>
                                {content.title?.length ? (
                                  <div className={`university-steps-item-block-title`}>{content.title}</div>
                                ) : null}
                                {content.content?.length ? (
                                  <div
                                    className={`university-steps-item-block-content`}
                                    dangerouslySetInnerHTML={{ __html: content.content }}
                                  />
                                ) : null}
                                {content.video ? (
                                  <iframe
                                    src={content.video}
                                    className={`university-dormitory-iframe`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                  />
                                ) : null}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              );
            }

            return null;
          })}
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
