import React from "react";
import Loader from "../../modules/YaKIT.WEB.KIT/components/Loader/Loader";

export default function Preloader() {
  return (
    <div>
      <Loader absolute />
      <div style={{ height: "calc(100vh)" }} />
    </div>
  );
}
