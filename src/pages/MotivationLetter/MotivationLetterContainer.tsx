import React, { useEffect, useState } from "react";
import MotivationLetter from "./MotivationLetter";
import "./mletter.scss";
import HeaderContainer from "../../components/Header/HeaderContainer";
import FooterContainer from "../../components/Footer/FooterContainer";
import { requestGet } from "../../actions/actions";
import Loader from "../../modules/YaKIT.WEB.KIT/components/Loader/Loader";

export default function MotivationLetterContainer() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const newData: any = await requestGet(`mLetter`);

    setData(newData);
  };

  return (
    <div>
      <HeaderContainer />
      {data ? (
        <MotivationLetter data={data} />
      ) : (
        <div>
          <Loader absolute />
          <div style={{ height: "calc(100vh)" }} />
        </div>
      )}
      <FooterContainer />
    </div>
  );
}
