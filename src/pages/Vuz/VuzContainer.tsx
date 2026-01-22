import React, { useEffect, useState } from "react";
import Vuz from "./Vuz";
import "./vuz.scss";
import HeaderContainer from "../../components/Header/HeaderContainer";
import FooterContainer from "../../components/Footer/FooterContainer";
import { requestGet } from "../../actions/actions";
import Loader from "../../modules/YaKIT.WEB.KIT/components/Loader/Loader";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { IFilterData } from "../../types/vuz";

export default function VuzContainer() {
  const [data, setData] = useState<any>(null);
  const [filterData, setFilterData] = useState<IFilterData | null>(null);
  const [loader, setLoader] = useState<boolean>(false);

  useCurrentUser();

  useEffect(() => {
    setLoader(true);

    getData();
  }, []);

  const getData = async () => {
    setLoader(true);

    const newData: any = await requestGet(`/proftour`);
    let filterData = await requestGet("/proftour/filters");

    if (filterData?.filters?.length) {
      filterData.filters = filterData.filters.map((item: any) => {
        item.possibleValues = item.possibleValues.map((value: any, index: number) => {
          return {
            code: `${index}`,
            name: value,
          };
        });

        return item;
      });
    }

    setData(newData);
    setFilterData(filterData);
    setLoader(false);
  };

  return (
    <div>
      {loader ? <Loader absolute /> : null}
      <HeaderContainer />
      {data ? <Vuz data={data} setLoader={setLoader} filterData={filterData} /> : null}
      <FooterContainer />
    </div>
  );
}
