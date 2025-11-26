import React, { useEffect, useState } from "react";
import Main from "./Main";
import "./main.scss";
import HeaderContainer from "../Header/HeaderContainer";
import CalendarContainer from "../Calendar/CalendarContainer";
import CarouselContainer from "../Carousel/CarouselContainer";
import FooterContainer from "../Footer/FooterContainer";
import { requestGet } from "../../actions/actions";
import Loader from "../../modules/YaKIT.WEB.KIT/components/Loader/Loader";
import { useCurrentUser } from "../../hooks/useCurrentUser";

export default function MainContainer() {
  const [data, setData] = useState<any>(null);

  useCurrentUser();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const newData = await requestGet(`container/greeting`);
    if (newData) {
      setData(newData.items);
    }
  };

  return (
    <div>
      <HeaderContainer />
      {data ? (
        <Main data={data} />
      ) : (
        <div>
          <Loader absolute />
          <div style={{ height: "calc(100vh)" }} />
        </div>
      )}
      <CalendarContainer />
      <CarouselContainer />
      <FooterContainer />
    </div>
  );
}
