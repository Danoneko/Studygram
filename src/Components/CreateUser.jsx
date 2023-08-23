import React, { useState } from "react";
import { Modal, Form, FormControl, Button } from "react-bootstrap";
import Select from "react-select";

import dataUser from "../Data/dataUser.json";
import dataGroup from "../Data/dataGroup.json";

const CreateUser = ({ setСreateUser, ...props }) => {
  const [group, setGroup] = useState([]);

  const handleClose = () => setСreateUser(false);

  const groupOptions = [];
  var obb = { value: "", label: "" };

  dataGroup.map((a) => {
    obb = { value: "", label: "" };
    obb.value = a.id;
    obb.label = a.name;
    return groupOptions.push(obb);
  });


  function saveEdits() {
    const newData = {
      id: "",
      type: "",
      first_name: "",
      second_name: "",
      surname: "",
      groups: [],
      email: "",
      avatar: "",
    };
    newData.id = String(Number(dataUser[dataUser.length - 1].id) + 1);
    newData.type = document.getElementById("user_type").value;
    newData.first_name = document.getElementById("user_name").value.split(" ")[1];
    newData.second_name = document.getElementById("user_name").value.split(" ")[2];
    newData.surname = document.getElementById("user_name").value.split(" ")[0];
    const user_groups = [];
    group.map((a)=> {
        var group_id = { id: "" };
        group_id.id = a.value;
        return user_groups.push(group_id);
    });
    newData.groups = user_groups;
    newData.email = document.getElementById("user_email").value;

    dataUser.push(newData);
    setСreateUser(false);
    console.log("Пользователь создан: ", newData);
  }

  return (
    <Modal aria-labelledby="contained-modal-title-vcenter" centered {...props}>
      <Modal.Header closeButton>
        <Modal.Title>Добавление нового пользователя</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="create-task__block">
            <Form.Label className="inner-container__head-block color-grey-400">
              ФИО
            </Form.Label>
            <FormControl
              type="text"
              placeholder="Фамилия Имя Отчество"
              id="user_name"
            />
          </Form.Group>
          <Form.Group className="create-task__block">
            <Form.Label className="inner-container__head-block color-grey-400">
              Email
            </Form.Label>
            <FormControl
              type="text"
              placeholder="Ivanov@gmail.com"
              id="user_email"
            />
          </Form.Group>
          <div className="profile--flex">
            <Form.Group className="create-task__block">
              <Form.Label className="inner-container__head-block color-grey-400">
                Роль пользователя
              </Form.Label>
              <Form.Select id="user_type">
              <option value="admin">Администратор</option>
                <option value="teacher">Преподаватель</option>
                <option value="student">Студент</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="create-task__block create-task__date--finish">
              <Form.Label className="inner-container__head-block color-grey-400">
                Группы
              </Form.Label>
              <Select
                isMulti
                options={groupOptions}
                onChange={(item) => setGroup(item)}
                id="user_groups"
                isClearable={true}
                isSearchable={true}
              />
            </Form.Group>
          </div>
          <div className="create-task__block create__save-edits">
            <Button
              variant="light"
              onClick={handleClose}
              className="create-task__save-edits--close"
            >
              Отменить
            </Button>
            <Button
              variant="success"
              onClick={() => saveEdits()}
              className="create-task__save-edits--save"
            >
              {"Сохранить"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export { CreateUser };
