import React, { useState } from "react";

import { Container, Button } from "react-bootstrap";

import { NavLink, Outlet } from "react-router-dom";

import { CreateGroup } from "../Components/CreateGroup";
import { CreateUser } from "../Components/CreateUser";

import plus from "../Images/plus.svg";

const Users = (props) => {
  const [createGroupe, setCreateGroup] = useState(false); // показ модального окна создания группы
  const [createUser, setСreateUser] = useState(false); // показ модального окна создания пользователя

  const setActive = ({ isActive }) =>
    isActive ? "users__nav-link--active" : ""; //  активность header-link

  const usersArray = [
    { id: "all_users", title: "Все пользователи" },
    { id: "teachers", title: "Преподаватели" },
    { id: "groups", title: "Группы" },
    { id: "applications", title: "Заявки" },
  ];

  return (
    <Container className="external-container">
      <CreateGroup
        show={createGroupe}
        setCreateGroup={setCreateGroup}
        onHide={() => setCreateGroup(false)}
      />
      <CreateUser
        show={createUser}
        setСreateUser={setСreateUser}
        onHide={() => setСreateUser(false)}
      />
      <Container className="external-container__inner">
        <div className="inner-container">
          <div className="inner-container__head users__button">
            <h1 className="title-m">Пользователи</h1>
            <div className="users__button">
              <Button
                variant="primary"
                className="button-create"
                onClick={() => setCreateGroup(true)}
              >
                {" "}
                <img src={plus} alt="Создать" className="filters__img" />
                Добавить группу
              </Button>
              <Button
                variant="primary"
                className="button-create"
                onClick={() => setСreateUser(true)}
              >
                {" "}
                <img src={plus} alt="Создать" className="filters__img" />
                Добавить пользователя
              </Button>
            </div>
          </div>
          <div className="users__header">
            {usersArray.map((a, key) => (
              <div className="users__nav-link" key={key}>
                <NavLink className={setActive} to={a.id}>
                  {a.title}
                </NavLink>
              </div>
            ))}
          </div>

          <Outlet />
        </div>
      </Container>
    </Container>
  );
};

export { Users };
