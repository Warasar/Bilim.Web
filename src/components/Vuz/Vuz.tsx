/* eslint-disable jsx-a11y/iframe-has-title */
import React, { Fragment, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { requestGet } from "../../actions/actions";
import _ from "lodash";
import "../University/university.scss";

const className = "vuz";
const classNameUniversity = "university";

type Props = {
  data: any;
  setLoader: (e: boolean) => void;
};

export default function Vuz({ data, setLoader }: Props) {
  const [opened, setOpened] = useState<boolean>(false);
  const [selectBool, setSelectBool] = useState<any>(null);
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [searchData, setSearchData] = useState<any>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const seekTo = (seconds: number) => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({
          type: "player:setCurrentTime",
          data: {
            time: seconds,
          },
        }),
        "https://rutube.ru"
      );
    }
  };

  const search = async () => {
    setLoader(true);

    let sendString: string = "";

    if (selectBool !== null) {
      sendString += `hasDormitory=${selectBool}`;
    }

    sendString += `&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`;

    const newData: any = await requestGet(`/page/proftour/search?${sendString}`);

    newData?.forEach((item: any) => {
      item.collapse = false;

      item.faculties?.forEach((child: any) => {
        child.opened = false;

        child.directions?.forEach((direct: any) => {
          direct.opened = false;
        });
      });
    });

    setSearchData(newData);
    setLoader(false);
  };

  const cancel = () => {
    setSelectBool(null);
    setPriceRange([0, 1000000]);
    setSearchData(null);
  };

  const clickVuz = (id: number) => {
    const newData: any = _.cloneDeep(searchData);

    newData.find((f: any) => f.id === id).collapse = !newData.find((f: any) => f.id === id).collapse;

    setSearchData(newData);
  };

  const clickFakultet = (parentId: number, id: number) => {
    const newData: any = _.cloneDeep(searchData);

    newData.find((f: any) => f.id === parentId).faculties.find((f: any) => f.id === id).opened = !newData
      .find((f: any) => f.id === parentId)
      .faculties.find((f: any) => f.id === id).opened;

    setSearchData(newData);
  };

  const clickDirection = (vuzId: number, facultetId: number, id: number) => {
    const newData: any = _.cloneDeep(searchData);

    newData
      .find((f: any) => f.id === vuzId)
      .faculties.find((f: any) => f.id === facultetId)
      .directions.find((f: any) => f.id === id).opened = !newData
      .find((f: any) => f.id === vuzId)
      .faculties.find((f: any) => f.id === facultetId)
      .directions.find((f: any) => f.id === id).opened;

    setSearchData(newData);
  };

  return (
    <div className={className}>
      <div className={`${className}-main`}>
        {data.containers?.map((item: any) => {
          if (item.containerCode === "proftourTitle") {
            return <ReactMarkdown>{item.items.data.markdownText}</ReactMarkdown>;
          }

          if (item.containerCode === "proftourVideo") {
            return (
              <Fragment>
                <iframe
                  src={item.items.data.iframe}
                  className={`${className}-video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  ref={iframeRef}
                />
                <div className={`${className}-collapse`}>
                  <div className={`${className}-collapse-header`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`${className}-collapse-header-icon`}
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <div className={`${className}-collapse-header-text`}>Тайминг видео обзора:</div>
                    <div
                      className={`${className}-collapse-header-arrow${opened ? "-active" : ""}`}
                      title={opened ? "Скрыть" : "Раскрыть"}
                      onClick={() => setOpened(!opened)}
                    />
                  </div>

                  <div className={`${className}-collapse-items${opened ? `-active` : ""}`}>
                    {item.items.timings.map((child: any, index: number) => {
                      return (
                        <div
                          className={`${className}-collapse-item ${
                            child.isBold ? `${className}-collapse-item-bold` : ""
                          }`}
                          key={`${className}-collapse-item_${child.id}`}
                          onClick={() => seekTo(child.timingSecond)}
                          style={{
                            paddingTop: index === 0 ? "8px" : "4px",
                            paddingBottom: index === item.items.timings.length - 1 ? "8px" : "4px",
                          }}
                        >
                          {child.timing}&nbsp;{child.timingText}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Fragment>
            );
          }

          if (item.containerCode === "proftourText") {
            return (
              <div className={`${className}-text`}>
                <ReactMarkdown>{item.items.data.markdownText}</ReactMarkdown>
              </div>
            );
          }

          if (item.containerCode === "proftourCards") {
            return (
              <Fragment>
                <div className={`${className}-search`}>
                  <div className={`${className}-search-item`}>
                    <b className={`${className}-search-item-text`}>Есть ли общежитие:</b>

                    <div className={`${className}-search-item-text`}>Да</div>
                    <div
                      className={`${className}-search-checkbox${selectBool ? "-active" : ""}`}
                      style={{ marginLeft: "-6px" }}
                      onClick={() => {
                        setSelectBool(selectBool ? null : true);
                      }}
                    />

                    <div className={`${className}-search-item-text`}>Нет</div>
                    <div
                      className={`${className}-search-checkbox${selectBool === false ? "-active" : ""}`}
                      style={{ marginLeft: "-6px" }}
                      onClick={() => {
                        setSelectBool(selectBool === false ? null : false);
                      }}
                    />
                  </div>

                  <div className={`${className}-search-item`}>
                    <b className={`${className}-search-item-text`}>
                      Стоимость обучения: {priceRange[0]?.toLocaleString()}₸ - {priceRange[1]?.toLocaleString()}₸
                    </b>
                    <div style={{ width: "300px", marginLeft: "6px" }}>
                      <Slider
                        range
                        min={0}
                        max={1000000}
                        value={priceRange}
                        onChange={(e: any) => {
                          setPriceRange(e);
                        }}
                        trackStyle={[{ backgroundColor: "#294e6a", height: 12, top: -1 }]}
                        railStyle={{
                          backgroundColor: "#fff",
                          height: 12,
                          top: -1,
                        }}
                        handleStyle={[
                          {
                            borderColor: "#0a304b",
                            height: 16,
                            width: 16,
                            top: 2,
                            backgroundColor: "#0a304b",
                            opacity: 1,
                          },
                          {
                            borderColor: "#0a304b",
                            height: 16,
                            width: 16,
                            top: 2,
                            backgroundColor: "#0a304b",
                            opacity: 1,
                          },
                        ]}
                      />
                    </div>
                  </div>

                  <div />

                  {searchData ? (
                    <div className={`${className}-search-button`} onClick={() => cancel()} style={{ marginRight: -16 }}>
                      Отмена
                    </div>
                  ) : (
                    <div />
                  )}

                  <div className={`${className}-search-button`} onClick={() => search()}>
                    Поиск
                  </div>
                </div>

                {searchData ? (
                  <div className={`${className}-list`}>
                    {searchData.map((item: any) => {
                      return (
                        <div className={`${className}-list-item`} key={`${className}-list-item_${item.code}`}>
                          <div className={`${className}-list-item-header`}>
                            <img
                              src={`/assets/vuzes/${item.photo}`}
                              alt=""
                              className={`${className}-list-item-header-photo`}
                            />

                            <div className={`${className}-list-item-header-column`}>
                              <NavLink
                                className={`${className}-list-item-header-text`}
                                to={`${item.code}`}
                                onClick={() => {
                                  window.scrollTo({
                                    top: 0,
                                    behavior: "smooth", // для плавной прокрутки
                                  });
                                }}
                              >
                                {item.nameFull}
                              </NavLink>
                            </div>

                            <div
                              className={`${className}-list-item-header-arrow${item.collapse ? "-active" : ""}`}
                              onClick={() => clickVuz(item.id)}
                            />
                          </div>

                          {item.collapse ? (
                            <div className={`${className}-list-block`}>
                              {item.faculties?.map((faculties: any) => {
                                return (
                                  <div
                                    className={`${classNameUniversity}-fakultet-item`}
                                    key={`${classNameUniversity}-fakultet-item_${faculties.id}`}
                                  >
                                    <div className={`${classNameUniversity}-fakultet-item-grid`}>
                                      <div className={`${classNameUniversity}-fakultet-item-name`}>
                                        <ReactMarkdown>{faculties.facultyName}</ReactMarkdown>
                                      </div>
                                      <div
                                        className={`${classNameUniversity}-fakultet-item-arrow${
                                          faculties.opened ? "-active" : ""
                                        }`}
                                        onClick={() => clickFakultet(item.id, faculties.id)}
                                      />
                                    </div>

                                    <div
                                      className={`${classNameUniversity}-fakultet-items1${
                                        faculties.opened ? "-active" : ""
                                      }`}
                                    >
                                      {faculties.directions.map((direct: any) => {
                                        return (
                                          <div
                                            className={`${classNameUniversity}-fakultet-child`}
                                            key={`${classNameUniversity}-fakultet-child_${item.id}_${direct.id}`}
                                          >
                                            <div />
                                            <div className={`${classNameUniversity}-fakultet-child-header`}>
                                              <div className={`${classNameUniversity}-fakultet-child-header-grid`}>
                                                <div
                                                  className={`${classNameUniversity}-fakultet-child-header-text`}
                                                  style={{ textTransform: "uppercase" }}
                                                >
                                                  <ReactMarkdown>{direct.directionName}</ReactMarkdown>
                                                </div>
                                                <div
                                                  className={`${classNameUniversity}-fakultet-child-header-plus${
                                                    direct.opened ? "-active" : ""
                                                  }`}
                                                  onClick={() => clickDirection(item.id, faculties.id, direct.id)}
                                                />
                                              </div>

                                              <div
                                                className={`${classNameUniversity}-fakultet-child-content1${
                                                  direct.opened ? "-active" : ""
                                                }`}
                                              >
                                                <div className={`${classNameUniversity}-fakultet-child-content-text`}>
                                                  <ReactMarkdown>{direct.description}</ReactMarkdown>
                                                </div>
                                                {direct.educationPrice?.length ? (
                                                  <Fragment>
                                                    <div
                                                      className={`${classNameUniversity}-fakultet-child-content-price`}
                                                    >
                                                      СТОИМОСТЬ
                                                    </div>
                                                    <div
                                                      className={`${classNameUniversity}-fakultet-child-content-text`}
                                                    >
                                                      {direct.educationPrice}
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
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className={`${className}-vuzes`}>
                    {item.items.data.map((child: any) => {
                      return (
                        <NavLink
                          className={`${className}-vuzes-item`}
                          key={`${className}-vuzes-item_${child.code}`}
                          to={`${child.code}`}
                          onClick={() => {
                            window.scrollTo({
                              top: 0,
                              behavior: "smooth", // для плавной прокрутки
                            });
                          }}
                        >
                          <div className={`${className}-vuzes-item-container`}>
                            <img
                              src={`/assets/vuzes/${child.photo}`}
                              alt=""
                              className={`${className}-vuzes-item-photo`}
                            />
                          </div>
                          <div className={`${className}-vuzes-item-bg`} />
                          <div className={`${className}-vuzes-item-shortname`}>{child.nameShort}</div>
                          <div className={`${className}-vuzes-item-name`}>{child.nameFull}</div>
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </Fragment>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}
