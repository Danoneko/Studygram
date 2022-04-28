// import dataCourse from "../Data/dataCource.json";
import dataUser from "../Data/dataUser.json";
import dataTask from "../Data/dataTask.json";
import dataMeeting from "../Data/dataMeeting.json";

const UsersInBlock = ({ it, bigData, name, type, ...props }) => {
  let users = []; // все найденные пользователи будут тут
  let tasks, meets, both, rez, res;

  // console.log(name);

  if (name === "courses") {
    // if (type === "teachers") {
    //   tasks = dataTask.filter((item) => item.id_cource === it.id);     // находим все задачи id которых совпадает с id_cource
    //   //   console.log(tasks);
    //   tasks.filter((i) => users.push(...i.teachers));     // забираем из этих задач только учителей

    //   meets = dataMeeting.filter((item) => item.id_cource === it.id);    // находим все встречи id которых совпадает с id_cource
    //   // console.log(meets);
    //   meets.filter((i) => users.push(...i.teachers));    // забираем из этих встреч только учителей
    // } else {
      tasks = dataTask.filter((item) => item.id_cource === it.id); // находим все задачи id которых совпадает с id_cource
      // console.log(tasks);
      tasks.filter((i) => users.push(...i.students));    // забираем из этих задач только студентов

      meets = dataMeeting.filter((item) => item.id_cource === it.id);   // находим все встречи id которых совпадает с id_cource
      // console.log(meets);
      meets.filter((i) => users.push(...i.students));    // забираем из этих встреч только студентов
    // }
    rez = users.filter(
      // удаляем дубликаты
      (thing, index, self) => index === self.findIndex((t) => t.id === thing.id)
    );

    res = rez.map(
      (
        i // по полученным id находим самих пользователей в юзерах
      ) => dataUser.find((a) => a.id === i.id)
    );
  } else {
    if (name === "tasks" || name === "meetings") {
      both = bigData.filter((item) => item.id_cource === it.id);    // находим все встречи или задачи id которых совпадает с id_cource
      // console.log(both);
      // if (type === "teachers") {
      // both.filter((i) => users.push(...i.teachers));   // забираем из этих встреч или задача только учителей
      // } else {
        both.filter((i) => users.push(...i.students));   // забираем из этих встреч или задача только студентов
      // }
      res = users.map(
        (
          i // по полученным id находим самих пользователей в юзерах
        ) => dataUser.find((a) => a.id === i.id)
      );
    }
  }

  //   console.log(it.name, it.id, res);

  return (
    <>
      {res.map((t, key) => (
        <div key={key} className="inner-container__block-user">
          {t.name} {t.surname}
        </div>
      ))}
    </>
  );
};

export { UsersInBlock };
