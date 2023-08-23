// import dataCourse from "../Data/dataCource.json";
import React from "react";
import dataUser from "../Data/dataUser.json";

const UsersInBlock = ({ it, name, studBlock, ...props }) => {
  let users = []; // все найденные пользователи будут тут
  let rez;
  // console.log(name);

  if (name === "courses") {
    rez = studBlock;
  } else {
    if (name === "tasks" || name === "meetings") {
      users = it.students;
      rez = users.map(
        (
          i // по полученным id находим самих пользователей в юзерах
        ) => dataUser.find((a) => a.id === i.id)
      );
    }
    studBlock.push({ id: it.id, rez });
  }

  // console.log(it.name, it.id, res);

  function tooltipShowS(e, i) {
    var elem = document.getElementById(e);

    if (elem.style.display === "none") {
      elem.style.display = "flex";
      document.getElementById(i).classList.add("count-users--active");
    } else {
      elem.style.display = "none";
      document.getElementById(i).classList.remove("count-users--active");
    }
  }

  return (
    <>
      {rez.length >= 1 ? (
        <>
          <div className="inner-container__block-user">
            {rez[0].first_name} {rez[0].surname}
          </div>

          {rez.length > 1 ? (
            <>
              <button
                type="button"
                className="count-users"
                id={"studentsBut_" + it.id}
                onClick={() =>
                  tooltipShowS("students_" + it.id, "studentsBut_" + it.id)
                }
              >
                {" "}
                + {rez.length - 1}
              </button>
            </>
          ) : (
            ""
          )}

          <div className="tooltip-users" id={"students_" + it.id}>
            {rez.slice(1).map((a, key) => (
              <div key={key} className="inner-container__block-user">
                {a.first_name} {a.surname}
              </div>
            ))}
          </div>
        </>
      ) : ""
        }
    </>
  );
};

export { UsersInBlock };
