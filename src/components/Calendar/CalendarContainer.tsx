import React, { useEffect, useState } from "react";
import "./calendar.scss";
import Calendar from "./Calendar";
import { requestGet } from "../../actions/actions";
import _ from "lodash";
import dayjs from "dayjs";

export default function CalendarContainer() {
  const [data, setData] = useState<any>(null);
  const [main, setMain] = useState<any>(null);
  const [legends, setLegends] = useState<any>(null);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formattedDate = (date: any) => {
    const splitedDate = date.split("T");
    const splitedYear = splitedDate[0].split("-")[0];
    const splitedMonth = splitedDate[0].split("-")[1];
    const splitedDay = splitedDate[0].split("-")[2];

    return `${splitedDay}-${splitedMonth}-${splitedYear}T${splitedDate[1]}`;
  };

  const getData = async () => {
    const newData: any = await requestGet(`calendar`);

    if (newData) {
      const sendData: any = _.cloneDeep(newData.data.events)?.filter((f: any) => f.isVisible);

      sendData.forEach((item: any) => {
        item.eventDate = formattedDate(item.eventDate);
        if (item.startWhen) item.startWhen = formattedDate(item.startWhen);
        if (item.endWhen) item.endWhen = formattedDate(item.endWhen);
      });

      setLegends(newData.data.eventTypes?.filter((f: any) => f.isVisible));
      setMain(newData?.items);
      setData(sendData);
    }
  };

  const mainDate: string = dayjs().format("DD-MM-YYYYTHH:mm:ss"); // первоначальная дата

  return data ? <Calendar data={data} mainDate={mainDate} main={main} legends={legends} /> : null;
}
