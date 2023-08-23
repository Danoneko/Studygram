import { Header } from "./Header";
import { Outlet } from "react-router-dom";
import { Loader } from "./Loader";
import React, { useState } from "react";

const Layout = ({pageArray, userData, avatar, ...props}) => {
  const [isFetching, setIsFetching] = useState(true);

  setTimeout(() => {
    setIsFetching(false);
  }, 6000);

  return (
    <div className="main-container">
      <header>
        <Header pageArray={pageArray} userData={userData} avatar={avatar}/>
      </header>

      {isFetching && <Loader />}
      {!isFetching && <Outlet />}
    </div>
  );
};

export { Layout };
