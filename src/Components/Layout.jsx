import { Outlet } from "react-router-dom";
import { Filters } from "./Filters";

import { Header } from "./Header";

const Layout = () => {
  return (
    <div className="main-container">
      <header>
        <Header />
      </header>

      <div className="container external-container">
        <div className="filters-container">
          <Filters />
        </div>
        <div className="inner-container">
        <Outlet />
        </div>
      </div>
      
    </div>
  );
};

export { Layout };
