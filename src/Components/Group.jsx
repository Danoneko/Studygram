import React from "react";

import dataGroup from "../Data/dataGroup.json";
import dataUser from "../Data/dataUser.json";

const Group = ({ id_group, it, ...props }) => {
  var group = dataGroup.find((a) => a.id === id_group);
  var rez = [];
  group.users.map((a) =>
    dataUser.find((b) => (b.id === a.id ? rez.push(b) : ""))
  );

  //   console.log(group);
  //   console.log(rez);

  function tooltipShowS(e, i) {
    var elem = document.getElementById(e);

    if (elem.style.display === "none") {
      elem.style.display = "flex";
      document.getElementById(i).classList.add("group__info--active");
    } else {
      elem.style.display = "none";
      document.getElementById(i).classList.remove("group__info--active");
    }
  }

  return (
    <>
      <div className="group">
        <div>{group.name}</div>
        <div
            id={"groupsBut_" + it.id + "_" + id_group}
            onClick={() =>
              tooltipShowS(
                "groups_" + it.id + "_" + id_group,
                "groupsBut_" + it.id + "_" + id_group
              )
            }
            className="count-users group__info"
          >
            i
        </div>
      </div>
      <div
        className="tooltip-users group--abs"
        id={"groups_" + it.id + "_" + id_group}
      >
        {rez.map((a, key) => (
          <div key={key} className="inner-container__block-user">
            {a.first_name} {a.surname}
          </div>
        ))}
      </div>
    </>
  );
};
export { Group };
