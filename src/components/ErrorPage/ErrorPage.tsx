import React, { useRouteError } from "react-router-dom";

const classNameError = "error";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div id="error" className={classNameError}>
      <p>Такой страницы не существует.</p>
    </div>
  );
}
