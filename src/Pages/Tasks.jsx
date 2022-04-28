import React, { useState } from "react";
import { Container, Accordion } from "react-bootstrap";

import { FiltersUser } from "../Components/FiltersUser";
import { FiltersCource } from "../Components/FilterCource";
import { FiltersStatus } from "../Components/FilterStatus";
import { InnerContainer } from "../Components/InnerContainer";
import useWindowDimensions from "../Components/WindowSize";

import filterImg from "../Images/filters.svg";

const Tasks = ({ pageArray, ...props }) => {
  const taskArray = pageArray[1];

  const [teachers, setTeachers] = useState([]); //  состояние преподавателей
  const [students, setStudents] = useState([]); //  состояние студентов
  const [statuses, setStatuses] = useState([]); //  состояние статусa
  const [cource, setCource] = useState([]); // состояние курсов
  // console.log("Teachers", teachers);
  // console.log("Students", students);
  // console.log("Status", statuses);
  // console.log("Cource", cource);

  const fil = document.querySelectorAll(".filter");
  // console.log(fil.length);

  const { width } = useWindowDimensions();
  // console.log("Ширина", width, "Высота", height,);

  return (
    <Container className="external-container">
      <div className="external-container__filters">
        {width > 768 ? (
          <>
            <FiltersCource setValue={setCource} titlefilter="Курсы" />
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
              titlefilter={"Статус " + taskArray.status}
              text={taskArray.status}
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
                  <FiltersCource setValue={setCource} titlefilter="Курсы" />
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
                    titlefilter={"Статус " + taskArray.status}
                    text={taskArray.status}
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
          cource={cource}
        />
      </Container>
    </Container>
  );
};

export { Tasks };
