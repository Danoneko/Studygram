import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Form, FormControl } from "react-bootstrap";

import { Group } from "../Components/Group";

const Profile = ({ userData, setAvatar, ...props }) => {
  const userNameVal =
    String(userData.surname) +
    " " +
    String(userData.first_name) +
    " " +
    String(userData.second_name);

  const [fonAvatar, setFonAvatar] = useState({
    backgroundImage: "url(" + userData.avatar + ")",
  });

  function onChange(e, it) {
    document.getElementById(it).value = e;
  }

  function deleteAvatar() {
    userData.avatar = "";
    document
      .querySelectorAll(".photo-user__name")
      .forEach((el) => (el.style.display = "block"));
    var fon = {
      backgroundImage: "",
    };
    setFonAvatar(fon);
    setAvatar(fon);
    var colorFon = generateRandomColor();
    document
      .querySelectorAll(".user_avatar")
      .forEach((el) => (el.style.backgroundColor = colorFon));
  }

  function generateRandomColor() {
    var random = Math.floor(Math.random() * 12) + 1;
    // console.log(random);
    switch (random) {
      default:
        return "#7a7a9d";
      case 0:
        return "#000000";
      case 1:
        return "#1f2d3d";
      case 2:
        return "#cc5b8a";
      case 3:
        return "#425466";
      case 4:
        return "#3f6ad8";
      case 5:
        return "#617fb3";
      case 6:
        return "#6796e9";
      case 7:
        return "#665bcc";
      case 8:
        return "#cc5b8a";
      case 9:
        return "#f16063";
      case 10:
        return "#f2974c";
      case 11:
        return "#f2c94c";
      case 12:
        return "#66cb9f";
    }
  }
  // console.log(document.querySelectorAll(".photo-user__name"));

  function saveEdits() {
    const userName = document
      .getElementById("profile-photo__username")
      .value.split(" ");
    userData.first_name = userName[1];
    userData.second_name = userName[2];
    userData.surname = userName[0];
    const mail = document.getElementById("profile__email").value;
    userData.email = mail;
    // userData.avatar = "";

    console.log("Профиль отредактирован", userData);
  }

  return (
    <Container className="external-container">
      <div className="external-container__inner inner-container inner-container--center">
        <div className="inner-container__header">
          <h1 className="title-m">{props.titlePage}</h1>
        </div>
        <div className="inner-container__body profile-body">
          <Form>
            <div className="profile-photo">
              <div className="user_avatar profile-photo__avatar">
                <div className="photo-user__avatar" style={fonAvatar}></div>
                <div className="photo-user__name">
                  {userData.first_name.charAt(0)}
                  {userData.surname.charAt(0)}
                </div>
              </div>
              <div className="profile--block">
                <FormControl type="file" id="button--load" />

                <Button className="profile-button--load" variant="primary">
                  <label htmlFor="button--load">Загрузить</label>
                </Button>

                <Button
                  className="profile-button--del"
                  variant="success"
                  onClick={() => deleteAvatar()}
                >
                  Удалить
                </Button>
              </div>
            </div>
            <Form.Group className="profile-photo__username">
              <Form.Label className="inner-container__head-block color-grey-400">
                ФИО
              </Form.Label>

              <FormControl
                type="text"
                id="profile-photo__username"
                defaultValue={userNameVal}
                onChange={(e) =>
                  onChange(e.target.value, "profile-photo__username")
                }
              />
            </Form.Group>
            <div className="profile--flex">
              <Form.Group className="profile__email">
                <Form.Label className="inner-container__head-block color-grey-400">
                  Email
                </Form.Label>
                <FormControl
                  type="text"
                  defaultValue={userData.email}
                  id="profile__email"
                  onChange={(e) => onChange(e.target.value, "profile__email")}
                />
              </Form.Group>
              <Form.Group className="profile__type">
                <Form.Label className="inner-container__head-block color-grey-400">
                  Роль пользователя
                </Form.Label>
                <Form.Select>
                  {userData.type === "teacher" ? (
                    <option value="teacher">Преподаватель</option>
                  ) : (
                    <option value="student">Студент</option>
                  )}
                </Form.Select>
              </Form.Group>
            </div>
            <Form.Group className="profile__groups">
              <Form.Label className="inner-container__head-block color-grey-400">
                Группы
              </Form.Label>
              <div className="profile__groups-inner">
                {userData.groups.length !== 0 ? (
                  userData.groups.map((a, key) => (
                    <Group key={key} it={userData} id_group={a.id} />
                  ))
                ) : (
                  <div className="color-grey-400">Вы не состоите ни в одной группе</div>
                )}
              </div>
            </Form.Group>
            <div className="profile__save-edits">
              <Link to="/courses">
                <Button variant="success" onClick={() => saveEdits()}>
                  Сохранить изменения
                </Button>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export { Profile };
