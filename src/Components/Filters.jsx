import React, { useState } from "react";
import { Accordion, Form, FormControl } from "react-bootstrap";

import data from "../Data/data";

const Filters = (props) => {
  const userData = data.filter((it) => it.role === props.name); //  выборка пользователей
  const [isCollapsed, setIsCollapsed] = useState(true); // show more
  const [searchTerm, setSearchTerm] = useState(""); //  live search
  const [users] = useState(userData);
  const [selectedUser, setSelectedUser] = useState([]);

  
 props.setValue(selectedUser);
  // console.log('fil', selectedUser);
//  console.log('fil', props.value);
 
  const handleChange = (e, data) => {
    const { name, checked } = e.target;
    if (checked) {
      if (name === "allSelect") {
        setSelectedUser(users);
      } else {
        setSelectedUser([...selectedUser, data]);
      }
    } else {
      if (name === "allSelect") {
        setSelectedUser([]);
      } else {
        let tempuser = selectedUser.filter((item) => item.id !== data.id);
        setSelectedUser(tempuser);
      }
    }
  };

  return (
    <>
      <div className="filter">
        <Accordion alwaysOpen>
          <Accordion.Item>
            <Accordion.Header>
              <span className="color-grey-700 text-xs">{props.title}</span>
            </Accordion.Header>
            <Accordion.Body>
              <Form>
                <FormControl
                  type="search"
                  className="form__search"
                  placeholder="Поиск"
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
                <div className="form-check form__select">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="allSelect"
                    // allSelect selected when both length equal
                    // selecteduser === allUser
                    checked={selectedUser?.length === users?.length}
                    onChange={(e) => handleChange(e, users)}
                  />
                  <label className="form-check-label">Все</label>
                </div>
                <ul className="form-check filter__form">
                  {users &&
                    users
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
                      .slice(0, isCollapsed ? 4 : users.length) // show more
                      .map(
                        (
                          user,
                          index //  выгрузка и отметка checkbox
                        ) => (
                          <li key={index}>
                            <input
                              type="checkbox"
                              className="form-check-input"
                              name={user.name}
                              checked={selectedUser.some(
                                (item) => item?.id === user.id
                              )}
                              onChange={(e) => handleChange(e, user)}
                            />
                            <label className="form-check-label">
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

export { Filters };
