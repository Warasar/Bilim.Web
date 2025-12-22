import React, { useEffect, useState } from "react";
import "./olimpvuz.scss";
import HeaderContainer from "../Header/HeaderContainer";
import FooterContainer from "../Footer/FooterContainer";
import OlimpVuz from "./OlimpVuz";
import { useParams } from "react-router";
import Loader from "../../modules/YaKIT.WEB.KIT/components/Loader/Loader";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { requestGet } from "../../actions/actions";

export default function OlimpVuzContainer() {
  const [data, setData] = useState<any>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const { code } = useParams();

  useCurrentUser();

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    setLoader(true);

    const newData: any = await requestGet(`olimp/${code}`);

    setData(newData);
    setLoader(false);
  };

  return (
    <div>
      <HeaderContainer />
      {!loader ? (
        <OlimpVuz data={data} />
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
