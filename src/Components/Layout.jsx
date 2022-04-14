import { Header } from "./Header";
import { Outlet } from "react-router";
import { Filters } from "./Filters";

const Layout = () => {
  return (
    <div className="main-container">
      <header>
        <Header />
      </header>

      <div className="container external-container">
        <div className="filters-container">
          <Filters name="teacher" title="Преподаватели" />
        </div>
        <div className="inner-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export { Layout };
