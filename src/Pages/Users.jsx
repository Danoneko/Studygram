import React, { useState } from "react";
import { Container, Accordion } from "react-bootstrap";

import { FiltersUser } from "../Components/FiltersUser";
import { FiltersStatus } from "../Components/FilterStatus";
import useWindowDimensions from "../Components/WindowSize"

import filterImg from "../Images/filters.png";

const Users = (props) => {
  const [teachers, setTeachers] = useState([]); //  состояние преподавателей
  const [students, setStudents] = useState([]); //  состояние студентов
  const [status, setStatus] = useState([]); //  состояние статусa
  // console.log("Teachers", teachers);
  // console.log("Students", students);
  // console.log("Status", status);

  const fil = document.querySelectorAll(".filter");
  // console.log(fil.length);

  const { height, width } = useWindowDimensions();
  // console.log("width", width, "height", height,);



  return (
    <Container className="external-container">
      <div className="external-container__filters">
        {width > 768 ? 
          <>
            <FiltersUser
              setValue={setTeachers}
              nameuser="teacher"
              titlefilter="Преподаватели"
            />
            <FiltersUser
              setValue={setStudents}
              nameuser="student"
              titlefilter="Студенты"
            />
            <FiltersStatus titlefilter="Статусы" setValue={setStatus} />
          </>
         : 
          <>
            <Accordion className="external-container__filters--phone">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <img src={filterImg} alt="Фильтры" className="filters__img" />
                  <div className="text-m">Фильтры ({fil.length})</div>
                </Accordion.Header>
                <Accordion.Body>
                  <FiltersUser
                    setValue={setTeachers}
                    nameuser="teacher"
                    titlefilter="Преподаватели"
                  />
                  <FiltersUser
                    setValue={setStudents}
                    nameuser="student"
                    titlefilter="Студенты"
                  />
                  <FiltersStatus titlefilter="Статусы" setValue={setStatus} />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </>
        }

      </div>

      <Container className="external-container__inner">
        <h1 className="title-m">{props.titlePage}</h1>
        <div>
          {teachers.map((user, index) => (
            <p key={index}>
              {user.name} {user.surname}
            </p>
          ))}
          {students.map((user, index) => (
            <p key={index}>
              {user.name} {user.surname}
            </p>
          ))}
          {status.map((user, index) => (
            <p key={index}>{user.title}</p>
          ))}
        </div>
      </Container>
    </Container>
  );
};

export { Users };
