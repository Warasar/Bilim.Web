import React, { useEffect, useState } from "react";
import Olimp from "./Olimp";
import "./olimp.scss";
import HeaderContainer from "../../components/Header/HeaderContainer";
import FooterContainer from "../../components/Footer/FooterContainer";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { requestGet } from "../../actions/actions";
import Loader from "../../modules/YaKIT.WEB.KIT/components/Loader/Loader";

export default function OlimpContainer() {
  const [data, setData] = useState<any>(null);

  useCurrentUser();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const newData: any = await requestGet(`olimp`);

    setData(newData);
  };

  return (
    <div>
      <HeaderContainer />
      {data ? (
        <Olimp data={data} />
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
