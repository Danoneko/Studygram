import React, { useEffect, useState } from "react";
import { Form, FormControl, Modal, Button } from "react-bootstrap";
import Select from "react-select";

import dataUser from "../Data/dataUser.json";
import dataCourse from "../Data/dataCource.json";
import dataGroup from "../Data/dataGroup.json";

const EditTask = ({ bigData, name, setEditTask, item, ...props }) => {
  const [teach, setTeach] = useState([]);
  const [stud, setStud] = useState([]);
  const [course, setCourse] = useState("");

  // console.log(teach);
  // console.log(stud);

  useEffect(() => {
    setCourse(item.id_course);
    setTeach(item.teachers);
    setStud(item.students);
  }, [item.id_course, item.teachers, item.students]);

  const teachDefault = [];
  var obb = { value: "", label: "" };
  const iTech = item.teachers;
  iTech?.map((a) =>
    dataUser.find((b) =>
      a.id === b.id
        ? ((obb = { value: "", label: "" }),
          (obb.value = b.id),
          (obb.label = b.first_name + " " + b.surname),
          teachDefault.push(obb))
        : null
    )
  );

  const studDefault = [];
  item.students?.map((a) =>
    dataUser.find((b) =>
      a.id === b.id
        ? ((obb = { value: "", label: "" }),
          (obb.value = "student_" + b.id),
          (obb.label = b.first_name + " " + b.surname),
          studDefault.push(obb))
        : null
    )
  );
  const groupDefault = [];
  item.groups?.map((a) =>
    dataGroup.find((b) =>
      a.id === b.id
        ? ((obb = { value: "", label: "" }),
          (obb.value = "group_" + b.id),
          (obb.label = b.name),
          groupDefault.push(obb))
        : null
    )
  );

  Array.prototype.push.apply(groupDefault, studDefault);
  // console.log(usersDefault);

  var defaultCourse;
  dataCourse.find((a) =>
    a.id === item.id_course ? (defaultCourse = a.id) : ""
  );
  // console.log(defaultCourse);

  const defaultDataStart =
    item.date_start?.split("/")[2] +
    "-" +
    item.date_start?.split("/")[0] +
    "-" +
    item.date_start?.split("/")[1];
  const defaultDataFinish =
    item.date_finish?.split("/")[2] +
    "-" +
    item.date_finish?.split("/")[0] +
    "-" +
    item.date_finish?.split("/")[1];

  // console.log(defaultDataStart);
  // console.log(defaultDataFinish);

  const onChangeHandler = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    setCourse(el.getAttribute("id"));
  };

  function handleClose() {
    setEditTask(false);
  }

  function saveEdits() {
    // console.log(task_teachers);
    const task_title = String(
      document.getElementById("edit-task_title")?.value
    );

    var newData = {};
    if (name === "courses") {
      newData = { id: item.id, name: "", status: item.status, teachers: [] };
      newData.name = task_title;
      newData.teachers = teach;
    } else {
      const task_course = String(course);

      const task_date_start = String(
        document.getElementById("edit-task_date-start").value
      ).split("-");

      const task_date_finish = String(
        document.getElementById("edit-task_date-finish").value
      ).split("-");

      const task_students = [];
      stud.map((a) => {
        var task_students_id = { id: "" };
        task_students_id.id = a.value;
        return task_students.push(task_students_id);
      });

      const task_description = document.getElementById(
        "edit-task_description"
      ).value;

      newData = {
        id: item.id,
        id_course: "",
        name: "",
        date_start: "",
        date_finish: "",
        teachers: [],
        students: [],
        description: "",
        files: "Здесь будут прикрепленные файлы",
        status: item.status,
      };
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
      newData.teachers = teach;
      newData.students = stud;
      newData.description = task_description;
    }
    item = newData;

    // console.log("Таск отредактирован: ", newData);

    setEditTask(false);
  }

  const pageName =
    name === "courses" ? "курса" : name === "tasks" ? "задачи" : "встречи";

  // console.log(item);

  const teachOptions = [];

  // console.log(teachOptions);

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
  

  function onChange(e, it) {
    document.getElementById(it).value = e;
  }

  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="create-task"
      {...props}
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-l">Редактирование {pageName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="create-task__block">
          <div className="create-task__header">Название</div>
            <FormControl
              type="text"
              defaultValue={item.name}
              id="edit-task_title"
              onChange={(e) => onChange(e.target.value, "edit-task_title")}
            />
          </div>

          {name !== "courses" ? (
            <div className="create-task__block">
              <div className="create-task__header">Курс</div>
              <Form.Select
                id="edit-task_course"
                onChange={onChangeHandler}
                defaultValue={String(defaultCourse)}
              >
                {dataCourse.map((a, key) => (
                  <option id={a.id} key={key} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </Form.Select>
            </div>
          ) : (
            ""
          )}

          {name !== "courses" ? (
            <div className="create-task__block create-task__block--flex">
              <div className="create-task__date create-task__date--start">
                <div className="create-task__header">Дата начала</div>
                <FormControl
                  type="date"
                  id="edit-task_date-start"
                  defaultValue={defaultDataStart}
                />
              </div>
              <div className="create-task__date create-task__date--finish{">
                <div className="create-task__header">Дата завершения</div>
                <FormControl
                  type="date"
                  id="edit-task_date-finish"
                  defaultValue={defaultDataFinish}
                />
              </div>
            </div>
          ) : (
            ""
          )}

          <div className="create-task__block">
            <div className="create-task__header">Преподаватели</div>
            <Select
              isMulti
              options={teachOptions}
              onChange={(item) => setTeach(item)}
              id="edit-task_teachers"
              isClearable={true}
              isSearchable={true}
              defaultValue={teachDefault}
            />
          </div>

          {name !== "courses" ? (
            <>
              <div className="create-task__block">
                <div className="create-task__header">Описание</div>
                <Form.Control
                  as="textarea"
                  id="edit-task_description"
                  defaultValue={item.description}
                />
              </div>

              <div className="create-task__block">
                <div className="create-task__header">Участники</div>
                <Select
                  isMulti
                  options={groupOptions}
                  onChange={(item) => setStud(item)}
                  id="edit-task_students"
                  isClearable={true}
                  isSearchable={true}
                  defaultValue={groupDefault}
                />
              </div>

              <div className="create-task__block">
                <div className="create-task__header">Прикрепленные файлы</div>
                <FormControl type="file" id="button--load" />
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
              </div>
            </>
          ) : (
            ""
          )}

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
export { EditTask };
