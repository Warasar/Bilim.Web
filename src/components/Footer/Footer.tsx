/* eslint-disable jsx-a11y/iframe-has-title */
import React, { Fragment } from "react";

const footerClassName = "footer";

type Props = {
  data: any;
};

export default function Footer({ data }: Props) {
  return (
    <Fragment>
      <div className={`${footerClassName}-bg`}>
        <div className={`${footerClassName}`}>
          <div className={`${footerClassName}-container`}>
            <div className={`${footerClassName}-first`}>
              <div className={`${footerClassName}-item-header`}>
                <div className={`${footerClassName}-item-flexColumn`}>
                  <div className={`${footerClassName}-logo`} />
                  <div className={`${footerClassName}-subtitle`}>
                    {data.subtitle.text}
                  </div>
                </div>
              </div>
              <div className={`${footerClassName}-icons`}>
                {data.icons.map((item: any, index: number) => {
                  return (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className={`${footerClassName}-icons-${item.code}`}
                      key={`${footerClassName}-icons-${item.code}_${index}`}
                    >
                      <div
                        className={`${footerClassName}-icons-${item.code}-icon`}
                      />
                    </a>
                  );
                })}
              </div>
            </div>
            <div className={`${footerClassName}-second`}>
              {data.data.map((item: any, index: number) => {
                return (
                  <div
                    className={`${footerClassName}-item`}
                    key={`${footerClassName}-item_${index}`}
                  >
                    <div className={`${footerClassName}-item-title`}>
                      {item.name}
                    </div>
                    <div className={`${footerClassName}-item-flexColumn`}>
                      {item.items.map((child: any) => {
                        return (
                          <div
                            className={`${footerClassName}-item-flex`}
                            key={`${footerClassName}-item-flex_${index}_${child.code}`}
                          >
                            <div className={`${footerClassName}-item-dot`} />
                            <a
                              href={child.link}
                              target={index === 0 ? "_self" : "_blank"}
                              rel="noreferrer"
                              className={`${footerClassName}-item-text`}
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
            <iframe src={data.map.link} className={`${footerClassName}-map`} />
          </div>
        </div>
        <div className={`${footerClassName}-end`}>
          <div className={`${footerClassName}-end-grid`}>
            <div className={`${footerClassName}-end-flexColumn`}>
              <div className={`${footerClassName}-end-title`}>
                {data.end.title}
              </div>
              <div className={`${footerClassName}-end-flex`}>
                {data.end.items.map((item: any, index: number) => {
                  return (
                    <div
                      className={`${footerClassName}-end-text`}
                      key={`${footerClassName}-end-text_${index}`}
                    >
                      {item.text}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={`${footerClassName}-end-text`}>{data.end.text}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
