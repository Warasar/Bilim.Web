import React, { useEffect, useState } from "react";
import Header from "./Header";
import "./header.scss";
import { requestGet } from "../../actions/actions";
import _ from "lodash";

type Props = {
  whiteBg?: boolean;
  buttons?: any;
};

export default function HeaderContainer({ whiteBg, buttons }: Props) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buttons]);

  const getData = async () => {
    const headerData = await requestGet(`container/header`);
    const userData = await requestGet(`user/data`);

    if (headerData && userData) {
      const newData = _.cloneDeep(headerData?.items);

      if (buttons) {
        newData.buttons = buttons;
      }

      newData.user = userData;

      setData(newData);
    }
  };

  return !data ? <div style={{ height: "62px" }} /> : <Header data={data} whiteBg={whiteBg} />;
}
