import React, { useState, useEffect } from "react";
import { Accordion, Form, FormControl } from "react-bootstrap";

import dataUser from "../Data/dataUser.json";

const FiltersUser = ({ setValue, nameuser, titlefilter, ...props }) => {
  const userData = dataUser.filter((it) => it.type === nameuser); //  выборка пользователей
  const [isCollapsed, setIsCollapsed] = useState(true); // show more
  const [searchTerm, setSearchTerm] = useState(""); //  live search
  const [selectedUser, setSelectedUser] = useState([]);

  // console.log(userData);

  useEffect(() => {
    setValue(selectedUser);
  }, [setValue, selectedUser]);
    // setValue(selectedUser);

  // console.log('Filter', selectedUser);

  const handleChange = (e, data) => {
    const { name, checked } = e.target;
    if (checked) {
      if (name === "allSelect_user") {
        setSelectedUser(userData);
      } else {
        setSelectedUser([...selectedUser, data]);
      }
    } else {
      if (name === "allSelect_user") {
        setSelectedUser([]);
      } else {
        let tempuser = selectedUser.filter((item) => item.id !== data.id);
        setSelectedUser(tempuser);
      }
    }
  };

//   const [click, setClick] = useState(false);

// function foo(){
//   document.getElementById(nameuser).click();
// }
//   setTimeout(foo,10000)


  return (
    <>
      <div className="filter">
        <Accordion>
          {" "}
          {/*  defaultActiveKey={['0']} alwaysOpen  всегда открытый  */}
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <span className="color-grey-700 text-xs">
                {titlefilter} ({selectedUser.length})
              </span>
            </Accordion.Header>
            <Accordion.Body>
              <Form>
                <FormControl
                  type="search"
                  className="form__search"
                  placeholder="Поиск"
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
                <div className="form-check form__select-all">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="allSelect_user"
                    id={nameuser}
                    // allSelect_user selected when both length equal
                    // selecteduser === allUser
                    checked={selectedUser?.length === userData?.length}
                    onChange={(e) => handleChange(e, userData)}
                  />
                  <label htmlFor={nameuser} className="form-check-label">
                    Все
                  </label>
                </div>
                <ul className="form-check filter__form">
                  {userData &&
                    userData
                      .filter((val) => {
                        //  live search
                        if (searchTerm === "") {
                          return val;
                        } else {
                          if (
                            val.name
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase()) ||
                            val.surname
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                          ) {
                            return val;
                          } else return false;
                        }
                      })
                      .slice(0, isCollapsed ? 4 : userData.length) // show more
                      .map(
                        (
                          user,
                          index //  выгрузка и отметка checkbox
                        ) => (
                          <li key={index}>
                            <input
                              type="checkbox"
                              className="form-check-input"
                              name={user.id}
                              id={"user_" + user.id}
                              checked={selectedUser.some(
                                (item) => item?.id === user.id
                              )}
                              onChange={(e) => handleChange(e, user)}
                            />
                            <label
                              htmlFor={"user_" + user.id}
                              className="form-check-label"
                            >
                              {user.name} {user.surname}
                            </label>
                          </li>
                        )
                      )}
                </ul>
                <span
                  className="color-blue-900 text-xxs"
                  onClick={() => setIsCollapsed(!isCollapsed)}
                >
                  {isCollapsed ? "Показать еще" : "Скрыть"}
                </span>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  );
};

export { FiltersUser };
