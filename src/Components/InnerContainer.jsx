import { Button, Form, FormControl, ListGroup } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import dataCourse from "../Data/dataCource.json";
import dataTask from "../Data/dataTask.json";
import dataMeeting from "../Data/dataMeeting.json";
import dataUser from "../Data/dataUser.json";

import { UsersInBlock } from "../Components/UsersInBlock";

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
  pageArray, //  массив с данными страниц
  teachers, //  фильтр преподавателей
  students, //  фильтр студентов
  statuses, //  фильтр статусов
  cource, //  фильтр курсов
  name, //  имя страницы в которой сейчас находимся
  ...props //  остальные пропсы
}) => {
  // console.log(pageArray);
  // console.log(teachers);
  // console.log(students);
  // console.log(statuses);
  // console.log(cource);
  // console.log(name);

  const list = pageArray.filter((it) =>
    Object.keys(it).find((key) => it[key] === name)
  ); //  находим тот объект в массиве с данными страниц, id которого совпадает с переданным name
  // console.log(list);
  const innerArray = list.reduce((it) => it); // преобразуем полученный массив объекта в объект
  // console.log(innerArray);

  let bigData; // по имени страницы определяем с какими данными будем работать
  if (name === "courses") {
    bigData = dataCourse;
  }
  if (name === "tasks") {
    bigData = dataTask;
  }
  if (name === "meetings") {
    bigData = dataMeeting;
  }
  // console.log(bigData)

  const [searchTerm, setSearchTerm] = useState(""); //  live search
  const [blocks, setBlocks] = useState(bigData); // построение/поведение/ре-рендеринг блоков
  const [selectedBlock, setSelectedBlock] = useState([]); // выбранные блоки
  const [sortClick, setSortClick] = useState(false); //  сортировка по клику

  //   const ApplyStatus = useCallback(() => {

  //     setBlocks(rez);
  //   }, [rez]);

  // },[]);

  const ApplyStatus = (i) => {
    var rez;
    if (i.length === 1) {
      i = i.reduce((it) => it);
      rez = bigData.filter((a) => a.status === i.id);
    } else {
      rez = bigData;
    }
    // console.log("i got it", i);

    useEffect(() => {
      setBlocks(rez);
    }, [rez]);

    console.log(rez);
  };
  ApplyStatus(statuses);

  const handleChange = (e, data) => {
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
  };
  // console.log(selectedBlock);  // все выбранные блоки здесь

  const ReplaceDate = ({ dateStr }) => {
    // замена даты с api на привычную
    const dateArr = dateStr.split("/");
    return dateArr[1] + "." + dateArr[0] + "." + dateArr[2];
  };
  // console.log(ReplaceDate("03/22/2022"));

  const InnerBlock = () => {
    // внутренний блок курса/задачи/встречи
    function teach(it) {
      let res = it.teachers.map((i) => dataUser.find((a) => a.id === i.id));
      let rez = res.reduce((i) => i);
      return (
        <div className="inner-container__block-user">
          {rez.name} {rez.surname}
        </div>
      );
    }
    return blocks
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
      .map((it, key) => (
        <ListGroup.Item className="inner-container__block" key={key}>
          <div className="form-check inner-container__name">
            <input
              type="checkbox"
              className="form-check-input"
              id={it.id}
              name={it.id}
              checked={selectedBlock.some((item) => item?.id === it.id)}
              onChange={(e) => handleChange(e, it)}
            />
            <label htmlFor="{it.id}" className="form-check-label">
              <Link to={name + it.id}>
                {it.name} {it.id}
              </Link>
            </label>
          </div>

          {name !== "courses" ? (
            <div className="inner-container__block-date">
              <ReplaceDate dateStr={it.date_start} /> -
              <ReplaceDate dateStr={it.date_finish} />
            </div>
          ) : (
            <></>
          )}

          <div className="inner-container__block-teachers">{teach(it)}</div>
          <div className="inner-container__block-students">
            <UsersInBlock
              it={it}
              bigData={bigData}
              name={name}
              type="students"
            />
          </div>
          <div className="inner-container__block-status">
            <div
              className={
                it.status === "active" ? "status__active" : "status__deleted"
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
              <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                <li>
                  <button className="dropdown-item" type="button">
                    Удалить
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </ListGroup.Item>
      ));
  };

  const Sorting = (value) => {
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
  };

  return (
    // основной внутренний контейнер
    <div className="inner-container">
      <div className="inner-container__header">
        <div>
          <h1 className="title-m">{innerArray.title}</h1>
        </div>
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
          <ListGroup.Item>
            {" "}
            <Form className="inner-container__form">
              <Form.Select>
                <option value="1">Действия</option>
                <option value="1">Удалить</option>
              </Form.Select>
              <Button variant="success">Применить</Button>
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
            <div className="form-check form__select-all inner-container__head-block">
              <div>
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
                <label htmlFor="allSelect_block" className="form-check-label">
                  Название
                </label>
              </div>
              <div
                onClick={() => {
                  Sorting("name");
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
                    Sorting("date_start");
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
                Sorting("teachers");
              }}
              >
                {imageSort}
              </div> */}
            </div>
            <div className="inner-container__head-block">
              Участники
              {/* <div
              onClick={() => {
                Sorting("name");
              }}
              >
                {imageSort}
              </div> */}
            </div>
            <div className="inner-container__head-block">
              Статус
              <div
                onClick={() => {
                  Sorting("status");
                }}
              >
                {imageSort}
              </div>
            </div>
          </ListGroup.Item>
          <InnerBlock />
        </ListGroup>
      </div>
    </div>
  );
};

export { InnerContainer };
