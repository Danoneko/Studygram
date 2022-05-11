import React from "react";
import { Link } from "react-router-dom";
import { Container, Button, Form, FormControl } from "react-bootstrap";

const Profile = ({ userData, ...props }) => {
  const userNameVal =
    String(userData.first_name) +
    " " +
    String(userData.second_name) +
    " " +
    String(userData.surname);

  function onChange(e, it) {
    document.getElementById(it).value = e;
  }

function deleteAvatar() {
  userData.avatar = "";
}

function saveEdits() {
  const userName = document.getElementById("profile-photo__username").value.split(" ");
  userData.first_name = userName[0];
  userData.second_name = userName[1];
  userData.surname = userName[2];
  const mail = document.getElementById("profile__email").value;
  userData.email = mail;
}

  return (
    <Container className="external-container">
      <div className=" external-container__inner inner-container inner-container--center">
        <div className="inner-container__header">
          <h1 className="title-m">{props.titlePage}</h1>
        </div>
        <div className="inner-container__body profile-body">
          <Form>
            <div className="profile-photo">
              <div className="profile-photo__avatar">
                <img
                  src={userData.avatar}
                  className="photo-user__avatar"
                  alt=""
                />
              </div>
              <div className="profile--block">
                <FormControl type="file" id="button--load" />

                <Button className="profile-button--load" variant="primary">
                  <label htmlFor="button--load">Загрузить</label>
                </Button>

                <Button className="profile-button--del" variant="success" onClick={() => deleteAvatar()}>
                  Удалить
                </Button>
              </div>
            </div>
            <Form.Group className="profile-photo__username">
              <Form.Label className="inner-container__head-block color-grey-400">
                ФИО
              </Form.Label>

              <FormControl
                type="email"
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
                  E-mail
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
                  Тип пользователя
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
            <div className="profile__save-edits">
              <Link to="/courses">
                <Button variant="success" onClick={()=> saveEdits()}>Сохранить изменения</Button>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export { Profile };
