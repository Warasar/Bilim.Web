/* eslint-disable jsx-a11y/iframe-has-title */
import _ from "lodash";
import React, { Fragment, useEffect, useState } from "react";

type Props = {
  findData: any;
  className: string;
};

export default function University({ findData, className }: Props) {
  const [data, setData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (findData) {
      setData(findData);
    }
  }, [findData]);

  const clickFakultet = (id: number) => {
    const newData: any = _.cloneDeep(data);

    newData.fakultet.data.find((f: any) => f.id === id).opened = !newData.fakultet.data.find((f: any) => f.id === id)
      .opened;

    setData(newData);
  };

  const clickChild = (id: number, child_id: number) => {
    const newData: any = _.cloneDeep(data);

    newData.fakultet.data.find((f: any) => f.id === id).items.find((f: any) => f.id === child_id).opened =
      !newData.fakultet.data.find((f: any) => f.id === id).items.find((f: any) => f.id === child_id).opened;

    setData(newData);
  };

  const renderTabItem = (activeItem: any) => {
    return activeItem ? (
      <div className={`${className}-steps-item`}>
        <div className={`${className}-steps-item-title`}>{activeItem.title}</div>
        <div className={`${className}-steps-item-subtitle`}>{activeItem.subtitle}</div>
        <div className={`${className}-steps-item-grid`}>
          {activeItem.items.map((item: any) => {
            return item.content ? renderBlockItem(item) : null;
          })}
        </div>
      </div>
    ) : null;
  };

  const renderBlockItem = (item: any, cmd?: "docs") => {
    return (
      <div className={`${className}-steps-item-block`} key={`${className}-steps-item-block_${item.id}`}>
        {cmd === "docs" ? (
          <div className={`${className}-docs-circle`}>{item.id + 1}</div>
        ) : (
          <div className={`${className}-steps-item-block-icon`} />
        )}
        <div className={`${className}-steps-item-block-texts`}>
          {item.title?.length ? <div className={`${className}-steps-item-block-title`}>{item.title}</div> : null}
          <div className={`${className}-steps-item-block-content`}>{item.content}</div>
        </div>
      </div>
    );
  };

  const getGrid = (length: number) => {
    const style: React.CSSProperties = {};

    style.gridTemplateColumns = `repeat(${length}, 1fr)`;

    return style;
  };

  const getLine = (length: number) => {
    const style: React.CSSProperties = {};

    if (length === 2) {
      style.left = `25%`;
      style.right = `25%`;
    } else if (length === 3) {
      style.left = `15%`;
      style.right = `15%`;
    } else if (length === 4) {
      style.left = `12%`;
      style.right = `12%`;
    } else if (length === 6) {
      style.left = `7%`;
      style.right = `7%`;
    } else if (length === 7) {
      style.left = `5%`;
      style.right = `5%`;
    }

    return style;
  };

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
      setCurrentSlide((prev) => (prev + 1) % data.dormitory.imgs.length);
      setIsAnimating(false);
    }, 150);
  };

  const prevSlide = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + data.dormitory.imgs.length) % data.dormitory.imgs.length);
      setIsAnimating(false);
    }, 150);
  };

  return (
    <div className={className}>
      {data ? (
        <div className={`${className}-main`}>
          <div className={`${className}-header`}>
            <div className={`${className}-header-left`}>
              <div className={`${className}-header-left-title`}>{data?.name}</div>
              <div className={`${className}-header-left-text`}>{data?.content}</div>
            </div>

            <iframe
              src={data?.iframe}
              className={`${className}-header-right`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {data.fakultet ? (
            <div className={`${className}-fakultet`} id={"vuz_fakultet"}>
              <div className={`${className}-fakultet-header`}>
                <div className={`${className}-fakultet-header-title`}>{data?.fakultet?.title}</div>
              </div>

              <div className={`${className}-fakultet-content`}>
                {data.fakultet.data.map((item: any) => {
                  return (
                    <div className={`${className}-fakultet-item`} key={`${className}-fakultet-item_${item.id}`}>
                      <div className={`${className}-fakultet-item-grid`}>
                        <div className={`${className}-fakultet-item-name`}>{item.name}</div>
                        <div
                          className={`${className}-fakultet-item-arrow${item.opened ? "-active" : ""}`}
                          onClick={() => clickFakultet(item.id)}
                        />
                      </div>

                      <div className={`${className}-fakultet-items${item.opened ? "-active" : ""}`}>
                        {item.items.map((child: any) => {
                          return (
                            <div
                              className={`${className}-fakultet-child`}
                              key={`${className}-fakultet-child_${item.id}_${child.id}`}
                            >
                              <div />
                              <div className={`${className}-fakultet-child-header`}>
                                <div className={`${className}-fakultet-child-header-grid`}>
                                  <div className={`${className}-fakultet-child-header-text`}>{child.name}</div>
                                  <div
                                    className={`${className}-fakultet-child-header-plus${
                                      child.opened ? "-active" : ""
                                    }`}
                                    onClick={() => clickChild(item.id, child.id)}
                                  />
                                </div>

                                <div className={`${className}-fakultet-child-content${child.opened ? "-active" : ""}`}>
                                  <div className={`${className}-fakultet-child-content-text`}>{child.text}</div>
                                  {child.price?.length ? (
                                    <Fragment>
                                      <div className={`${className}-fakultet-child-content-price`}>СТОИМОСТЬ</div>
                                      <div className={`${className}-fakultet-child-content-text`}>{child.price}</div>
                                    </Fragment>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}

          {data.prices ? (
            <div className={`${className}-prices`} id={"vuz_prices"}>
              <div className={`${className}-prices-title`}>
                {data.prices.title}
                {data.prices.subtitle?.length ? (
                  <div className={`${className}-prices-subtitle`}>{data.prices.subtitle}</div>
                ) : null}
              </div>
              <div className={`${className}-prices-content`}>
                <div className={`${className}-prices-items`}>
                  {data.prices.items.map((item: any) => {
                    return (
                      <div className={`${className}-prices-item`}>
                        <div className={`${className}-prices-item-names`}>
                          {item.names.map((name: string) => {
                            return <div className={`${className}-prices-item-names-text`}>{name}</div>;
                          })}
                        </div>
                        <div className={`${className}-prices-item-price`}>{item.price}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : null}

          {data.steps ? (
            <div className={`${className}-steps`} id={"vuz_steps"}>
              <div className={`${className}-steps-title`}>{data.steps.title}</div>
              <div className={`${className}-steps-content`}>
                <div className={`${className}-steps-tabs`} style={getGrid(data.steps.tabs.length)}>
                  <div className={`${className}-steps-tab-line`} style={getLine(data.steps.tabs.length)} />
                  {data.steps.tabs.map((item: any, index: number) => {
                    return (
                      <div className={`${className}-steps-tab`} key={`${className}-steps-tab_${item.id}`}>
                        <div className={`${className}-steps-tab-center`}>
                          <div
                            className={`${className}-steps-tab-circle${
                              activeTab === index ? ` ${className}-steps-tab-circle-active` : ""
                            }`}
                            onClick={() => setActiveTab(index)}
                          >
                            <div className={`${className}-steps-tab-circle-number`}>{index + 1}</div>
                          </div>
                        </div>

                        <div className={`${className}-steps-tab-title`}>{item.title}</div>
                        <div className={`${className}-steps-tab-subtitle`}>{item.subtitle}</div>
                      </div>
                    );
                  })}
                </div>

                {renderTabItem(data.steps.tabs.find((f: any) => f.id === activeTab))}
              </div>
            </div>
          ) : null}

          {data.criteria ? (
            <div className={`${className}-dormitory`} id={data.steps ? "vuz_criteria" : "vuz_steps"}>
              <div className={`${className}-dormitory-title`}>{data.criteria.title}</div>
              <div className={`${className}-dormitory-content`}>
                <div className={`${className}-dormitory-items`}>
                  {data.criteria.items.map((item: any) => {
                    return renderBlockItem(item);
                  })}
                </div>
              </div>
            </div>
          ) : null}

          {data.dormitory ? (
            <div className={`${className}-dormitory`} id={"vuz_dormitory"}>
              <div className={`${className}-dormitory-title`}>
                {data.dormitory.title}
                {data.dormitory.subtitle?.length ? (
                  <div className={`${className}-dormitory-subtitle`}>{data.dormitory.subtitle}</div>
                ) : null}
              </div>
              <div className={`${className}-dormitory-content`}>
                {data.dormitory.text ? (
                  <div className={`${className}-dormitory-text`}>{data.dormitory.text}</div>
                ) : null}
                {data.dormitory.iframe ? (
                  <iframe
                    src={data.dormitory.iframe}
                    className={`${className}-dormitory-iframe`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : null}
                <div className={`${className}-dormitory-items`}>
                  {data.dormitory.items.map((item: any) => {
                    return renderBlockItem(item);
                  })}
                </div>
                {data.dormitory.imgs?.length ? (
                  <Fragment>
                    <div className={`${className}-dormitory-carousel`}>
                      {/* влево вправо кнопки */}
                      <div
                        className={`${className}-dormitory-button-left`}
                        onClick={() => (isAnimating ? null : prevSlide())}
                      >
                        <div className={`${className}-dormitory-button-left-icon`} />
                      </div>

                      <div
                        className={`${className}-dormitory-button-right`}
                        onClick={() => (isAnimating ? null : nextSlide())}
                      >
                        <div className={`${className}-dormitory-button-right-icon`} />
                      </div>

                      {/* контент */}
                      <div
                        className={`${className}-dormitory-slide ${
                          isAnimating
                            ? `${className}-dormitory-slide-animate`
                            : `${className}-dormitory-slide-nonAnimate`
                        }`}
                      >
                        <img
                          src={`/assets/caspianuniversity/${data.dormitory.imgs[currentSlide].link}`}
                          alt=""
                          className={`${className}-dormitory-slide-content`}
                        />
                      </div>

                      {/* точки */}
                      <div className={`${className}-dormitory-dots`}>
                        {data.dormitory.imgs.map((img: any, index: number) => (
                          <div
                            key={index}
                            onClick={() => (isAnimating ? null : goToSlide(index))}
                            className={`${className}-dormitory-dots-button ${
                              index === currentSlide
                                ? `${className}-dormitory-dots-button-current`
                                : `${className}-dormitory-dots-button-nocurrent`
                            } ${isAnimating ? "pointer-events-none" : ""}`}
                          />
                        ))}
                      </div>
                    </div>
                  </Fragment>
                ) : null}
              </div>
            </div>
          ) : null}

          {data.docs ? (
            <div className={`${className}-docs`} id={"vuz_docs"}>
              <div className={`${className}-docs-title`}>{data.docs.title}</div>
              <div className={`${className}-docs-content`}>
                <div className={`${className}-docs-items`}>
                  {data.docs.items.map((item: any) => {
                    return renderBlockItem(item, "docs");
                  })}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
