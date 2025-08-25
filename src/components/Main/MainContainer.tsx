import React, { useEffect, useState } from "react";
import Main from "./Main";
import "./main.scss";
import HeaderContainer from "../Header/HeaderContainer";
import CalendarContainer from "../Calendar/CalendarContainer";
import CarouselContainer from "../Carousel/CarouselContainer";
import FooterContainer from "../Footer/FooterContainer";
import { requestGet } from "../../actions/actions";

export default function MainContainer() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getCurrentUser();
    getData();
  }, []);

  const getCurrentUser = async () => {
    const currentUser = await requestGet(`currentUser`);

    if (!currentUser.hasPassedSurvey) {
      const win: Window = window;
      win.location = `${window.location.origin}/survey`;
    }
  };

  const getData = async () => {
    const newData = await requestGet(`container/greeting`);
    if (newData) {
      setData(newData.items);
    }
  };

  return (
    <div>
      <HeaderContainer />
      {data ? <Main data={data} /> : null}
      <CalendarContainer />
      <CarouselContainer />
      <FooterContainer />
    </div>
  );
}
