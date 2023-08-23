import {
    Button,
    Form,
    FormControl,
    ListGroup,
    Pagination,
  } from "react-bootstrap";
  import React, { useState } from "react";
  
  import dataUser from "../Data/dataUser.json";
  
  import { Group } from "../Components/Group";
  
  import useWindowDimensions from "../hoc/WindowSize";
  
  import sort from "../Images/sort.svg";
  
  const imageSort = (
    <img
      src={sort}
      width="8px"
      height="16px"
      alt="Сортировать"
      className="sort__img"
    />
  );
  
  const Teachers = () => {
    const { width } = useWindowDimensions();
    // console.log("Ширина", width, "Высота", height,);
  
    const bigData = dataUser.filter(a => a.type === "teacher");

    const [blocks, setBlocks] = useState(bigData); // построение/поведение/ре-рендеринг блоков
    const [selectedBlock, setSelectedBlock] = useState([]); // выбранные блоки
    const [changeStatuses, setChangestatuses] = useState(); // удаление/восстановление встречи/задачи/курса
    const [searchTerm, setSearchTerm] = useState(""); // live search
    const [sortClick, setSortClick] = useState(false); //  сортировка по клику
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
          if (
            val.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            val.second_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            val.surname.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return val;
          } else return false;
        }
      })
      .slice(firstBlocksIndex, lastBlocksIndex);
  
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
  
    function changeStatusBlocks() {
      var rez = [];
      if (changeStatuses === "delete") {
        rez = selectedBlock.map((i) =>
        dataUser.find((a) => (a.id === i.id ? dataUser.splice(a.id, 1) : ""))
        );
      }
      setChangestatuses(rez);
      // console.log(rez);
    }
  
    function deleteUser(it) {
        dataUser.find((a) => (a.id === it.id ? dataUser.splice(it.id, 1) : ""));
    }
  
    function sorting(value) {
      const copyData = bigData.concat();
      let sortData;
      if (sortClick === false) {
        sortData = copyData.sort((a, b) => a[value].localeCompare(b[value]));
        setBlocks(sortData);
        setSortClick(!sortClick);
      } else {
        sortData = copyData.sort((a, b) => -1 * a[value].localeCompare(b[value]));
        setBlocks(sortData);
        setSortClick(!sortClick);
      }
    }
  
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
                  </Form.Select>
                  <Button variant="success" onClick={() => changeStatusBlocks()}>
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
                    <label htmlFor="allSelect_block" className="form-check-label">
                      Пользователь
                    </label>
                  </div>
  
                  <div
                    onClick={() => {
                      sorting("surname");
                    }}
                  >
                    {imageSort}
                  </div>
                </div>
                <div className="inner-container__head-block">Email</div>
                <div className="inner-container__head-block">
                  Роль
                  <div
                    onClick={() => {
                      sorting("type");
                    }}
                  >
                    {imageSort}
                  </div>
                </div>
                <div className="inner-container__head-block">Группа</div>
                <div className="inner-container__head-block">Действие</div>
              </ListGroup.Item>
              {currentBlocksIndex.map((it, key) => (
                <ListGroup.Item className="inner-container__block" key={key}>
                  <div className="form-check inner-container__block-defoult inner-container__block-name">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={"block_" + it.id}
                      name={it.id}
                      checked={selectedBlock.some((item) => item?.id === it.id)}
                      onChange={(e) => handleChange(e, it)}
                    />
  
                    <label
                      className="form-check-label"
                      htmlFor={"block_" + it.id}
                    >
                      {it.surname} {it.first_name} {it.second_name}
                    </label>
                  </div>
  
                  <div className="inner-container__block-defoult">
                    {it.email !== "" ? it.email : "—"}
                  </div>
                  <div className="inner-container__block-defoult">
                    {it.type === "teacher"
                      ? "Преподаватель"
                      : it.type === "student"
                      ? "Студент"
                      : "Администратор"}
                  </div>
                  <div className="inner-container__block-teachers-students">
                    {it.groups.length !== 0 ? (
                      <>
                        {it.groups.map((a) => (
                          <Group it={it} key={a.id} id_group={a.id} />
                        ))}
                      </>
                    ) : (
                      "—"
                    )}
                  </div>
  
                  <div
                    className="inner-container__block-defoult inner-container__block-detele"
                    onClick={() => deleteUser(it)}
                  >
                    <div className="img__delete"></div> Удалить
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
                    <label htmlFor="allSelect_block" className="form-check-label">
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
                        checked={selectedBlock.some((item) => item?.id === it.id)}
                        onChange={(e) => handleChange(e, it)}
                      />
                      <div
                        className="img__delete"
                        onClick={() => deleteUser(it)}
                      ></div>
                    </div>
  
                    <label
                      className="form-check-label form-check block-phone-inner"
                      htmlFor={"block_" + it.id}
                    >
                      <div className="heading-block heading-block-margin">
                        ФИО
                      </div>
                      <div className="inner-container__block-defoult">
                        {it.surname} {it.first_name} {it.second_name}
                      </div>
                      <div className="heading-block heading-block-margin">
                        Email
                      </div>
                      <div className="inner-container__block-defoult">
                        {it.email !== "" ? it.email : "—"}
                      </div>
                      <div className="heading-block heading-block-margin">
                        Роль
                      </div>
                      <div className="inner-container__block-defoult">
                        {it.type === "teacher"
                          ? "Преподаватель"
                          : it.type === "student"
                          ? "Студент"
                          : "Администратор"}
                      </div>
                      <div className="heading-block heading-block-margin">
                        Группы
                      </div>
                      <div className="inner-container__block-teachers-students">
                        {it.groups.length !== 0 ? (
                          <>
                            {it.groups.map((a) => (
                              <Group it={it} key={a.id} id_group={a.id} />
                            ))}
                          </>
                        ) : (
                          "—"
                        )}
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
    );
  };
  export { Teachers };
  