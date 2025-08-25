import React, { useEffect, useState } from "react";
import "./footer.scss";
import Footer from "./Footer";
import { requestGet } from "../../actions/actions";

export default function FooterContainer() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const newData: any = await requestGet(`container/footer`);

    if (newData) {
      setData(newData.items);
    }
  };

  return data ? <Footer data={data} /> : null;
}
