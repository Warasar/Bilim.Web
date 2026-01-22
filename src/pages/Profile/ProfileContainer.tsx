import React, { useEffect, useState } from "react";
import Loader from "../../modules/YaKIT.WEB.KIT/components/Loader/Loader";
import HeaderContainer from "../../components/Header/HeaderContainer";
import { requestGet } from "../../actions/actions";
import Profile from "./Profile";
import "./profile.scss";
import ProfileAdmin from "./ProfileAdmin";

export default function ProfileContainer() {
  const [loader, setLoader] = useState<boolean>(true);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getData = async () => {
    setLoader(true);

    const userData = await requestGet(`user/data`);

    setUserData(userData);
    setLoader(false);
  };

  return (
    <div>
      {loader ? <Loader absolute /> : null}
      <HeaderContainer />

      <div className="profile">
        {userData ? (
          userData.role !== "student" ? (
            <ProfileAdmin setLoader={setLoader} loader={loader} />
          ) : (
            <Profile setLoader={setLoader} userData={userData} />
          )
        ) : null}
      </div>
    </div>
  );
}
