import React from "react";

type Props = {
  data: any;
};

export default function Videos({ data }: Props) {
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
                  <div className="videos-item-title">{item.title}</div>

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
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
