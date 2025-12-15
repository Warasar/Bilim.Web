import React, { useEffect, useState } from "react";
import "./videos.scss";
import HeaderContainer from "../Header/HeaderContainer";
import FooterContainer from "../Footer/FooterContainer";
import Videos from "./Videos";
import Loader from "../../modules/YaKIT.WEB.KIT/components/Loader/Loader";
import { requestGet } from "../../actions/actions";

export default function VideosContainer() {
  const [data, setData] = useState<any>(null);
  const [loader, setLoader] = useState<boolean>(true);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getData = async () => {
    setLoader(true);

    const newData = await requestGet(`recentRecordings`);

    setData(newData);
    setLoader(false);
  };

  return (
    <div>
      {loader ? <Loader absolute /> : null}

      <HeaderContainer />
      {loader ? <div style={{ height: "calc(100vh - 62px)" }} /> : <Videos data={data} />}
      <FooterContainer />
    </div>
  );
}
