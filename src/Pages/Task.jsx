import React, { useState } from "react";
import { useNavigate, useLocation, Link, Outlet } from "react-router-dom";

import { Container, Accordion, Button } from "react-bootstrap";

import { EditTask } from "../Components/EditTask";
import { Group } from "../Components/Group";

import dataCourse from "../Data/dataCource.json";
import dataTask from "../Data/dataTask.json";
import dataMeeting from "../Data/dataMeeting.json";
import dataUser from "../Data/dataUser.json";
import dataGroup from "../Data/dataGroup.json";

import dots from "../Images/vertical-dot.svg";

const Task = () => {
  const [changeStatuses, setChangestatuses] = useState(); // удаление/восстановление встречи/задачи
  const [editTask, setEditTask] = useState(false); // показ модального окна создания таска
  const [taskEdit, setTaskEdit] = useState({});
  const [show, setShow] = useState(false);

  // console.log(useLocation());

  const params0 = useLocation().pathname.split("/")[1]; //  первый параметр в ссылке
  const params1 = useLocation().pathname.split("/")[2]; //  второй параметр в ссылке
  const bigData = params0 === "tasks" ? dataTask : dataMeeting; //  определяем с какими данными будем работать
  const task = bigData.find((a) => a.id === params1); //  определяем сам таск в данных

  // по полученным id находим самих пользователей в юзерах
  const students = task.students.map((i) =>
    dataUser.find((a) => a.id === i.id)
  );
  const teachers = task.teachers.map((i) =>
    dataUser.find((a) => a.id === i.id)
  );
  const course = dataCourse.find((a) => a.id === task.id_course);
  const groups = task.groups.map((i) => dataGroup.find((a) => a.id === i.id));

  const params = useLocation().pathname.split("/");

  // console.log(params);

  const navigate = useNavigate();
  const goBack = () => navigate("/" + params[1]);

  function changeStatusBlock(it) {
    if (it.status === "active") {
      it.status = "deleted";
    } else {
      it.status = "active";
    }
    setChangestatuses(it.status);
    // console.log(it.status);
  }

  function editTasks(it) {
    setTaskEdit(it);
    setEditTask(true);
  }

  function avatar(it) {
    var rez = {
      backgroundImage: "url(" + it + ")",
    };
    return rez;
  }

  function showMore() {
    document
      .getElementsByClassName("taks__body-body")[0]
      .classList.toggle("taks__body-body--block");
    setShow(!show);
  }

  return (
    <Container className="external-container">
      <EditTask
        bigData={bigData}
        name={params0 === "tasks" ? "tasks" : "meetings"}
        show={editTask}
        setEditTask={setEditTask}
        item={taskEdit}
        onHide={() => setEditTask(false)}
      />
      <Container className="external-container__task">
        <div className="task__head">
          <div className="task__previos-page" onClick={() => goBack()}>
            <div className="task__path">
              <i className="bi bi-chevron-left"></i>
            </div>
            <div className="text-s color-grey-500">Вернуться назад</div>
          </div>
          <div className="task__status">
            <div
              className={
                task.status === "active" ? "status__active" : "status__deleted"
              }
            >
              {task.status === "active" ? "Активна" : "Удалена"}
            </div>
            <div className="dropdown">
              <button
                className="btn dropdown-toggle status__dropdown-toggle"
                type="button"
                id="dropdownMenu1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={dots}
                  width="24px"
                  height="24px"
                  alt="Сортировать"
                  className="horizontal-dots"
                />
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() => changeStatusBlock(task)}
                  >
                    {task.status === "active"
                      ? (changeStatuses, "Удалить")
                      : (!changeStatuses, "Восстановить")}
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() => editTasks(task)}
                  >
                    Редактировать
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="taks__body">
          <div className="taks__body-header">
            <h6 className="taks__name">{task.name}</h6>

            <div className="taks__body-flex">
              <div className="task__title">{course.name}</div>
              <div className="task__date">
                {task.date_start.split("/")[1] +
                  "." +
                  task.date_start.split("/")[0] +
                  "." +
                  task.date_start.split("/")[2]}{" "}
                -{" "}
                {task.date_finish.split("/")[1] +
                  "." +
                  task.date_finish.split("/")[0] +
                  "." +
                  task.date_finish.split("/")[2]}
              </div>
            </div>
            <div className="taks__body-flex">
              <div className="task__title task__title--teacher">
                Преподаватели:
              </div>
              <div className="task__data">
                {teachers.map((a) => (
                  <div
                    key={a.id}
                    className="task__data-users inner-container__block-user"
                  >
                    {a.first_name} {a.surname}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="taks__body-body">
            <Accordion defaultActiveKey={["0"]} alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header className="task__acc-head">
                  Описание
                </Accordion.Header>
                <Accordion.Body className="taks__accordion">
                  {task.description}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Accordion defaultActiveKey={["0"]} alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header className="task__acc-head">
                  Участники
                </Accordion.Header>
                <Accordion.Body className="taks__accordion">
                  {task.groups !== undefined && task.groups !== [] ? (
                    <>
                      {task.groups.map((a) => (
                        <Group it={task} key={a.id} id_group={a.id} />
                      ))}
                      {students.map((a, key) => (
                        <div
                          key={key}
                          className="task__data-users inner-container__block-user"
                        >
                          {a.first_name} {a.surname}
                        </div>
                      ))}
                    </>
                  ) : (
                    ""
                  )}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Accordion defaultActiveKey={["0"]} alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header className="task__acc-head">
                  Прикрепленные файлы
                </Accordion.Header>
                <Accordion.Body className="taks__accordion">
                  {task.files}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
          <Button
            className="task__show-more"
            variant="primary"
            onClick={() => showMore()}
          >
            {!show ? "Показать больше" : "Скрыть"}
          </Button>
        </div>
      </Container>

      <Container className="external-container__task-message">
        <div className="task-message__chat">
          <Outlet />
        </div>
        <div className="task-message__message">
          <Accordion defaultActiveKey={["0"]} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header className="task-message__acc">
                Групповые чаты
              </Accordion.Header>
              <Accordion.Body className="chat__acc">
                <Link to={"all"}>
                  <div className="chat__point" id="all">
                    <div className="hash"></div> Все пользователи
                  </div>
                </Link>

                {groups.map((a) => (
                  <Link to={"group_" + a.id} key={a.id}>
                    <div className="chat__point" id={"group_" + a.id}>
                      <div className="hash"></div> {a.name}
                    </div>
                  </Link>
                ))}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <Accordion defaultActiveKey={["0"]} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header className="task-message__acc">
                Личные сообщения
              </Accordion.Header>
              <Accordion.Body className="chat__acc">
                {students.map((a) => (
                  <Link to={"user_" + a.id} key={a.id}>
                    <div
                      className="chat__point chat__point-users"
                      id={"user_" + a.id}
                    >
                      <div
                        style={avatar(a.avatar)}
                        className="chat__avatar"
                      ></div>{" "}
                      {a.first_name} {a.surname}
                    </div>
                  </Link>
                ))}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </Container>
    </Container>
  );
};
export { Task };
