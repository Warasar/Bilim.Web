/* eslint-disable jsx-a11y/iframe-has-title */
import _ from "lodash";
import React, { useEffect, useState } from "react";

type Props = {
  findData: any;
  className: string;
};

export default function University({ findData, className }: Props) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (findData) {
      setData(findData);
    }
  }, [findData]);

  const clickFakultet = (id: number) => {
    const newData: any = _.cloneDeep(data);

    newData.fakultet.data.find((f: any) => f.id === id).opened =
      !newData.fakultet.data.find((f: any) => f.id === id).opened;

    setData(newData);
  };

  const clickChild = (id: number, child_id: number) => {
    const newData: any = _.cloneDeep(data);

    newData.fakultet.data
      .find((f: any) => f.id === id)
      .items.find((f: any) => f.id === child_id).opened = !newData.fakultet.data
      .find((f: any) => f.id === id)
      .items.find((f: any) => f.id === child_id).opened;

    setData(newData);
  };

  return (
    <div className={className}>
      <div className={`${className}-main`}>
        <div className={`${className}-header`}>
          <div className={`${className}-header-left`}>
            <div className={`${className}-header-left-title`}>{data?.name}</div>
            <div className={`${className}-header-left-text`}>
              {data?.content}
            </div>
          </div>

          <iframe
            src={data?.iframe}
            className={`${className}-header-right`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className={`${className}-fakultet`}>
          <div className={`${className}-fakultet-header`}>
            <div className={`${className}-fakultet-header-title`}>
              {data?.fakultet?.title}
            </div>
          </div>

          <div className={`${className}-fakultet-content`}>
            {data?.fakultet?.data?.map((item: any) => {
              return (
                <div
                  className={`${className}-fakultet-item`}
                  key={`${className}-fakultet-item_${item.id}`}
                >
                  <div className={`${className}-fakultet-item-grid`}>
                    <div className={`${className}-fakultet-item-name`}>
                      {item.name}
                    </div>
                    <div
                      className={`${className}-fakultet-item-arrow${
                        item.opened ? "-active" : ""
                      }`}
                      onClick={() => clickFakultet(item.id)}
                    />
                  </div>

                  <div
                    className={`${className}-fakultet-items${
                      item.opened ? "-active" : ""
                    }`}
                  >
                    {item.items.map((child: any) => {
                      return (
                        <div className={`${className}-fakultet-child`}>
                          <div />
                          <div className={`${className}-fakultet-child-header`}>
                            <div
                              className={`${className}-fakultet-child-header-grid`}
                            >
                              <div
                                className={`${className}-fakultet-child-header-text`}
                              >
                                {child.name}
                              </div>
                              <div
                                className={`${className}-fakultet-child-header-plus${
                                  child.opened ? "-active" : ""
                                }`}
                                onClick={() => clickChild(item.id, child.id)}
                              />
                            </div>

                            <div
                              className={`${className}-fakultet-child-content${
                                child.opened ? "-active" : ""
                              }`}
                            >
                              <div
                                className={`${className}-fakultet-child-content-text`}
                              >
                                {child.text}
                              </div>
                              <div
                                className={`${className}-fakultet-child-content-price`}
                              >
                                СТОИМОСТЬ
                              </div>
                              <div
                                className={`${className}-fakultet-child-content-text`}
                              >
                                {child.price}
                              </div>
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
      </div>
    </div>
  );
}
