import React, { useState } from "react";
import { Form, FormControl, Modal, Button } from "react-bootstrap";
import Select from "react-select";

import dataUser from "../Data/dataUser.json";
import dataCourse from "../Data/dataCource.json";
import dataGroup from "../Data/dataGroup.json";

const CreateTask = ({ bigData, name, setCreateTask, ...props }) => {
  const [teach, setTeach] = useState([]);
  const [stud, setStud] = useState([]);
  const [course, setCourse] = useState("");

  const onChangeHandler = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    setCourse(el.getAttribute("id"));
  };

  const handleClose = () => setCreateTask(false);

  function saveEdits() {
    const task_title = String(
      document.getElementById("create-task_title").value
    );

    const task_teachers = [];
    teach.map((a) => {
      var task_teachers_id = { id: "" };
      task_teachers_id.id = a.value;
      return task_teachers.push(task_teachers_id);
    });
    // console.log(task_teachers);
    // console.log(task_teachers_id);

    var newData = {};
    if (name === "courses") {
      newData = { id: "", name: "", status: "active", teachers: [] };
      newData.id = String(Number(bigData[bigData.length - 1].id) + 1);
      newData.name = task_title;
      newData.teachers = task_teachers;
    } else {
      const task_course = String(course);

      const task_date_start = String(
        document.getElementById("create-task_date-start").value
      ).split("-");

      const task_date_finish = String(
        document.getElementById("create-task_date-finish").value
      ).split("-");

      const task_students = [];
      const task_groups = [];
      stud.map((a) => {
        var task_id = { id: "" };
        if (a.value.split("_")[0] === "student") {
          task_id.id = a.value.split("_")[1];
          return task_students.push(task_id);
        } else {
          if (a.value.split("_")[0] === "group") {
            task_id.id = a.value.split("_")[1];
            return task_groups.push(task_id);
          } else {
            return null;
          }
        }
      });

      // console.log("студенты", task_students);
      // console.log("группы", task_groups);

      const task_description = document.getElementById(
        "create-task_description"
      ).value;

      newData = {
        id: "",
        id_course: "",
        name: "",
        date_start: "",
        date_finish: "",
        teachers: [],
        students: [],
        groups: [],
        description: "",
        files: "Здесь будут прикрепленные файлы",
        status: "active",
      };
      newData.id = String(Number(bigData[bigData.length - 1].id) + 1);
      newData.id_course = task_course;
      newData.name = task_title;
      newData.date_start =
        task_date_start[1] +
        "/" +
        task_date_start[2] +
        "/" +
        task_date_start[0];
      newData.date_finish =
        task_date_finish[1] +
        "/" +
        task_date_finish[2] +
        "/" +
        task_date_finish[0];
      newData.teachers = task_teachers;
      newData.students = task_students;
      newData.groups = task_groups;
      newData.description = task_description;
    }
    bigData.push(newData);

    console.log("Таск создан: ", newData);

    setCreateTask(false);
  }

  const pageName =
    name === "courses" ? "курса" : name === "tasks" ? "задачи" : "встречи";

  const teachOptions = [];
  var obb = { value: "", label: "" };

  dataUser.filter((a) =>
    a.type === "teacher"
      ? ((obb = { value: "", label: "" }),
        (obb.value = a.id),
        (obb.label = a.first_name + " " + a.surname),
        teachOptions.push(obb))
      : null
  );

  const studOptions = [];
  dataUser.filter((a) =>
    a.type === "student"
      ? ((obb = { value: "", label: "" }),
        (obb.value = "student_" + a.id),
        (obb.label = a.first_name + " " + a.surname),
        studOptions.push(obb))
      : null
  );

  const groupOptions = [];
  dataGroup.map((a) => {
    obb = { value: "", label: "" };
    obb.value = "group_" + a.id;
    obb.label = a.name;
    return groupOptions.push(obb);
  });
  Array.prototype.push.apply(groupOptions, studOptions);
  // console.log(groupOptions);

  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="create-task"
      {...props}
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-l">Создание {pageName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="create-task__block">
            <Form.Label className="inner-container__head-block color-grey-400">
              Название
            </Form.Label>
            <FormControl
              type="text"
              placeholder={"Введите название " + pageName}
              id="create-task_title"
            />
          </Form.Group>

          {name !== "courses" ? (
            <Form.Group className="create-task__block">
              <Form.Label className="inner-container__head-block color-grey-400">
                Курс
              </Form.Label>
              <Form.Select
                defaultValue={0}
                id="create-task_course"
                onChange={onChangeHandler}
              >
                {dataCourse.map((a, key) => (
                  <option id={a.id} key={key}>
                    {a.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          ) : (
            ""
          )}

          {name !== "courses" ? (
            <Form.Group className="create-task__block create-task__block--flex">
              <div className="create-task__date create-task__date--start">
                <Form.Label className="inner-container__head-block color-grey-400">
                  Дата начала
                </Form.Label>
                <FormControl type="date" id="create-task_date-start" />
              </div>
              <div className="create-task__date create-task__date--finish{">
                <Form.Label className="inner-container__head-block color-grey-400">
                  Дата завершения
                </Form.Label>
                <FormControl type="date" id="create-task_date-finish" />
              </div>
            </Form.Group>
          ) : (
            ""
          )}

          <Form.Group className="create-task__block">
            <Form.Label className="inner-container__head-block color-grey-400">
              Преподаватели
            </Form.Label>
            <Select
              isMulti
              options={teachOptions}
              onChange={(item) => setTeach(item)}
              id="create-task_teachers"
              isClearable={true}
              isSearchable={true}
            />
          </Form.Group>

          {name !== "courses" ? (
            <>
              <Form.Group className="create-task__block">
                <Form.Label className="inner-container__head-block color-grey-400">
                  Описание
                </Form.Label>
                <Form.Control as="textarea" id="create-task_description" />
              </Form.Group>

              <Form.Group className="create-task__block">
                <Form.Label className="inner-container__head-block color-grey-400">
                  Участники
                </Form.Label>
                <Select
                  isMulti
                  options={groupOptions}
                  onChange={(item) => setStud(item)}
                  id="create-task_students"
                  isClearable={true}
                  isSearchable={true}
                />
              </Form.Group>

              <Form.Group className="create-task__block">
                <Form.Label className="inner-container__head-block color-grey-400">
                  Прикрепленные файлы
                </Form.Label>
                <FormControl type="file" id="create-task_files" />
                <div className="create-task__files">
                  <div>Перетащите файлы сюда или</div>
                  <div>
                    <label
                      htmlFor="create-task_files"
                      className="color-blue-900"
                    >
                      загрузите в ручную...
                    </label>
                  </div>
                </div>
              </Form.Group>
            </>
          ) : (
            ""
          )}

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
export { CreateTask };
