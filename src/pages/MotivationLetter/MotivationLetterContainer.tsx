import React, { useEffect, useState } from "react";
import MotivationLetter from "./MotivationLetter";
import "./mletter.scss";
import HeaderContainer from "../../components/Header/HeaderContainer";
import FooterContainer from "../../components/Footer/FooterContainer";
import { requestGet } from "../../actions/actions";
import Preloader from "../../components/Preloader/Preloader";

export default function MotivationLetterContainer() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const newData = await requestGet(`mLetter`);

    setData(newData);
  };

  return (
    <div>
      <HeaderContainer />
      {data ? <MotivationLetter data={data} /> : <Preloader />}
      <FooterContainer />
    </div>
  );
}
