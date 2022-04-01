import { Accordion, Form, FormControl } from "react-bootstrap";

import teachers  from "../Data/Teachers";


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
    </>
  );
};

export { Filters };
