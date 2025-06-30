import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

type Props = {
  data: any;
};

export default function Header({ data }: Props) {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const headerClassName = !isScrolled ? "header" : "header-scrolled";
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`${headerClassName}-bg`}>
      <div className={`${headerClassName}`}>
        {/* лого  */}
        <NavLink
          to={"/"}
          className={`${headerClassName}-logo`}
          onClick={() => {
            // window.scrollY = 0;
          }}
        />
        {/* <div className={`${headerClassName}-logo`} /> */}

        {/* кнопки */}
        <div className={`${headerClassName}-flex`}>
          {data.buttons.map((item: any) => {
            return (
              <div className={`${headerClassName}-flex-item${location.pathname === `/${item.link}` ? "-active" : ""}`}>
                {item.name}
              </div>
            );
          })}
        </div>

        {/* связаться и пользователь */}
        <div className={`${headerClassName}-flex`}>
          <div className={`${headerClassName}-button`}>
            <div className={`${headerClassName}-button-mail`} />
            Связаться
          </div>
          <div className={`${headerClassName}-user`} />
        </div>
      </div>
    </div>
  );
}
