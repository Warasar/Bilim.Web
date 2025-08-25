import React, { useEffect, useState } from "react";
import Tour from "./Tour";
import "./tour.scss";

export default function TourContainer() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const newData = {
      title: "Подготовка к олимпиадам",
    };

    setData(newData);
  };

  return data ? <Tour data={data} /> : null;
}
