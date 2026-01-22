/* eslint-disable jsx-a11y/iframe-has-title */
import React, { Fragment } from "react";

type Props = {
  data: any;
};

export default function Footer({ data }: Props) {
  return (
    <Fragment>
      <div className={`footer-bg`}>
        <div className={`footer`}>
          <div className={`footer-container`}>
            <div className={`footer-first`}>
              <div className={`footer-item-header`}>
                <div className={`footer-item-flexColumn`}>
                  <div className={`footer-logo`} />
                  <div className={`footer-subtitle`}>{data.subtitle.text}</div>
                </div>
              </div>
              <div className={`footer-icons`}>
                {data.icons.map((item: any, index: number) => {
                  return (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className={`footer-icons-${item.code}`}
                      key={`footer-icons-${item.code}_${index}`}
                    >
                      <div className={`footer-icons-${item.code}-icon`} />
                    </a>
                  );
                })}
              </div>
            </div>
            <div className={`footer-second`}>
              {data.data.map((item: any, index: number) => {
                return (
                  <div className={`footer-item`} key={`footer-item_${index}`}>
                    <div className={`footer-item-title`}>{item.name}</div>
                    <div className={`footer-item-flexColumn`}>
                      {item.items.map((child: any) => {
                        return (
                          <div className={`footer-item-flex`} key={`footer-item-flex_${index}_${child.code}`}>
                            <div className={`footer-item-dot`} />
                            <a
                              href={child.link}
                              target={index === 0 ? "_self" : "_blank"}
                              rel="noreferrer"
                              className={`footer-item-text`}
                            >
                              {child.name}
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <iframe src={data.map.link} className={`footer-map`} />
          </div>
        </div>
        <div className={`footer-end`}>
          <div className={`footer-end-grid`}>
            <div className={`footer-end-flexColumn`}>
              <div className={`footer-end-title`}>{data.end.title}</div>
              <div className={`footer-end-flex`}>
                {data.end.items.map((item: any, index: number) => {
                  return (
                    <div className={`footer-end-text`} key={`footer-end-text_${index}`}>
                      {item.text}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={`footer-end-text`}>{data.end.text}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
