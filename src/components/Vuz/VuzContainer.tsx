import React, { useEffect, useState } from "react";
import Vuz from "./Vuz";
import "./vuz.scss";
import HeaderContainer from "../Header/HeaderContainer";
import FooterContainer from "../Footer/FooterContainer";
import { requestGet } from "../../actions/actions";
import Loader from "../../modules/YaKIT.WEB.KIT/components/Loader/Loader";

export default function VuzContainer() {
  const [data, setData] = useState<any>(null);
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    setLoader(true);

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
    setLoader(true);

    const newData: any = await requestGet(`/page/proftour`);

    setData(newData);
    setLoader(false);
  };

  return (
    <div>
      {loader ? <Loader absolute /> : null}
      <HeaderContainer />
      {data ? <Vuz data={data} setLoader={setLoader} /> : null}
      <FooterContainer />
    </div>
  );
}
