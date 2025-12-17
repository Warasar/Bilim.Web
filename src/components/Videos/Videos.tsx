import _ from "lodash";
import React from "react";

type Props = {
  data: any;
  setData: (newData: any) => void;
};

export default function Videos({ data, setData }: Props) {
  const clickFakultet = (id: number) => {
    const newData: any = _.cloneDeep(data);

    newData.find((f: any) => f.id === id).opened = !newData.find((f: any) => f.id === id).opened;

    setData(newData);
  };

  return (
    <div className="videos">
      <div className="videos-main">
        <div className="videos-title">Записи с прошлых встреч</div>

        <div className="videos-items">
          {data
            ?.filter((f: any) => f.isVisible)
            ?.map((item: any) => {
              return (
                <div className="videos-item">
                  <div className={`videos-item-header`}>
                    <div className={`videos-item-header-name`}>{item.title}</div>
                    <div
                      className={`videos-item-header-arrow${item.opened ? "-active" : ""}`}
                      onClick={() => clickFakultet(item.id)}
                    />
                  </div>

                  {item.opened ? (
                    <div className="videos-item-content">
                      <div className="videos-item-subtitle">{item.subtitle}</div>

                      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                        <iframe
                          src={data.iframe}
                          className="videos-iframe"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={item.video}
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
