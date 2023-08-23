import React, { useState } from "react";
import {
  Button,
  Form,
  FormControl,
  Accordion,
  Pagination,
} from "react-bootstrap";

import dataGroup from "../Data/dataGroup.json";
import dataUser from "../Data/dataUser.json";

import { Group } from "../Components/Group";

import dots from "../Images/vertical-dot.svg";

const Groups = () => {
  const [blocks] = useState(dataGroup); // построение/поведение/ре-рендеринг блоков
  const [searchTerm, setSearchTerm] = useState(""); // live search
  const [currentPage, setCurrentPage] = useState(1); //  текущая страница
  const [blocksPage, setBlocksPage] = useState(10); //  количество страниц

  const lastBlocksIndex = currentPage * blocksPage; // индекс последней страницы
  const firstBlocksIndex = lastBlocksIndex - blocksPage; // индекс первой страницы
  const currentBlocksIndex = blocks.filter((val) => {
    //  live search
    if (searchTerm === "") {
      return val;
    } else {
      if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return val;
      } else return false;
    }
  }).slice(firstBlocksIndex, lastBlocksIndex);

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
      currentPage !== Math.ceil(dataUser.length / blocksPage)
    ) {
      setCurrentPage((prev) => prev + 1);
    }
  }

  function deleteUser(it) {
    dataGroup.find((a) => (a.id === it.id ? dataUser.splice(it.id, 1) : ""));
  }

  function users(it) {
    const user = [];
    it.map((a) => dataUser.find((b) => (a.id === b.id ? user.push(b) : "")));
    return (
      <>
        {user.map((a, key) => (
          <div key={key} className="group-item__user">
            <div className="inner-container__block-defoult inner-container__block-name">
              <div className="form-check group-item__from-chek">
                <input
                  type="checkbox"
                  id={"block_user_" + a.id}
                  className="form-check-input"
                />
                <label
                  htmlFor={"block_user_" + a.id}
                  className="form-check-label group-item__label"
                >
                  {a.first_name} {a.second_name} {a.surname}
                </label>
              </div>
            </div>
            <div className="inner-container__block-defoult">
              {a.email !== "" ? a.email : "—"}
            </div>
            <div className="inner-container__block-defoult">
              {a.type === "teacher"
                ? "Преподаватель"
                : a.type === "student"
                ? "Студент"
                : "Администратор"}
            </div>
            <div className="inner-container__block-defoult inner-container__block-teachers-students">
              {a.groups.length !== 0 ? (
                <>
                  {a.groups.map((it) => (
                    <Group it={a} key={it.id} id_group={it.id} />
                  ))}
                </>
              ) : (
                "—"
              )}
            </div>
            <div className="inner-container__block-defoult">
              <div className="dropdown group-item__dots">
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
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                  <li>
                    <button
                      className="dropdown-item"
                      type="button"
                      // onClick={() => changeStatusBlock(it)}
                    >
                      Удалить из группы
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      type="button"
                      // onClick={() => editTasks(it)}
                    >
                      Удалить из системы
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      <div className="groups__header">
        <Form className="inner-container__form">
          <Form.Select
          // onChange={(e) => {
          //   setChangestatuses(e.target.value);
          // }}
          >
            <option>Действия</option>
            <option value="delete">Удалить</option>
          </Form.Select>
          <Button
            variant="success"
            // onClick={() => changeStatusBlocks()}
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
      </div>
      {currentBlocksIndex.map((it, key) => (
        <Accordion key={key} className="group-item">
          <Accordion.Header className="group-item__header">
            <div className="form-check group-item__from-chek">
              <input
                type="checkbox"
                id={"block_" + it.id}
                className="form-check-input"
              />
              <label
                htmlFor={"block_" + it.id}
                className="form-check-label group-item__label"
              >
                {it.name}
              </label>
            </div>
            <div className="messages-input--flex">
              <div
                className="inner-container__block-defoult inner-container__block-detele"
                onClick={() => deleteUser(it)}
              >
                <div className="img__add"></div> Добавить пользователя
              </div>
              <div
                className="inner-container__block-defoult inner-container__block-detele"
                onClick={() => deleteUser(it)}
              >
                <div className="img__delete"></div> Удалить
              </div>
            </div>
          </Accordion.Header>
          <Accordion.Body className="group-item__acc-body">
            {users(it.users)}
          </Accordion.Body>
        </Accordion>
      ))}
      <div className="inner-container__footer">
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
      </div>
    </>
  );
};
export { Groups };
