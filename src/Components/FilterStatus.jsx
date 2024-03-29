import React, { useState, useEffect } from "react";
import { Accordion, Form } from "react-bootstrap";

const statusArray = [
  { id: "active", title: "Активные" },
  { id: "deleted", title: "Удаленные" },
];

const FiltersStatus = ({ setValue, ...props }) => {
  const [selectedStatus, setSelectedStatus] = useState([]);

  // console.log("status", selectedStatus);
  // console.log(props.text);



  useEffect(() => {
    setValue(selectedStatus);
  }, [setValue, selectedStatus]);
  // setValue(selectedStatus);

  const handleChange = (e, data) => {
    const { name, checked } = e.target;
    if (checked) {
      if (name === "allSelect_status") {
        setSelectedStatus(statusArray);
      } else {
        setSelectedStatus([...selectedStatus, data]);
      }
    } else {
      if (name === "allSelect_status") {
        setSelectedStatus([]);
      } else {
        let tempstatus = selectedStatus.filter((item) => item.id !== data.id);
        setSelectedStatus(tempstatus);
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
                {props.titlefilter} ({selectedStatus.length})
              </span>
            </Accordion.Header>
            <Accordion.Body>
              <Form>
                <div className="form-check form__select">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="allSelect_status"
                    // allSelect_status selected when both length equal
                    // selectedstatus === allUser
                    id={"allSelect_status"+ props.text.id}
                    checked={selectedStatus?.length === statusArray?.length}
                    onChange={(e) => handleChange(e, statusArray)}
                  />
                  <label htmlFor={"allSelect_status"+ props.text.id} className="form-check-label">
                    Все {props.text}
                  </label>
                </div>
                <ul className="form-check filters__form">
                  {statusArray.map(
                    (
                      status,
                      index //  выгрузка и отметка checkbox
                    ) => (
                      <li key={index}>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name={status.id + props.text.id}
                          id={status.id + props.text.id}
                          checked={selectedStatus.some(
                            (item) => item?.id === status.id
                          )}
                          onChange={(e) => handleChange(e, status)}
                        />
                        <label htmlFor={status.id+props.text.id} className="form-check-label">
                          {status.title} {props.text}
                        </label>
                      </li>
                    )
                  )}
                </ul>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  );
};

export { FiltersStatus };
