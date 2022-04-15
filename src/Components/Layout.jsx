import { Header } from "./Header";
import { Outlet } from "react-router";
import { Filters } from "./Filters";
import React, { useState } from "react";

const Layout = () => {

  const [value, setValue] = useState([]);
  const [value1, setValue1] = useState([]);

  console.log('lay', value);
  console.log('lay', value1);

 

  return (
    <div className="main-container">
      <header>
        <Header />
      </header>

      <div className="container external-container">
        <div className="filters-container">
          <Filters setValue={setValue} name="teacher" title="Преподаватели" />
          <Filters setValue={setValue1} name="student" title="Студенты" />
        </div>
        
        <div className="inner-container">
        
          <Outlet />
          {value.map((user, key) => (<p key={key}>{user.name} {user.surname}</p>))}
          {value1.map((user, key) => (<p key={key}>{user.name} {user.surname}</p>))}
        </div>
      </div>
    </div>
  );
};

export { Layout };
