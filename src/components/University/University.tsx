/* eslint-disable jsx-a11y/iframe-has-title */
import _ from "lodash";
import React, { Fragment, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

type Props = {
  findData: any;
  className: string;
};

export default function University({ findData, className }: Props) {
  const [data, setData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<number>(0);

  useEffect(() => {
    if (findData) {
      setData(findData);
      setActiveTab(
        findData.find((f: any) => f.itemType === "steps")?.contents?.filter((f: any) => f.isVisible)?.[0]?.id
      );
    }
  }, [findData]);

  const clickContent = (item: any, content: any) => {
    const newData: any = _.cloneDeep(data);

    newData.find((f: any) => f.id === item.id).contents.find((f: any) => f.id === content.id).opened = !content.opened;

    setData(newData);
  };

  const clickDescription = (item: any, content: any, direction: any) => {
    const newData: any = _.cloneDeep(data);

    newData
      .find((f: any) => f.id === item.id)
      .contents.find((f: any) => f.id === content.id)
      .directions.find((f: any) => f.id === direction.id).opened = !direction.opened;

    setData(newData);
  };

  const renderActiveStep = (activeStep: any) => {
    return activeStep ? (
      <div className={`${className}-steps-item`}>
        <div className={`${className}-steps-item-title`}>{activeStep.stepTitle}</div>
        <div className={`${className}-steps-item-subtitle`}>{activeStep.stepDescription}</div>
        <div className={`${className}-steps-item-grid`}>
          {activeStep.items.map((item: any) => {
            return renderStepItem(item);
          })}
        </div>
      </div>
    ) : null;
  };

  const renderStepItem = (item: any) => {
    return (
      <div className={`${className}-steps-item-block`} key={`${className}-steps-item-block_${item.id}`}>
        <div className={`${className}-steps-item-block-icon`} />
        <div className={`${className}-steps-item-block-texts`}>
          {item.title?.length ? <div className={`${className}-steps-item-block-title`}>{item.title}</div> : null}
          <div
            className={`${className}-steps-item-block-content`}
            dangerouslySetInnerHTML={{ __html: item.contents }}
          />
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

  return (
    <div className={className}>
      {data?.length ? (
        <div className={`${className}-main`}>
          {data.map((item: any) => {
            if (item.itemType === "header") {
              return (
                <div className={`${className}-header`}>
                  <div className={`${className}-header-left`}>
                    <div className={`${className}-header-left-title`}>{item.contents.title}</div>
                    {item.contents.subtitle?.length && (
                      <div className={`${className}-header-left-text`}>{item.contents.subtitle}</div>
                    )}
                    {item.contents.description?.length && (
                      <div
                        className={`${className}-header-left-text`}
                        dangerouslySetInnerHTML={{ __html: item.contents.description }}
                      />
                    )}
                  </div>

                  <iframe
                    src={item.contents.video}
                    className={`${className}-header-right`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              );
            }

            return (
              <div className={`${className}-item`} id={`vuz_${item.id}`}>
                <div className={`${className}-item-header`}>
                  <div className={`${className}-item-header-title`}>{item.title}</div>
                  {item.subtitle ? <div className={`${className}-item-header-subtitle`}>{item.subtitle}</div> : null}
                </div>

                {item.itemType === "faculties" ? (
                  <div className={`${className}-fakultet`}>
                    {item.contents
                      .filter((f: any) => f.isVisible)
                      .map((content: any) => {
                        return (
                          <div
                            className={`${className}-fakultet-item`}
                            key={`${className}-fakultet-item_${content.id}`}
                          >
                            <div className={`${className}-fakultet-item-grid`}>
                              <div className={`${className}-fakultet-item-name`}>
                                <ReactMarkdown>{content.facultyName}</ReactMarkdown>
                              </div>
                              <div
                                className={`${className}-fakultet-item-arrow${content.opened ? "-active" : ""}`}
                                onClick={() => clickContent(item, content)}
                              />
                            </div>
                            <div className={`${className}-fakultet-items${content.opened ? "-active" : ""}`}>
                              {content.directions
                                .filter((f: any) => f.isVisible)
                                .map((direction: any) => {
                                  return (
                                    <div
                                      className={`${className}-fakultet-child`}
                                      key={`${className}-fakultet-child_${content.id}_${direction.id}`}
                                    >
                                      <div />
                                      <div className={`${className}-fakultet-child-header`}>
                                        <div className={`${className}-fakultet-child-header-grid`}>
                                          <div
                                            className={`${className}-fakultet-child-header-text`}
                                            style={{ textTransform: "uppercase" }}
                                          >
                                            <ReactMarkdown>{direction.directionName}</ReactMarkdown>
                                          </div>
                                          <div
                                            className={`${className}-fakultet-child-header-plus${
                                              direction.opened ? "-active" : ""
                                            }`}
                                            onClick={() => clickDescription(item, content, direction)}
                                          />
                                        </div>
                                        <div
                                          className={`${className}-fakultet-child-content${direction.opened ? "-active" : ""}`}
                                        >
                                          <div className={`${className}-fakultet-child-content-text`}>
                                            {direction.description}
                                          </div>
                                          {direction.educationPrice?.length ? (
                                            <Fragment>
                                              <div className={`${className}-fakultet-child-content-price`}>
                                                СТОИМОСТЬ
                                              </div>
                                              <div className={`${className}-fakultet-child-content-text`}>
                                                {direction.educationPrice}
                                              </div>
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
                ) : item.itemType === "steps" ? (
                  <div className={`${className}-steps`}>
                    <div
                      className={`${className}-steps-tabs`}
                      style={getGrid(item.contents.filter((f: any) => f.isVisible).length)}
                    >
                      <div
                        className={`${className}-steps-tab-line`}
                        style={getLine(item.contents.filter((f: any) => f.isVisible).length)}
                      />
                      {item.contents
                        .filter((f: any) => f.isVisible)
                        .map((content: any) => {
                          return (
                            <div className={`${className}-steps-tab`} key={`${className}-steps-tab_${content.id}`}>
                              <div className={`${className}-steps-tab-center`}>
                                <div
                                  className={`${className}-steps-tab-circle${
                                    activeTab === content.id ? ` ${className}-steps-tab-circle-active` : ""
                                  }`}
                                  onClick={() => setActiveTab(content.id)}
                                >
                                  <div className={`${className}-steps-tab-circle-number`}>{content.stepNumber}</div>
                                </div>
                              </div>

                              <div className={`${className}-steps-tab-title`}>{content.stepTitle}</div>
                              <div className={`${className}-steps-tab-subtitle`}>{content.stepDescription}</div>
                            </div>
                          );
                        })}
                    </div>

                    {renderActiveStep(item.contents.find((f: any) => f.id === activeTab))}
                  </div>
                ) : item.itemType === "list" ? (
                  <div className={`${className}-dormitory`}>
                    <div className={`${className}-dormitory-items`}>
                      {item.contents
                        .filter((f: any) => f.isVisible)
                        .map((content: any) => {
                          return (
                            <div
                              className={`${className}-steps-item-block`}
                              key={`${className}-steps-item-block_${content.id}`}
                            >
                              <div className={`${className}-steps-item-block-icon`} />
                              <div className={`${className}-steps-item-block-texts`}>
                                {content.title?.length ? (
                                  <div className={`${className}-steps-item-block-title`}>{content.title}</div>
                                ) : null}
                                {content.content?.length ? (
                                  <div
                                    className={`${className}-steps-item-block-content`}
                                    dangerouslySetInnerHTML={{ __html: content.content }}
                                  />
                                ) : null}
                                {content.video ? (
                                  <iframe
                                    src={content.video}
                                    className={`${className}-dormitory-iframe`}
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
                ) : item.itemType === "enum" ? (
                  <div className={`${className}-docs`}>
                    <div className={`${className}-docs-items`}>
                      {item.contents
                        .filter((f: any) => f.isVisible)
                        .map((content: any) => {
                          return (
                            <div
                              className={`${className}-steps-item-block`}
                              key={`${className}-steps-item-block_${content.id}`}
                            >
                              <div className={`${className}-docs-circle`}>{content.pointNum}</div>
                              <div className={`${className}-steps-item-block-texts`}>
                                <div
                                  className={`${className}-steps-item-block-content`}
                                  dangerouslySetInnerHTML={{ __html: content.pointContent }}
                                />
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
