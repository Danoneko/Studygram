import { Container, NavbarBrand, Navbar, Nav, NavItem } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import React from "react";
import { NavLink, Link } from "react-router-dom";

const setActive = ({ isActive }) => (isActive ? "nav-link--active" : ""); //  активность header-link

const userName = "Иван Иванов";

const linksArray = [
  { id: "courses", title: "Курсы" },
  { id: "tasks", title: "Задачи" },
  { id: "meetings", title: "Встречи" },
  { id: "users", title: "Пользователи" },
];

const NaviItems = () => {
  return (
    <NavItem>
      {linksArray.map((linksArray) => (
        <NavLink
          key={linksArray.id}
          className={setActive}
          to={"/" + linksArray.id}
        >
          {linksArray.title}
        </NavLink>
      ))}
    </NavItem>
  );
};

const userArray = [
  { id: "profile", title: "Профиль" },
  { id: "messages", title: "Сообщения" },
  { id: "notifications", title: "Уведомления" },
];

const UserItems = () => {
  return (
    <>
      {userArray.map((userArray) => (
        <Link
        key={userArray.id}
        className="dropdown-item"
        to={"/" + userArray.id}>
          {userArray.title}
        </Link>
      ))}
    </>
  );
};

const Header = () => {
  return (
    <>
      <Navbar
        sticky="top"
        collapseOnSelect
        expand="md"
        className="bgcolor-grey-100"
      >
        <Container>
          <NavbarBrand
            href="/courses"
            className="title-s color-blue-900 text-uppercase"
          >
            Studygram
          </NavbarBrand>
          <NavbarToggle aria-controls="responsiv-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </NavbarToggle>
          <NavbarCollapse id="responsiv-navbar-nav">
            <Nav className="mr-auto">
              <NaviItems />
            </Nav>
            <Nav>
              <div className="navbar-nav dropdown">
                <div className="nav-item" role="tab">
                  <div
                    className="nav-link dropdown-toggle nav-profile"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div className="photo-user">
                      <img
                        src="https://s1.1zoom.ru/big7/97/Argentina_Mountains_Lake_489521.jpg"
                        className="avatar"
                        alt="avatar"
                      />
                    </div>
                    <div className="user-name">
                      <div className="color-grey-700 text-xs">{userName}</div>
                      <div className="type-user">Преподаватель</div>
                    </div>
                  </div>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <UserItems />
                    <div className="dropdown-divider"></div>
                    <a
                      className="dropdown-item dropdown-exit text-s color-red-900"
                      href="/"
                    >
                      Выйти из системы
                    </a>
                  </div>
                </div>
              </div>
            </Nav>
          </NavbarCollapse>
        </Container>
      </Navbar>
    </>
  );
};

export { Header };
