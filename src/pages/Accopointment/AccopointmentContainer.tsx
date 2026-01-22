import React, { useEffect, useState } from "react";
import Accopointment from "./Accopointment";
import "./accopointment.scss";
import HeaderContainer from "../../components/Header/HeaderContainer";
import CalendarContainer from "../../components/Calendar/CalendarContainer";
import CarouselContainer from "../../components/Carousel/CarouselContainer";
import FooterContainer from "../../components/Footer/FooterContainer";
import { requestGet } from "../../actions/actions";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { ContainerItem } from "../../types/accopointment";
import Preloader from "../../components/Preloader/Preloader";

const AccopointmentContainer: React.FC = () => {
  const [data, setData] = useState<ContainerItem | null>(null);

  useCurrentUser();

  useEffect(() => {
    getData();
  }, []);

  const getData = async (): Promise<void> => {
    try {
      const response: { items: ContainerItem } = await requestGet("container/greeting");

      if (response && response.items) {
        setData(response.items);
      }
    } catch (error) {
      console.error("Error fetching greeting data:", error);
    }
  };

  return (
    <div>
      <HeaderContainer />
      {data ? <Accopointment data={data} /> : <Preloader />}
      <CalendarContainer />
      <CarouselContainer />
      <FooterContainer />
    </div>
  );
};

export default AccopointmentContainer;
