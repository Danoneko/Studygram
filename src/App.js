import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { Layout } from "./Components/Layout";
import { Chat } from "./Components/Chat";

import { Courses } from "./Pages/Courses";
import { Course } from "./Pages/Course";
import { Meetings } from "./Pages/Meetings";
import { Tasks } from "./Pages/Tasks";
import { Task } from "./Pages/Task";
import { Users } from "./Pages/Users";
import { Profile } from "./Pages/Profile";
import { AllUsers } from "./Pages/AllUsers";
import { Groups } from "./Pages/Groups";
import { Teachers } from "./Pages/Teachers";
import { Applications } from "./Pages/Applications";

import dataUser from "./Data/dataUser.json";

const userData = dataUser[6];
// console.log(userData);

const pageArray = [
  { id: "courses", title: "Курсы", create: "курс", status: "курса" },
  { id: "tasks", title: "Задачи", create: "задачу", status: "задачи" },
  { id: "meetings", title: "Встречи", create: "встречу", status: "встречи" },
  { id: "users", title: "Пользователи", create: "пользователя" },
];

function App() {
  const [avatar, setAvatar] = useState({
    backgroundImage: "url(" + userData.avatar + ")",
  });
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout pageArray={pageArray} userData={userData} avatar={avatar} />}>
          <Route path="courses" element={<Courses pageArray={pageArray} />} />
          <Route path="courses/:id_course" element={<Course pageArray={pageArray} />} />
          <Route path="courses/:id_course/:id_task/*" element={<Task />}>
            <Route path=":id_chat" element={<Chat />} />
          </Route>
          <Route path="tasks" element={<Tasks pageArray={pageArray} />} />
          <Route path="tasks/:id_task/*"  element={<Task />}>
            <Route path=":id_chat"  element={<Chat />} />
          </Route>
          <Route path="meetings" element={<Meetings pageArray={pageArray} />} />
          <Route path="meetings/:id_task/*" element={<Task />}>
            <Route path=":id_chat" element={<Chat />} />
          </Route>
          <Route path="users" element={<Users />}>
            <Route path="all_users" element={<AllUsers/>} />
            <Route path="groups" element={<Groups/>} />
            <Route path="teachers" element={<Teachers/>} />
            <Route path="applications" element={<Applications/>} />
          </Route>
          <Route path="profile" element={<Profile titlePage="Профиль" userData={userData} setAvatar={setAvatar}/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
