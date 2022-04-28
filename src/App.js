import { Routes, Route } from "react-router-dom";

import { Layout } from "./Components/Layout";

import { Courses } from "./Pages/Courses";
import { Course } from "./Pages/Course";
import { Meetings } from "./Pages/Meetings";
import { Meeting } from "./Pages/Meeting";
import { Tasks } from "./Pages/Tasks";
import { Task } from "./Pages/Task";
// import { Users } from "./Pages/Users";
import { Profile } from "./Pages/Profile";

const pageArray = [
  { id: "courses", title: "Курсы", create: "курс", status: "курса" },
  { id: "tasks", title: "Задачи", create: "задачу", status: "задачи" },
  { id: "meetings", title: "Встречи", create: "встречу", status: "встречи" },
  // { id: "users", title: "Пользователи" },
];

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout pageArray={pageArray}/>}>
          <Route path="courses" element={<Courses  pageArray={pageArray}/>} />
          <Route path="courses/:id" element={<Course  pageArray={pageArray}/>} />
          <Route path="tasks" element={<Tasks  pageArray={pageArray}/>} />
          <Route path="tasks/:id" element={<Task  pageArray={pageArray}/>} />
          <Route path="meetings" element={<Meetings  pageArray={pageArray}/>} />
          <Route path="meetings/:id" element={<Meeting  pageArray={pageArray}/>} />
          {/* <Route path="users" element={<Users/>} /> */}
          <Route path="profile" element={<Profile titlePage="Профиль"/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
