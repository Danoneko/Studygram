import { Container, NavbarBrand, Navbar, Nav, NavItem } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import React from "react";
import { NavLink } from "react-router-dom";

const setActive = ({ isActive }) => (isActive ? "nav-link--active" : "");

const userName = "Иван Иванов";

const linksArray = [
  { id: "courses", title: "Курсы", link: "/courses" },
  { id: "tasks", title: "Задачи", link: "/tasks" },
  { id: "meetings", title: "Встречи", link: "/meetings" },
  { id: "users", title: "Пользователи", link: "/users" },
];

const itemslink = linksArray.map((linksArray) => (
  <NavLink
    key={linksArray.id}
    className={setActive}
    activeClassName="nav-link"
    to={linksArray.link}
  >
    {linksArray.title}
  </NavLink>
));

class NaviItems extends React.Component {
  render() {
    return <NavItem>{itemslink}</NavItem>;
  }
}

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
                    <a className="dropdown-item" href="/profile">
                      Профиль
                    </a>
                    <a className="dropdown-item" href="/">
                      Сообщения
                    </a>
                    <a className="dropdown-item" href="/">
                      Уведомления
                    </a>
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
