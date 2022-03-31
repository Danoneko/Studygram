import { Routes, Route} from "react-router-dom";

import { Courses } from "./Pages/Courses";
import { Meetings } from "./Pages/Meetings";
import { Tasks } from "./Pages/Tasks";
import { Users } from "./Pages/Users";
import { Loader } from "./Pages/Loader";
import { Profile } from "./Pages/Profile";

import { Layout } from "./Components/Layout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="courses" element={<Courses name="Курсы" but="курс" />} />
          <Route path="tasks" element={<Tasks name="Задачи" but="задачу" />} />
          <Route path="meetings" element={<Meetings name="Встречи" but="встречу" />} />
          <Route path="profile" element={<Profile name="Профиль" />} />
          <Route path="users" element={<Users name="Пользователи" />} />
          <Route index path="*" element={<Loader name="Welcome to Studygram!" />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
