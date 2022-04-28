import {
  Container,
  NavbarBrand,
  Navbar,
  Nav,
  NavItem,
  Accordion,
} from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";

import { NavLink, Link } from "react-router-dom";

import dataUser from "../Data/dataUser.json";

const setActive = ({ isActive }) =>
  isActive ? "nav-item__nav-link--active" : ""; //  активность header-link

const userData = dataUser[6];
// console.log(userData);

const Header = ({ pageArray, ...props }) => {

  const NaviItems = () => {
    return (
      <NavItem>
        {pageArray.map((pageArray) => (
          <NavLink
            key={pageArray.id}
            className={setActive}
            to={"/" + pageArray.id}
          >
            {pageArray.title}
          </NavLink>
        ))}
      </NavItem>
    );
  };

  const profileArray = [
    { id: "profile", title: "Профиль" },
    { id: "messages", title: "Сообщения" },
    { id: "notifications", title: "Уведомления" },
  ];

  const UserItems = () => {
    return (
      <>
        {profileArray.map((profileArray) => (
          <Link
            key={profileArray.id}
            to={"/" + profileArray.id}
            className="dropdown-menu__link color-grey-700"
          >
            {profileArray.title}
          </Link>
        ))}
      </>
    );
  };

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
            <Nav className="navbar__profile-phone">
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <div className="nav-profile__photo-user">
                      <img
                        src={userData.avatar}
                        className="photo-user__avatar"
                        alt="Аватар"
                      />
                    </div>
                    <div>
                      <div className="color-grey-700 text-m">
                        {userData.name} {userData.surname}
                      </div>
                      <div className="color-grey-600 text-s">
                        {userData.role_ru}
                      </div>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <UserItems />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Nav>
            <Nav className="mr-auto">
              <NaviItems />
            </Nav>
            <Nav className="navbar__profile-desktop">
              <div className="navbar-nav dropdown">
                <div className="nav-item" role="tab">
                  <div
                    className="nav-link dropdown-toggle nav-profile"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div className="nav-profile__photo-user">
                      <img
                        src={userData.avatar}
                        className="photo-user__avatar"
                        alt="avatar"
                      />
                    </div>
                    <div>
                      <div className="color-grey-700 text-s">
                        {userData.name} {userData.surname}
                      </div>
                      <div className="color-grey-600 text-xxs">
                        {userData.type === "teacher"? "Преподаватель" : "Студент"}
                      </div>
                    </div>
                  </div>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <UserItems />
                    <div className="dropdown-divider"></div>
                    <Link
                      className="dropdown-menu__link dropdown__exit text-s color-red-900"
                      to="/"
                    >
                      Выйти из системы
                    </Link>
                  </div>
                </div>
              </div>
            </Nav>
            <Nav className="profile-phone__exit dropdown__exit">
              <Link className="color-red-900 text-m" to="/">
                Выйти из системы
              </Link>
            </Nav>
          </NavbarCollapse>
        </Container>
      </Navbar>
    </>
  );
};

export { Header };
