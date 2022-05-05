// import dataCourse from "../Data/dataCource.json";
import React from "react";
import dataUser from "../Data/dataUser.json";
import dataTask from "../Data/dataTask.json";
import dataMeeting from "../Data/dataMeeting.json";

const UsersInBlock = ({ it, bigData, name, studBlock, ...props }) => {
  let users = []; // все найденные пользователи будут тут
  let tasks, meets, rez, res;
  // console.log(name);


  if (name === "courses") {
    tasks = dataTask.filter((item) => item.id_cource === it.id); // находим все задачи id которых совпадает с id_cource
    // console.log(tasks);

    tasks.filter((i) => users.push(...i.students)); // забираем из этих задач только студентов
    // console.log(users);
    

    meets = dataMeeting.filter((item) => item.id_cource === it.id); // находим все встречи id которых совпадает с id_cource
    // console.log(meets);
    meets.filter((i) => users.push(...i.students)); // забираем из этих встреч только студентов
    // console.log(users);

    // }

    res = users.filter(
      // удаляем дубликаты
      (thing, index, self) => index === self.findIndex((t) => t.id === thing.id)
    );

    rez = res.map(
      (
        i // по полученным id находим самих пользователей в юзерах
      ) => dataUser.find((a) => a.id === i.id)
    );


  } else {
    if (name === "tasks" || name === "meetings") {
      users = it.students;
      rez = users.map(
        (
          i // по полученным id находим самих пользователей в юзерах
        ) => dataUser.find((a) => a.id === i.id)
      );
    }
  }
  studBlock.push({id: it.id, rez});

  // console.log(it.name, it.id, res);

  return (
    <>
      {rez.map((t, key) => (
        <div key={key} className="inner-container__block-user">
          {t.name} {t.surname}
        </div>
      ))}
    </>
  );
};

export { UsersInBlock };
