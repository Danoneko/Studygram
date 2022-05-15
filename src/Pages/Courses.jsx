import React, { useState } from "react";
import { Container, Accordion } from "react-bootstrap";

import { FiltersUser } from "../Components/FiltersUser";
import { FiltersStatus } from "../Components/FilterStatus";
import { InnerContainer } from "../Components/InnerContainer";
import useWindowDimensions from "../hoc/WindowSize";

import filterImg from "../Images/filters.svg";

const Courses = ({ pageArray, ...props }) => {
  const courceArray = pageArray[0];

  const [teachers, setTeachers] = useState([]); //  состояние преподавателей
  const [students, setStudents] = useState([]); //  состояние студентов
  const [statuses, setStatuses] = useState([]); //  состояние статусa
  // console.log("Teachers", teachers);
  // console.log("Students", students);
  // console.log("Status", status);

  const fil = document.querySelectorAll(".filters");
  // console.log(fil.length);

  const { width } = useWindowDimensions();
  // console.log("Ширина", width, "Высота", height,);

  return (
    <Container className="external-container">
      <div className="external-container__filters">
        {width > 768 ? (
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
            <FiltersStatus
              titlefilter={"Статус " + courceArray.status}
              text="проекты"
              setValue={setStatuses}
            />
          </>
        ) : (
          <>
            <Accordion>
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
                  <FiltersStatus
                    titlefilter={"Статус " + courceArray.status}
                    text="проекты"
                    setValue={setStatuses}
                  />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </>
        )}
      </div>

      <Container className="external-container__inner">
        <InnerContainer
          name="courses"
          pageArray={pageArray}
          teachers={teachers}
          students={students}
          statuses={statuses}
        />
      </Container>
    </Container>
  );
};

export { Courses };
