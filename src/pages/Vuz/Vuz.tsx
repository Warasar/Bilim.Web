/* eslint-disable jsx-a11y/iframe-has-title */
import React, { Fragment, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { requestPost } from "../../actions/actions";
import _ from "lodash";
import "../University/university.scss";
import { Select } from "antd";
import { IFilterData } from "../../types/vuz";

type Props = {
  data: any;
  setLoader: (e: boolean) => void;
  filterData: IFilterData | null;
};

export default function Vuz({ data, setLoader, filterData }: Props) {
  const [opened, setOpened] = useState<boolean>(false);
  const [openedFilter, setOpenedFilter] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [searchData, setSearchData] = useState<any>(null);
  const [filterValues, setFilterValues] = useState<any>({});
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (filterData) {
      const newFilterValues: any = {};

      filterData.filters?.forEach((item: any) => {
        newFilterValues[item.field] = [];
      });

      setFilterValues(newFilterValues);
      setPriceRange([filterData.minPrice, filterData.maxPrice]);
    }
  }, [filterData]);

  const seekTo = (seconds: number) => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({
          type: "player:setCurrentTime",
          data: {
            time: seconds,
          },
        }),
        "https://rutube.ru",
      );
    }
  };

  const search = async () => {
    setLoader(true);

    const sendObj: any = {
      maxPrice: priceRange[1],
      minPrice: priceRange[0],
      filters: [],
    };

    Object.keys(filterValues).forEach((key) => {
      if (filterValues[key]?.length) {
        sendObj.filters.push({
          field: key,
          values: filterValues[key],
        });
      }
    });

    const newData: any = await requestPost(`/proftour/search`, sendObj);

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
    const newFilterValues: any = {};
    filterData!.filters.forEach((item: any) => {
      newFilterValues[item.field] = [];
    });

    setFilterValues(newFilterValues);
    setPriceRange([filterData!.minPrice, filterData!.maxPrice]);
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

  const changeSelect = (fld: string, e: any) => {
    const newFilterValues: any = _.cloneDeep(filterValues);

    newFilterValues[fld] = e;

    setFilterValues(newFilterValues);
  };

  return (
    <div className="vuz">
      <div className={`vuz-main`}>
        {data?.map((item: any) => {
          if (item.containerCode === "proftourTitle") {
            return <ReactMarkdown>{item.items.data.markdownText}</ReactMarkdown>;
          }

          if (item.containerCode === "proftourVideo") {
            return (
              <Fragment>
                <iframe
                  src={item.items.iframe}
                  className={`vuz-video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  ref={iframeRef}
                />
                <div className={`vuz-collapse`}>
                  <div className={`vuz-collapse-header`}>
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
                      className={`vuz-collapse-header-icon`}
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <div className={`vuz-collapse-header-text`}>Тайминг видео обзора:</div>
                    <div
                      className={`vuz-collapse-header-arrow${opened ? "-active" : ""}`}
                      title={opened ? "Скрыть" : "Раскрыть"}
                      onClick={() => setOpened(!opened)}
                    />
                  </div>

                  <div className={`vuz-collapse-items${opened ? `-active` : ""}`}>
                    {item.data.map((child: any, index: number) => {
                      return (
                        <div
                          className={`vuz-collapse-item ${child.isBold ? `vuz-collapse-item-bold` : ""}`}
                          key={`vuz-collapse-item_${child.id}`}
                          onClick={() => seekTo(child.timingSecond)}
                          style={{
                            paddingTop: index === 0 ? "8px" : "4px",
                            paddingBottom: index === item.data.length - 1 ? "8px" : "4px",
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
              <div className={`vuz-text`}>
                <ReactMarkdown>{item.items.text}</ReactMarkdown>
              </div>
            );
          }

          if (item.containerCode === "proftourCards") {
            return (
              <Fragment>
                {filterData ? (
                  <div className={`vuz-collapseFilter`}>
                    <div className={`vuz-collapseFilter-header${openedFilter ? `-active` : ""}`}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M2 4.6C2 4.03995 2 3.75992 2.10899 3.54601C2.20487 3.35785 2.35785 3.20487 2.54601 3.10899C2.75992 3 3.03995 3 3.6 3H20.4C20.9601 3 21.2401 3 21.454 3.10899C21.6422 3.20487 21.7951 3.35785 21.891 3.54601C22 3.75992 22 4.03995 22 4.6V5.26939C22 5.53819 22 5.67259 21.9672 5.79756C21.938 5.90831 21.8901 6.01323 21.8255 6.10776C21.7526 6.21443 21.651 6.30245 21.4479 6.4785L15.0521 12.0215C14.849 12.1975 14.7474 12.2856 14.6745 12.3922C14.6099 12.4868 14.562 12.5917 14.5328 12.7024C14.5 12.8274 14.5 12.9618 14.5 13.2306V18.4584C14.5 18.6539 14.5 18.7517 14.4685 18.8363C14.4406 18.911 14.3953 18.9779 14.3363 19.0315C14.2695 19.0922 14.1787 19.1285 13.9971 19.2012L10.5971 20.5612C10.2296 20.7082 10.0458 20.7817 9.89827 20.751C9.76927 20.7242 9.65605 20.6476 9.58325 20.5377C9.5 20.4122 9.5 20.2142 9.5 19.8184V13.2306C9.5 12.9618 9.5 12.8274 9.46715 12.7024C9.43805 12.5917 9.39014 12.4868 9.32551 12.3922C9.25258 12.2856 9.15102 12.1975 8.94789 12.0215L2.55211 6.4785C2.34898 6.30245 2.24742 6.21443 2.17449 6.10776C2.10986 6.01323 2.06195 5.90831 2.03285 5.79756C2 5.67259 2 5.53819 2 5.26939V4.6Z"
                          stroke="#fff"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <div className={`vuz-collapse-header-text`}>Фильтры вузов:</div>
                      <div
                        className={`vuz-collapse-header-arrow${openedFilter ? "-active" : ""}`}
                        title={openedFilter ? "Скрыть" : "Раскрыть"}
                        onClick={() => setOpenedFilter(!openedFilter)}
                      />
                    </div>

                    <div className={`vuz-collapseFilter-items${openedFilter ? `-active` : ""}`}>
                      {filterData.filters
                        .filter((f: any) => f.isVisible)
                        .map((item: any) => {
                          if (item.field === "educationPrice") {
                            return (
                              <div className={`vuz-collapseFilter-item`}>
                                <b className={`vuz-collapseFilter-item-text`}>Стоимость обучения:</b>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "24px",
                                  }}
                                >
                                  <div
                                    style={{
                                      width: "20vw",
                                      marginLeft: "6px",
                                    }}
                                  >
                                    <Slider
                                      range
                                      min={filterData.minPrice}
                                      max={filterData.maxPrice}
                                      value={priceRange}
                                      onChange={(e: any) => {
                                        setPriceRange(e);
                                      }}
                                      trackStyle={[{ backgroundColor: "#294e6a", height: 12, top: 1 }]}
                                      railStyle={{
                                        backgroundColor: "#ddd",
                                        height: 12,
                                        top: 1,
                                      }}
                                      handleStyle={[
                                        {
                                          borderColor: "#0a304b",
                                          height: 16,
                                          width: 16,
                                          top: 4,
                                          backgroundColor: "#0a304b",
                                          opacity: 1,
                                        },
                                        {
                                          borderColor: "#0a304b",
                                          height: 16,
                                          width: 16,
                                          top: 4,
                                          backgroundColor: "#0a304b",
                                          opacity: 1,
                                        },
                                      ]}
                                    />
                                  </div>
                                  <b className={`vuz-collapseFilter-item-text`} style={{ textWrap: "nowrap" }}>
                                    {priceRange[0]?.toLocaleString()}₸ - {priceRange[1]?.toLocaleString()}₸
                                  </b>
                                </div>
                              </div>
                            );
                          }

                          return (
                            <div className={`vuz-collapseFilter-item`}>
                              <b className={`vuz-collapseFilter-item-text`}>{item.name}:</b>
                              <Select
                                mode="multiple"
                                placeholder="Выберите"
                                onChange={(e: any) => {
                                  changeSelect(item.field, e);
                                }}
                                style={{ width: "100%" }}
                                options={item.possibleValues.map((f: any) => ({
                                  value: f.name,
                                  label: f.name,
                                }))}
                                value={filterValues[item.field]}
                              />
                            </div>
                          );
                        })}

                      <div className={`vuz-collapseFilter-footer`}>
                        <div />
                        <div className={`vuz-search-button`} onClick={() => cancel()}>
                          Отмена
                        </div>
                        <div className={`vuz-search-button`} onClick={() => search()}>
                          Ок
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}

                {searchData ? (
                  <div className={`vuz-list`}>
                    {searchData
                      .filter((f: any) => f.isVisible)
                      .map((item: any) => {
                        return item.faculties?.length ? (
                          <div className={`vuz-list-item`} key={`vuz-list-item_${item.code}`}>
                            <div className={`vuz-list-item-header`}>
                              <img
                                src={`/assets/vuzes/${item.photo}`}
                                alt=""
                                className={`vuz-list-item-header-photo`}
                              />

                              <div className={`vuz-list-item-header-column`}>
                                <NavLink
                                  className={`vuz-list-item-header-text`}
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
                                className={`vuz-list-item-header-arrow${item.collapse ? "-active" : ""}`}
                                onClick={() => clickVuz(item.id)}
                              />
                            </div>

                            {item.collapse ? (
                              <div className={`vuz-list-block`}>
                                {item.faculties
                                  ?.filter((f: any) => f.isVisible)
                                  ?.map((faculties: any) => {
                                    return (
                                      <div
                                        className={`university-fakultet-item`}
                                        key={`university-fakultet-item_${faculties.id}`}
                                      >
                                        <div className={`university-fakultet-item-grid`}>
                                          <div className={`university-fakultet-item-name`}>
                                            <ReactMarkdown>{faculties.facultyName}</ReactMarkdown>
                                          </div>
                                          <div
                                            className={`university-fakultet-item-arrow${
                                              faculties.opened ? "-active" : ""
                                            }`}
                                            onClick={() => clickFakultet(item.id, faculties.id)}
                                          />
                                        </div>

                                        <div
                                          className={`university-fakultet-items1${faculties.opened ? "-active" : ""}`}
                                        >
                                          {faculties.directions
                                            .filter((f: any) => f.isVisible)
                                            .map((direct: any) => {
                                              return (
                                                <div
                                                  className={`university-fakultet-child`}
                                                  key={`university-fakultet-child_${item.id}_${direct.id}`}
                                                >
                                                  <div />
                                                  <div className={`university-fakultet-child-header`}>
                                                    <div className={`university-fakultet-child-header-grid`}>
                                                      <div
                                                        className={`university-fakultet-child-header-text`}
                                                        style={{ textTransform: "uppercase" }}
                                                      >
                                                        <ReactMarkdown>{direct.directionName}</ReactMarkdown>
                                                      </div>
                                                      <div
                                                        className={`university-fakultet-child-header-plus${
                                                          direct.opened ? "-active" : ""
                                                        }`}
                                                        onClick={() => clickDirection(item.id, faculties.id, direct.id)}
                                                      />
                                                    </div>

                                                    <div
                                                      className={`university-fakultet-child-content1${
                                                        direct.opened ? "-active" : ""
                                                      }`}
                                                    >
                                                      <div className={`university-fakultet-child-content-text`}>
                                                        <ReactMarkdown>{direct.description}</ReactMarkdown>
                                                      </div>
                                                      {direct.educationPrice?.length ? (
                                                        <Fragment>
                                                          <div className={`university-fakultet-child-content-price`}>
                                                            СТОИМОСТЬ
                                                          </div>
                                                          <div className={`university-fakultet-child-content-text`}>
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
                        ) : null;
                      })}
                  </div>
                ) : (
                  <div className={`vuz-vuzes`}>
                    {item.data
                      .filter((f: any) => f.isVisible)
                      .map((child: any) => {
                        return (
                          <NavLink
                            className={`vuz-vuzes-item`}
                            key={`vuz-vuzes-item_${child.code}`}
                            to={`${child.code}`}
                            onClick={() => {
                              window.scrollTo({
                                top: 0,
                                behavior: "smooth", // для плавной прокрутки
                              });
                            }}
                          >
                            <div className={`vuz-vuzes-item-container`}>
                              <img src={`/assets/vuzes/${child.photo}`} alt="" className={`vuz-vuzes-item-photo`} />
                            </div>
                            <div className={`vuz-vuzes-item-bg`} />
                            <div className={`vuz-vuzes-item-shortname`}>{child.nameShort}</div>
                            <div className={`vuz-vuzes-item-name`}>{child.nameFull}</div>
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
