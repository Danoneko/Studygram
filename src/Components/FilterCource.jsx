import React, { useState, useEffect } from "react";
import { Accordion, Form, FormControl } from "react-bootstrap";

import dataCource from "../Data/dataCource.json";

const FiltersCource = ({ setValue, titlefilter, ...props }) => {
  const [isCollapsed, setIsCollapsed] = useState(true); // show more
  const [searchTerm, setSearchTerm] = useState(""); //  live search
  const [selectedCource, setSelectedCource] = useState([]);

  useEffect(() => {
    setValue(selectedCource);
  }, [setValue, selectedCource]);
  // setValue(selectedCource);

  // console.log('Filter', selectedCource);

  const handleChange = (e, data) => {
    const { name, checked } = e.target;
    if (checked) {
      if (name === "allSelect_cource") {
        setSelectedCource(dataCource);
      } else {
        setSelectedCource([...selectedCource, data]);
      }
    } else {
      if (name === "allSelect_cource") {
        setSelectedCource([]);
      } else {
        let tempcource = selectedCource.filter((item) => item.id !== data.id);
        setSelectedCource(tempcource);
      }
    }
  };

  return (
    <>
      <div className="filters">
        <Accordion>
          {" "}
          {/*  defaultActiveKey={['0']} alwaysOpen  всегда открытый  */}
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <span className="color-grey-700 text-xs">
                {titlefilter} ({selectedCource.length})
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
                    name="allSelect_cource"
                    id="allSelect_cource"
                    // allSelect_cource selected when both length equal
                    // selectedcource === allUser
                    checked={selectedCource?.length === dataCource?.length}
                    onChange={(e) => handleChange(e, dataCource)}
                  />
                  <label htmlFor="allSelect_cource" className="form-check-label">
                    Все
                  </label>
                </div>
                <ul className="form-check filters__form">
                  {dataCource &&
                    dataCource
                      .filter((val) => {
                        //  live search
                        if (searchTerm === "") {
                          return val;
                        } else {
                          if (
                            val.name
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                          ) {
                            return val;
                          } else return false;
                        }
                      })
                      .slice(0, isCollapsed ? 4 : dataCource.length) // show more
                      .map(
                        (
                          course,
                          index //  выгрузка и отметка checkbox
                        ) => (
                          <li key={index}>
                            <input
                              type="checkbox"
                              className="form-check-input"
                              name={course.id}
                              id={"cource_" + course.id}
                              checked={selectedCource.some(
                                (item) => item?.id === course.id
                              )}
                              onChange={(e) => handleChange(e, course)}
                            />
                            <label
                              htmlFor={"cource_" + course.id}
                              className="form-check-label"
                            >
                              {course.name} {course.surname}
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

export { FiltersCource };
