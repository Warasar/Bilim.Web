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

    newData.fakultet.data.find((f: any) => f.id === id).opened = !newData.fakultet.data.find((f: any) => f.id === id)
      .opened;

    setData(newData);
  };

  return (
    <div className={className}>
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

        <div className={`${className}-fakultet`}>
          <div className={`${className}-fakultet-header`}>
            <div className={`${className}-fakultet-header-title`}>{data?.fakultet?.title}</div>
          </div>

          <div className={`${className}-fakultet-content`}>
            {data?.fakultet?.data?.map((item: any) => {
              return (
                <div className={`${className}-fakultet-item`} key={`${className}-fakultet-item_${item.id}`}>
                  <div className={`${className}-fakultet-item-name`}>{item.name}</div>
                  <div
                    className={`${className}-fakultet-item-arrow${item.opened ? "-active" : ""}`}
                    onClick={() => clickFakultet(item.id)}
                  />
                  <div className={`${className}-fakultet-items${item.opened ? "-active" : ""}`}></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
