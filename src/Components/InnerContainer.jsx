import {
  Button,
  Form,
  FormControl,
  ListGroup,
  Pagination,
} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import dataCourse from "../Data/dataCource.json";
import dataTask from "../Data/dataTask.json";
import dataMeeting from "../Data/dataMeeting.json";
import dataUser from "../Data/dataUser.json";

import { UsersInBlock } from "../Components/UsersInBlock";
import useWindowDimensions from "../hoc/WindowSize";

import plus from "../Images/plus.svg";
import sort from "../Images/sort.svg";
import dots from "../Images/vertical-dot.svg";

const imageSort = (
  <img
    src={sort}
    width="8px"
    height="16px"
    alt="Сортировать"
    className="sort__img"
  />
);

const InnerContainer = ({
  pageArray, // массив с данными страниц
  teachers, // фильтр преподавателей
  students, // фильтр студентов
  statuses, // фильтр статусов
  course, // фильтр курсов
  name, // имя страницы в которой сейчас находимся
  ...props // остальные пропсы
}) => {
  // console.log(pageArray);
  // console.log(teachers);
  // console.log("Студенты: ", students);
  // console.log(statuses);
  // console.log(cource);
  // console.log(name);

  const { width } = useWindowDimensions();
  // console.log("Ширина", width, "Высота", height,);

  const list = pageArray.filter((it) =>
    Object.keys(it).find((key) => it[key] === name)
  ); // находим тот объект в массиве с данными страниц, id которого совпадает с переданным name
  // console.log(list);
  const innerArray = list.reduce((it) => it); // преобразуем полученный массив объекта в объект
  // console.log(innerArray);

  var bigData, nameCourse; // по имени страницы определяем с какими данными будем работать

  if (name === "courses") {
    bigData = dataCourse;
  }
  if (name === "tasks") {
    bigData = dataTask;
  }

  if (name === "meetings") {
    bigData = dataMeeting;
  }

  if (props.params !== undefined) {
    var params = props.params.split("_")[1];
    // bigData = bigData.filter((a) => a.id_course === params); // работает, но запускает бесонечный цикл
    nameCourse = dataCourse.find((a) => a.id === params);
  }

  const [searchTerm, setSearchTerm] = useState(""); // live search
  const [blocks, setBlocks] = useState(bigData); // построение/поведение/ре-рендеринг блоков
  const [selectedBlock, setSelectedBlock] = useState([]); // выбранные блоки
  const [sortClick, setSortClick] = useState(false); //  сортировка по клику
  const [changeStatuses, setChangestatuses] = useState(); // удаление/восстановление встречи/задачи/курса
  const [studBlock] = useState([]); // получаемые студенты
  const [currentPage, setCurrentPage] = useState(1); //  текущая страница
  const [blocksPage, setBlocksPage] = useState(10); //  количество страниц

  const lastBlocksIndex = currentPage * blocksPage; // индекс последней страницы
  const firstBlocksIndex = lastBlocksIndex - blocksPage; // индекс первой страницы
  const currentBlocksIndex = blocks
    .filter((val) => {
      //  live search
      if (searchTerm === "") {
        return val;
      } else {
        if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          return val;
        } else return false;
      }
    })
    .slice(firstBlocksIndex, lastBlocksIndex);

  useEffect(() => {
    var rez = bigData;

    function applyCourse(i) {
      rez = [];
      var res = i.map((a) => bigData.filter((b) => a.id === b.id_course));
      res.map((a) => a.map((b) => rez.push(b)));

      return rez;
    }

    const applyTeachers = (i) => {
      rez = [];
      i.map((a) =>
        bigData.map((b) =>
          b.teachers.map((c) => (c.id === a.id ? rez.push(b) : []))
        )
      );
      return rez;
    };

    const applyStudents = (i) => {
      var rez1 = [];
      rez = [];
      var rezStudBlock = studBlock.filter(
        // удаляем дубликаты
        (thing, index, self) =>
          index === self.findIndex((t) => t.id === thing.id)
      );
      // console.log(rezStudBlock);

      i.map((a) =>
        rezStudBlock.map((b) =>
          b.rez.map((c) => (c.id === a.id ? rez1.push({ id: b.id }) : []))
        )
      );

      rez1.map((a) => bigData.map((b) => (b.id === a.id ? rez.push(b) : [])));

      // console.log("applyStudents", rez);
      return rez;
    };

    const applyStatuses = (i) => {
      if (i.length === 1) {
        i = i.reduce((it) => it);
        rez = bigData.filter((a) => a.status === i.id);
      } else {
        rez = bigData;
      }
      return rez;
    };

    if (statuses.length !== 0) {
      applyStatuses(statuses);
    }
    if (teachers.length !== 0) {
      applyTeachers(teachers);
    }
    if (name !== "courses" && course.length !== 0) {
      applyCourse(course);
    }
    if (students.length !== 0) {
      applyStudents(students);
    }

    // console.log("all",rez);
    setBlocks(rez);
  }, [name, course, teachers, students, studBlock, statuses, bigData]);

  function handleChange(e, data) {
    // отметка всех/конкретного чекбокса
    const { name, checked } = e.target;
    if (checked) {
      if (name === "allSelect_block") {
        setSelectedBlock(blocks);
      } else {
        setSelectedBlock([...selectedBlock, data]);
      }
    } else {
      if (name === "allSelect_block") {
        setSelectedBlock([]);
      } else {
        let tempblock = selectedBlock.filter((item) => item.id !== data.id);
        setSelectedBlock(tempblock);
      }
    }
  }
  // console.log(selectedBlock);  // все выбранные блоки здесь

  function replaceDate(dateStr) {
    // замена даты с api на привычную
    const dateArr = dateStr.split("/");
    return dateArr[1] + "." + dateArr[0] + "." + dateArr[2];
  }
  // console.log(ReplaceDate("03/22/2022"));

  function tooltipShowT(e, i) {
    var elem = document.getElementById(e);

    if (elem.style.display === "none") {
      elem.style.display = "flex";
      document.getElementById(i).classList.add("count-users--active");
    } else {
      elem.style.display = "none";
      document.getElementById(i).classList.remove("count-users--active");
    }
  }

  function teach(it) {
    // вывод всех учителей из пользователей, состоящих в массиве с id учителями в курсе/задаче/встрече
    var res = it.teachers.map((i) => dataUser.find((a) => a.id === i.id));
    if (res.length > 1) {
      return (
        <>
          <div className="inner-container__block-user">
            {res[0].first_name} {res[0].surname}
          </div>
          <button
            type="button"
            className="count-users"
            id={"teachersBut_" + it.id}
            onClick={() =>
              tooltipShowT("teachers_" + it.id, "teachersBut_" + it.id)
            }
          >
            {" "}
            + {res.length - 1}
          </button>
          <div className="tooltip-users" id={"teachers_" + it.id}>
            {res.slice(1).map((a, key) => (
              <div key={key} className="inner-container__block-user">
                {a.first_name} {a.surname}
              </div>
            ))}
          </div>
        </>
      );
    } else {
      return res.map((a, key) => (
        <div key={key} className="inner-container__block-user">
          {a.first_name} {a.surname}
        </div>
      ));
    }

    // console.log(res);
  }

  function sorting(value) {
    const copyData = bigData.concat();
    let sortData;
    if (value !== "data_start") {
      if (sortClick === false) {
        sortData = copyData.sort((a, b) => a[value].localeCompare(b[value]));
        setBlocks(sortData);
        setSortClick(!sortClick);
      } else {
        sortData = copyData.sort(
          (a, b) => -1 * a[value].localeCompare(b[value])
        );
        setBlocks(sortData);
        setSortClick(!sortClick);
      }
    } else {
      if (sortClick === false) {
        sortData = copyData
          .sort((a, b) => {
            return new Date(a[value]).getTime() - new Date(b[value]).getTime();
          })
          .reverse();
        setBlocks(sortData);
        setSortClick(!sortClick);
      } else {
        sortData = copyData
          .sort((a, b) => {
            return (
              new Date(-1 * a[value]).getTime() - new Date(b[value]).getTime()
            );
          })
          .reverse();
        setBlocks(sortData);
        setSortClick(!sortClick);
      }
    }

    // console.log(sortData);
  }

  function changeStatusBlock(it) {
    // var rez = bigData.find((i) => i.id === it.id);
    if (it.status === "active") {
      it.status = "deleted";
    } else {
      it.status = "active";
    }
    setChangestatuses(it.status);
    // console.log(it.status);
  }

  function changeStatusBlocks() {
    var rez = [];
    if (changeStatuses === "delete") {
      rez = selectedBlock.map((i) => (i.status = "deleted"));
    } else {
      rez = selectedBlock.map((i) => (i.status = "active"));
    }
    setChangestatuses(rez);
    // console.log(rez);
  }

  // console.log(blocksPage);
  const pageNumders = [];
  for (let i = 1; i <= Math.ceil(blocks.length / blocksPage); i++) {
    pageNumders.push(i);
  }

  function paginate(pageNumder) {
    setCurrentPage(pageNumder);
  }

  // console.log(currentPage);

  function previousPage() {
    if (currentPage !== 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }

  function nextPage() {
    if (
      Math.ceil(blocks.length / blocksPage) !== 1 &&
      currentPage !== Math.ceil(bigData.length / blocksPage)
    ) {
      setCurrentPage((prev) => prev + 1);
    }
  }

  return (
    // основной внутренний контейнер
    <div className="inner-container">
      <div className="inner-container__header">
        <h1 className="title-m">
          {props.params !== undefined ? (
            <>
              {nameCourse.name}:{" "}
              <span className="title-ms">{innerArray.status}</span>
            </>
          ) : (
            innerArray.title
          )}{" "}
        </h1>
        <div>
          <Button variant="primary">
            {" "}
            <img
              src={plus}
              width="10px"
              height="10px"
              alt="Создать"
              className="filters__img"
            />
            Создать {innerArray.create}
          </Button>
        </div>
      </div>
      <div className="inner-container__body">
        <ListGroup variant="flush">
          {width > 768 ? (
            <>
              <ListGroup.Item>
                <Form className="inner-container__form">
                  <Form.Select
                    onChange={(e) => {
                      setChangestatuses(e.target.value);
                    }}
                  >
                    <option>Действия</option>
                    <option value="delete">Удалить</option>
                    <option value="recover">Восстановить</option>
                  </Form.Select>
                  <Button
                    variant="success"
                    onClick={() => changeStatusBlocks()}
                  >
                    Применить
                  </Button>
                </Form>
                <Form className="inner-container__form">
                  <FormControl
                    type="search"
                    className="form__search"
                    placeholder="Поиск"
                    onChange={(event) => setSearchTerm(event.target.value)}
                  />
                </Form>
              </ListGroup.Item>
              <ListGroup.Item className="inner-container__form-head">
                <div className="inner-container__head-block">
                  <div className="form-check form__select-all sel-all-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="allSelect_block"
                      // allSelect selected when both length equal
                      // selectedstatus === allUser
                      id="allSelect_block"
                      checked={selectedBlock?.length === blocks?.length}
                      onChange={(e) => handleChange(e, blocks)}
                    />
                    <label
                      htmlFor="allSelect_block"
                      className="form-check-label"
                    >
                      Название
                    </label>
                  </div>

                  <div
                    onClick={() => {
                      sorting("name");
                    }}
                  >
                    {imageSort}
                  </div>
                </div>

                {name !== "courses" ? (
                  <div className="inner-container__head-block">
                    Дата
                    <div
                      onClick={() => {
                        sorting("date_start");
                      }}
                    >
                      {imageSort}
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="inner-container__head-block">
                  Преподаватели
                  {/* <div
              onClick={() => {
                sorting("teachers");
              }}
              >
                {imageSort}
              </div> */}
                </div>
                <div className="inner-container__head-block">
                  Участники
                  {/* <div
              onClick={() => {
                sorting("name");
              }}
              >
                {imageSort}
              </div> */}
                </div>
                <div className="inner-container__head-block">
                  Статус
                  <div
                    onClick={() => {
                      sorting("status");
                    }}
                  >
                    {imageSort}
                  </div>
                </div>
              </ListGroup.Item>
              {currentBlocksIndex.map((it, key) => (
                <ListGroup.Item className="inner-container__block" key={key}>
                  <div className="form-check inner-container__name">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={"block_" + it.id}
                      name={it.id}
                      checked={selectedBlock.some((item) => item?.id === it.id)}
                      onChange={(e) => handleChange(e, it)}
                    />
                    {name !== "courses" ? (
                      <label
                        className="form-check-label"
                        htmlFor={"block_" + it.id}
                      >
                        <div className="text-xxs color-grey-400">
                          {dataCourse.find((i) => i.id === it.id_course).name}
                        </div>
                        <div>
                          <Link to={name + "_" + it.id}>
                            {it.name} {it.id}
                          </Link>
                        </div>
                      </label>
                    ) : (
                      <label
                        className="form-check-label"
                        htmlFor={"block_" + it.id}
                      >
                        <Link to={name + "_" + it.id}>
                          {it.name} {it.id}
                        </Link>
                      </label>
                    )}
                  </div>

                  {name !== "courses" ? (
                    <div className="inner-container__block-date">
                      {replaceDate(it.date_start)} -
                      {replaceDate(it.date_finish)}
                    </div>
                  ) : (
                    <></>
                  )}

                  <div className="inner-container__block-teachers-students">
                    {teach(it)}
                  </div>
                  <div className="inner-container__block-teachers-students">
                    <UsersInBlock
                      it={it}
                      bigData={bigData}
                      name={name}
                      studBlock={studBlock}
                    />
                  </div>
                  <div className="inner-container__block-status">
                    <div
                      className={
                        it.status === "active"
                          ? "status__active"
                          : "status__deleted"
                      }
                    >
                      {it.status === "active" ? "Активен" : "Удален"}
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
                          className="sort__img"
                        />
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenu1"
                      >
                        <li>
                          <button
                            className="dropdown-item"
                            type="button"
                            onClick={() => changeStatusBlock(it)}
                          >
                            {it.status === "active"
                              ? (changeStatuses, "Удалить")
                              : (!changeStatuses, "Восстановить")}
                          </button>
                        </li>
                        <li>
                          <button className="dropdown-item" type="button">
                            Редактировать
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
              <ListGroup.Item className="inner-container__footer">
                <Form className="inner-container__footer-block">
                  <div className="text-s">Показать:</div>
                  <Form.Select
                    onChange={(e) => setBlocksPage(e.target.value)}
                    defaultValue="10"
                  >
                    <option value="5">5 строк</option>
                    <option value="10">10 строк</option>
                    <option value="20">20 строк</option>
                    <option value="50">50 строк</option>
                    <option value="100">100 строк</option>
                  </Form.Select>
                </Form>
                <Pagination className="inner-container__footer-pagination">
                  <Pagination.First onClick={() => setCurrentPage(1)} />
                  <Pagination.Prev onClick={() => previousPage()} />
                  {pageNumders.map((number) => (
                    <Pagination.Item
                      key={number}
                      onClick={() => paginate(number)}
                      className={currentPage === number ? "active" : ""}
                    >
                      {number}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next onClick={() => nextPage()} />
                  <Pagination.Last
                    onClick={() =>
                      setCurrentPage(Math.ceil(blocks.length / blocksPage))
                    }
                  />
                </Pagination>
              </ListGroup.Item>
            </>
          ) : (
            <>
              <ListGroup.Item>
                <Form className="inner-container__form">
                  <FormControl
                    type="search"
                    className="form__search"
                    placeholder="Поиск"
                    onChange={(event) => setSearchTerm(event.target.value)}
                  />
                </Form>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="inner-container__head-block">
                  <div className="form-check form__select-all sel-all-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="allSelect_block"
                      // allSelect selected when both length equal
                      // selectedstatus === allUser
                      id="allSelect_block"
                      checked={selectedBlock?.length === blocks?.length}
                      onChange={(e) => handleChange(e, blocks)}
                    />
                    <label
                      htmlFor="allSelect_block"
                      className="form-check-label"
                    >
                      Выбрать все ({selectedBlock.length})
                    </label>
                  </div>
                  <Form className="inner-container__footer-block">
                    Показать:
                    <Form.Select
                      onChange={(e) => setBlocksPage(e.target.value)}
                      defaultValue="10"
                    >
                      <option value="5">5 строк</option>
                      <option value="10">10 строк</option>
                      <option value="20">20 строк</option>
                      <option value="50">50 строк</option>
                      <option value="100">100 строк</option>
                    </Form.Select>
                  </Form>
                </div>
              </ListGroup.Item>
              {currentBlocksIndex.map((it, key) => (
                <ListGroup.Item className="inner-container__block" key={key}>
                  <div className="inner-container__block-phone">
                    <div className="block-phone-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={"block_" + it.id}
                        name={it.id}
                        checked={selectedBlock.some(
                          (item) => item?.id === it.id
                        )}
                        onChange={(e) => handleChange(e, it)}
                      />
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
                            className="sort__img"
                          />
                        </button>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenu1"
                        >
                          <li>
                            <button
                              className="dropdown-item"
                              type="button"
                              onClick={() => changeStatusBlock(it)}
                            >
                              {it.status === "active"
                                ? (changeStatuses, "Удалить")
                                : (!changeStatuses, "Восстановить")}
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <label
                      className="form-check-label form-check block-phone-inner"
                      htmlFor={"block_" + it.id}
                    >
                      <div className="inner-container__name">
                        {name !== "courses" ? (
                          <>
                            <div className="text-xxs color-grey-400 heading-block">
                              {
                                dataCourse.find((i) => i.id === it.id_course)
                                  .name
                              }
                            </div>
                            <div>
                              <Link to={name + "_" + it.id}>
                                {it.name} {it.id}
                              </Link>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="heading-block">Название курса</div>
                            <Link to={name + "_" + it.id}>
                              {it.name} {it.id}
                            </Link>
                          </>
                        )}
                      </div>
                      {name !== "courses" ? (
                        <>
                          <div className="heading-block heading-block-margin">
                            Дата
                          </div>
                          <div className="inner-container__block-date">
                            {replaceDate(it.date_start)} -
                            {replaceDate(it.date_finish)}
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      <div className="heading-block heading-block-margin">
                        Переподаватели
                      </div>
                      <div className="inner-container__block-teachers-students">
                        {teach(it)}
                      </div>
                      <div className="heading-block heading-block-margin">
                        Студенты
                      </div>
                      <div className="inner-container__block-teachers-students">
                        <UsersInBlock
                          it={it}
                          bigData={bigData}
                          name={name}
                          studBlock={studBlock}
                        />
                      </div>
                      <div className="heading-block heading-block-margin">
                        Статус
                      </div>
                      <div className="inner-container__block-status">
                        <div
                          className={
                            it.status === "active"
                              ? "status__active"
                              : "status__deleted"
                          }
                        >
                          {it.status === "active" ? "Активен" : "Удален"}
                        </div>
                      </div>
                    </label>
                  </div>
                </ListGroup.Item>
              ))}
              <Pagination className="inner-container__footer-pagination">
                <Pagination.First onClick={() => setCurrentPage(1)} />
                <Pagination.Prev onClick={() => previousPage()} />
                {pageNumders.map((number) => (
                  <Pagination.Item
                    key={number}
                    onClick={() => paginate(number)}
                    className={currentPage === number ? "active" : ""}
                  >
                    {number}
                  </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => nextPage()} />
                <Pagination.Last
                  onClick={() =>
                    setCurrentPage(Math.ceil(blocks.length / blocksPage))
                  }
                />
              </Pagination>
            </>
          )}
        </ListGroup>
      </div>
    </div>
  );
};

export { InnerContainer };
