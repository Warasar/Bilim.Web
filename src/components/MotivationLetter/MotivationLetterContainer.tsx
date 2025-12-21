import React, { useEffect, useState } from "react";
import MotivationLetter from "./MotivationLetter";
import "./mletter.scss";
import HeaderContainer from "../Header/HeaderContainer";
import FooterContainer from "../Footer/FooterContainer";
import { requestGet } from "../../actions/actions";
import Loader from "../../modules/YaKIT.WEB.KIT/components/Loader/Loader";

export default function MotivationLetterContainer() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const newData: any = await requestGet(`container/mLetter`);

    if (newData?.items) {
      newData.items.presentation.carousel1.items = [
        { id: 0, link: "1.jpg" },
        { id: 1, link: "2.jpg" },
        { id: 2, link: "3.jpg" },
        { id: 3, link: "4.jpg" },
        { id: 4, link: "5.jpg" },
        { id: 5, link: "6.jpg" },
        { id: 6, link: "7.jpg" },
        { id: 7, link: "8.jpg" },
        { id: 8, link: "9.jpg" },
        { id: 9, link: "10.jpg" },
        { id: 10, link: "11.jpg" },
      ];

      newData.items.presentation.carousel2.items = [
        { id: 0, link: "1.png" },
        { id: 1, link: "2.png" },
        { id: 2, link: "3.png" },
        { id: 3, link: "4.png" },
        { id: 4, link: "5.png" },
        { id: 5, link: "6.png" },
      ];

      setData(newData.items);
    }
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
