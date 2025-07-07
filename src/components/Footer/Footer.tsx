/* eslint-disable jsx-a11y/iframe-has-title */
import React, { Fragment } from "react";
import { IfooterDataMain } from "./footerType";

const footerClassName = "footer";

type Props = {
  data: IfooterDataMain;
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
                  <div className={`${footerClassName}-subtitle`}>{data.subtitle}</div>
                </div>
              </div>
              <div className={`${footerClassName}-icons`}>
                {[
                  data.icons.map((item) => {
                    return (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className={`${footerClassName}-icons-${item.code}`}
                      >
                        <div className={`${footerClassName}-icons-${item.code}-icon`} />
                      </a>
                    );
                  }),
                ]}
              </div>
            </div>
            <div className={`${footerClassName}-second`}>
              {data.data.map((item, index) => {
                return (
                  <div className={`${footerClassName}-item`}>
                    <div className={`${footerClassName}-item-title`}>{item.name}</div>
                    <div className={`${footerClassName}-item-flexColumn`}>
                      {item.items.map((child) => {
                        return (
                          <div className={`${footerClassName}-item-flex`}>
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
            <iframe src={data.map} className={`${footerClassName}-map`} />
          </div>
        </div>
      </div>

      <div className={`${footerClassName}-end`}>
        <div className={`${footerClassName}-end-grid`}>
          <div className={`${footerClassName}-end-flexColumn`}>
            <div className={`${footerClassName}-end-title`}>{data.end.title}</div>
            <div className={`${footerClassName}-end-flex`}>
              {data.end.info.map((item: any) => {
                return <div className={`${footerClassName}-end-text`}>{item.text}</div>;
              })}
            </div>
          </div>
          <div className={`${footerClassName}-end-text`}>{data.end.text}</div>
        </div>
      </div>
    </Fragment>
  );
}
