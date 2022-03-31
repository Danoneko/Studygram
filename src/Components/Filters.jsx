import { Accordion, Form, FormControl } from "react-bootstrap";

import students  from "../Data/Students";
import teachers  from "../Data/Teachers";

const studentsData = students.map((student) => {
  return(
    <li>
      <input className="form-check-input" type="checkbox" />
      {student.name} {student.surname}
    </li>
  );}
);

const teachersData = teachers.map((teacher) => {
  return(
    <li>
      <input className="form-check-input" type="checkbox" />
      {teacher.name} {teacher.surname}
    </li>
  );}
);

const Filters = () => {

  return (
    <>
      <div className="filter">
        <Accordion alwaysOpen>
          <Accordion.Item>
            <Accordion.Header>
              <span className="color-grey-700 text-xs">{"Преподаватели"}</span>
            </Accordion.Header>
            <Accordion.Body>
              <Form inline>
                <FormControl type="text" placeholder="Поиск" />
                <ul className="form-check filter__form">
                <li>
                  <input className="form-check-input" type="checkbox" checked/>
                  Все
                </li>
                {teachersData}
              </ul>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>

      <div className="filter">
        <Accordion alwaysOpen>
          <Accordion.Item>
            <Accordion.Header>
              <span className="color-grey-700 text-xs">{"Преподаватели"}</span>
            </Accordion.Header>
            <Accordion.Body>
              <Form inline>
                <FormControl type="text" placeholder="Поиск" />
                <ul className="form-check filter__form">
                <li>
                  <input className="form-check-input" type="checkbox" checked/>
                  Все
                </li>
                {studentsData}
              </ul>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  );
};

export { Filters };
