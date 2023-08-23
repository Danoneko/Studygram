import React, { useState } from "react";
import { Modal, Form, FormControl, Button } from "react-bootstrap";
import Select from "react-select";

import dataUser from "../Data/dataUser.json";
import dataGroup from "../Data/dataGroup.json";

const CreateGroup = ({ setCreateGroup, ...props }) => {
  const handleClose = () => setCreateGroup(false);

  const [stud, setStud] = useState([]);

  const groupOptions = [];
  var obb = { value: "", label: "" };

  const data = dataUser.filter((a) => a.type === "student");

  data.map((a) => {
    obb = { value: "", label: "" };
    obb.value = a.id;
    obb.label = a.first_name + " " + a.surname;
    return groupOptions.push(obb);
  });

  const group_students = [];
  stud.map((a) => {
    var group_students_id = { id: "" };
    group_students_id.id = a.value;
    return group_students.push(group_students_id);
  });

  function saveEdits() {
    const newData = { id: "", name: "", users: [] };
    newData.id = String(Number(dataGroup[dataGroup.length - 1].id) + 1);
    newData.name = String(document.getElementById("create-group_title").value);
    newData.users = group_students;

    dataGroup.push(newData);
    setCreateGroup(false);
    console.log("Группа создана: ", newData);
  }

  return (
    <Modal aria-labelledby="contained-modal-title-vcenter" centered {...props}>
      <Modal.Header closeButton>
        <Modal.Title>Добавление новой группы</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="create-task__block">
            <Form.Label className="inner-container__head-block color-grey-400">
              Название
            </Form.Label>
            <FormControl
              type="text"
              placeholder="Введите название"
              id="create-group_title"
            />
          </Form.Group>
          <Form.Group className="create-task__block">
            <Form.Label className="inner-container__head-block color-grey-400">
              Участники
            </Form.Label>
            <Select
              isMulti
              options={groupOptions}
              onChange={(item) => setStud(item)}
              id="create-group_students"
              isClearable={true}
              isSearchable={true}
            />
          </Form.Group>
          <Form.Group className="create-task__block create__save-edits">
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
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export { CreateGroup };
