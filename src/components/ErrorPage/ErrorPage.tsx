import React, { NavLink, useRouteError } from "react-router-dom";
import HeaderContainer from "../Header/HeaderContainer";
import "./error.scss";

const classNameError = "error";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div id="error" className={classNameError}>
      <HeaderContainer whiteBg={true} />
      <div className={`${classNameError}-container`}>
        <div className={`${classNameError}-main`}>
          <div className={`${classNameError}-block`}>
            {/* Left Side - Text */}
            <div className={`${classNameError}-left`}>
              Упс...
              <br />
              Эта страница
              <br />
              недоступна
            </div>

            {/* Center - Illustration */}
            <div className={`${classNameError}-center`}>
              <div className={`${classNameError}-center-girl`} />
              <div className={`${classNameError}-center-text`}>404</div>
            </div>

            {/* Right Side - Message and Button */}
            <div className={`${classNameError}-right`}>
              <div className={`${classNameError}-right-subtext`}>
                Ссылка, по которой вы перешли, возможно, сломана или страница была удалена.
              </div>

              <NavLink to="/" className={`${classNameError}-right-button`}>
                <div className={`${classNameError}-right-home`} />
                <div className={`${classNameError}-right-button-text`}>Вернуться на главную</div>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
