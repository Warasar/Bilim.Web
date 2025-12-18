import React, { useEffect, useState } from "react";
import Vuz from "./University";
import "./university.scss";
import HeaderContainer from "../Header/HeaderContainer";
import FooterContainer from "../Footer/FooterContainer";
import { useParams } from "react-router";
import Loader from "../../modules/YaKIT.WEB.KIT/components/Loader/Loader";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { requestGet } from "../../actions/actions";

const className = "university";

export default function UniversityContainer() {
  const [data, setData] = useState<any>(null);
  const [buttons, setButtons] = useState<any>([]);
  const { code } = useParams();

  useCurrentUser();

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    const newData: any = await requestGet(`vuz/${code}`);

    const newButtons: any[] = [
      {
        code: 0,
        name: "Назад",
        link: "vuz",
        scroll: true,
      },
    ];

    newData.forEach((item: any, index: number) => {
      if (item.itemType !== "header") {
        newButtons.push({
          code: index + 1,
          name: formatString(item.title),
          link: `vuz_${item.id}`,
          scroll: true,
        });
      }
      
      if (item.itemType === 'faculties'){
        item.contents?.forEach((content: any) => {
          content.opened = false

          content.directions?.forEach((direction: any) => {
            direction.opend = false
          })
        })
      }
    });

    setButtons(newButtons);
    setData(newData);
  };

  const formatString = (name: any) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  return (
    <div>
      <HeaderContainer buttons={buttons} />
      {data ? (
        <Vuz findData={data} className={className} />
      ) : (
        <div className="loading">
          <Loader absolute />
        </div>
      )}
      <FooterContainer />
    </div>
  );
}
