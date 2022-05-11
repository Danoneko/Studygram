import { Header } from "./Header";
import { Outlet } from "react-router";
import { Loader } from "./Loader";
import React, { useState } from "react";

const Layout = ({pageArray, userData, ...props}) => {
  const [isFetching, setIsFetching] = useState(true);

  setTimeout(() => {
    setIsFetching(false);
  }, 700);

  return (
    <div className="main-container">
      <header>
        <Header pageArray={pageArray} userData={userData}/>
      </header>

      {isFetching && <Loader />}
      {!isFetching && <Outlet />}
    </div>
  );
};

export { Layout };
