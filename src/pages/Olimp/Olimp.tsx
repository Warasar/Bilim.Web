import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import OlimpCarousel from "./OlimpCarousel";

type Props = {
  data: any;
};

export default function Olimp({ data }: Props) {
  const [activeTab, setActiveTab] = useState<any>(data.find((f: any) => f.containerCode === "olimpVideos")?.data[0]);

  return (
    <div className="olimp">
      <div className={`olimp-main`}>
        {data.map((block: any) => {
          if (block.containerCode === "olimpHeader") {
            return <div className={`olimp-title`}>{block.items.title}</div>;
          }

          if (block.containerCode === "olimpCards") {
            return (
              <div className={`olimp-spisok`}>
                {block.data
                  .filter((f: any) => f.isVisible)
                  .map((item: any) => {
                    return (
                      <NavLink to={`${item.code}`} key={`olimp-spisok-item_${item.id}`} className={`olimp-spisok-item`}>
                        {item.name}
                      </NavLink>
                    );
                  })}
              </div>
            );
          }

          if (block.containerCode === "olimpCarousel") {
            return <OlimpCarousel title={block.items.title} data={block.data} />;
          }

          if (block.containerCode === "olimpVideos") {
            return (
              <div className={`olimp-video`}>
                <div className={`olimp-video-tabs`}>
                  {block.data
                    .filter((f: any) => f.isVisible)
                    .map((item: any) => {
                      return (
                        <div
                          className={`olimp-video-tabs-item${activeTab.id === item.id ? "-active" : ""}`}
                          key={`olimp-video-tabs-item_${item.id}`}
                          onClick={() => setActiveTab(item)}
                        >
                          {item.name}
                        </div>
                      );
                    })}
                </div>

                {activeTab ? (
                  <div className={`olimp-video-content`}>
                    <div className={`olimp-video-title`}>{activeTab.header}</div>
                    {activeTab.title ? (
                      <div
                        className={`olimp-video-subtitle`}
                        dangerouslySetInnerHTML={{
                          __html: activeTab.title,
                        }}
                      />
                    ) : null}
                    <iframe
                      src={activeTab.link}
                      className={`olimp-video-iframe`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={activeTab.header}
                    />
                    {activeTab.description ? (
                      <div
                        className={`olimp-video-text`}
                        dangerouslySetInnerHTML={{
                          __html: activeTab.description,
                        }}
                      />
                    ) : null}
                  </div>
                ) : null}
              </div>
            );
          }

          if (block.containerCode === "olimpPlates") {
            return (
              <div className={`olimp-docs`}>
                {block.data
                  .filter((f: any) => f.isVisible)
                  .map((item: any) => {
                    return (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        key={`olimp-docs-item_${item.id}`}
                        className={`olimp-docs-item`}
                      >
                        <div className={`olimp-docs-item-text`}>{item.name}</div>
                        <div className={`olimp-docs-item-icon`} />
                      </a>
                    );
                  })}
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}
