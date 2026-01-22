import React, { useEffect, useState } from "react";
import Accopointment from "./Accopointment";
import "./accopointment.scss";
import HeaderContainer from "../../components/Header/HeaderContainer";
import CalendarContainer from "../../components/Calendar/CalendarContainer";
import CarouselContainer from "../../components/Carousel/CarouselContainer";
import FooterContainer from "../../components/Footer/FooterContainer";
import { requestGet } from "../../actions/actions";
import Loader from "../../modules/YaKIT.WEB.KIT/components/Loader/Loader";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { ContainerItem } from "../../types/accopointment";

const AccopointmentContainer: React.FC = () => {
  const [data, setData] = useState<ContainerItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useCurrentUser();

  useEffect(() => {
    getData();
  }, []);

  const getData = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response: { items: ContainerItem } = await requestGet("container/greeting");

      if (response && response.items) {
        setData(response.items);
      }
    } catch (error) {
      console.error("Error fetching greeting data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <HeaderContainer />
      {data ? (
        <Accopointment data={data} />
      ) : (
        <div>
          {isLoading && <Loader absolute />}
          <div style={{ height: "calc(100vh)" }} />
        </div>
      )}
      <CalendarContainer />
      <CarouselContainer />
      <FooterContainer />
    </div>
  );
};

export default AccopointmentContainer;
