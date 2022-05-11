import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Accordion } from "react-bootstrap";

import { FiltersUser } from "../Components/FiltersUser";
import { FiltersStatus } from "../Components/FilterStatus";
import { InnerContainer } from "../Components/InnerContainer";
import useWindowDimensions from "../Components/WindowSize";

import filterImg from "../Images/filters.svg";

const Course = ({ pageArray, ...props }) => {

  const [teachers, setTeachers] = useState([]); //  состояние преподавателей
  const [students, setStudents] = useState([]); //  состояние студентов
  const [statuses, setStatuses] = useState([]); //  состояние статусa
  const [course] = useState([]); // состояние курсов
  // console.log("Teachers", teachers);
  // console.log("Students", students);
  // console.log("Status", status);

  const params = useParams().id_course;

  const fil = document.querySelectorAll(".filter");
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
              titlefilter={"Статус " + pageArray[1].status}
              text={pageArray[1].status}
              setValue={setStatuses}
            />
            <FiltersStatus
              titlefilter={"Статус " + pageArray[2].status}
              text={pageArray[2].status}
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
                    titlefilter={"Статус " + pageArray[1].status}
                    text={pageArray[1].status}
                    setValue={setStatuses}
                  />
                  <FiltersStatus
                    titlefilter={"Статус " + pageArray[2].status}
                    text={pageArray[2].status}
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
          name="tasks"
          pageArray={pageArray}
          teachers={teachers}
          students={students}
          statuses={statuses}
          course={course}
          params={params}
        />
        <InnerContainer
          name="meetings"
          pageArray={pageArray}
          teachers={teachers}
          students={students}
          statuses={statuses}
          course={course}
          params={params}
        />
      </Container>
    </Container>
  );
};

export { Course };
