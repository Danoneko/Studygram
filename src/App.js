import { Routes, Route } from "react-router-dom";
import { Courses } from "./Pages/Courses";
import { Meetings } from "./Pages/Meetings";
import { Tasks } from "./Pages/Tasks";
import { Users } from "./Pages/Users";
import { Profile } from "./Pages/Profile";
import { Layout } from "./Components/Layout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="courses" element={<Courses name="Курсы" />} />
          <Route path="tasks" element={<Tasks name="Задачи" />} />
          <Route path="meetings" element={<Meetings name="Встречи" />} />
          <Route path="users" element={<Users name="Пользователи" />} />
          <Route path="profile" element={<Profile name="Профиль" />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
