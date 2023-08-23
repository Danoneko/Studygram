import React from "react";
import { useLocation } from "react-router-dom";

import { FormControl } from "react-bootstrap";

import dataTask from "../Data/dataTask.json";
import dataMeeting from "../Data/dataMeeting.json";
import dataUser from "../Data/dataUser.json";
import dataGroup from "../Data/dataGroup.json";
import { useState } from "react";

const Chat = () => {
  const params = useLocation().pathname.split("/");

  var params0, params1, params2;

  if (params[1] === "courses") {
    params0 = params[2]; //  первый параметр в ссылке
    params1 = params[3]; //  второй параметр в ссылке
    params2 = params[4]; //  третий параметр в ссылке
  } else {
    params0 = params[1]; //  первый параметр в ссылке
    params1 = params[2]; //  второй параметр в ссылке
    params2 = params[3]; //  третий параметр в ссылке
  }

  // console.log(useLocation());

  var chat,
    alluser = [],
    users = [],
    groups_users = [],
    bigData;
  if (params0 === "tasks") {
    bigData = dataTask;
  } else {
    bigData = dataMeeting;
  }
  if (params2.split("_")[0] === "group") {
    chat = dataGroup.find((a) => a.id === params2.split("_")[1]);
  }
  if (params2.split("_")[0] === "user") {
    chat = dataUser.find((a) => a.id === params2.split("_")[1]);
  }

  // console.log(params2.split("_")[0]);
  // console.log(params2.split("_")[1]);

  const task = bigData.find((a) => a.id === params1);
  task.groups.map((a) =>
    dataGroup.find((b) =>
      b.id === a.id
        ? b.users.map((c) =>
            dataUser.find((d) => (d.id === c.id ? alluser.push(d) : ""))
          )
        : ""
    )
  );
  task.students.map((a) =>
    dataUser.find((b) => (a.id === b.id ? users.push(b) : ""))
  );

  Array.prototype.push.apply(alluser, users);

  alluser = alluser.filter(
    (thing, index, self) => index === self.findIndex((t) => t.id === thing.id)
  );

  chat?.users?.map((a) =>
    dataUser.find((b) => (b.id === a.id ? groups_users.push(b) : ""))
  );

  // console.log(groups_users);
  // console.log(users);
  // console.log(alluser);

  function avatar(it) {
    var rez = {
      backgroundImage: "url(" + it + ")",
    };
    return rez;
  }

  const mess = [];
  const [send, setSend] = useState(mess);

  function sendMessage() {
    const e = document.getElementById("messages-input");
    const tex = e?.textContent || e?.innerText;
    const now =
      new Date().toLocaleDateString() +
      ", " +
      new Date().toLocaleTimeString().slice(0, -3);

    const rez = {"now": now, "tex": tex};
    mess.unshift(rez);

    setSend(mess);
    // console.log("mess", mess);
  }

  return (
    <>
      <div className="chat">
        <div className="chat__header">
          <div className="chat__name">
            {params2 === "all" ? (
              "Все пользователи"
            ) : params2.split("_")[0] === "user" ? (
              <>
                <div style={avatar(chat.avatar)} className="chat__avatar"></div>
                {chat.first_name + " " + chat.surname}
              </>
            ) : (
              chat.name
            )}
          </div>

          {params2 === "all" ? (
            <div className="chat__users chat__users--flex">
              <div className="chat__users--flex">
                {alluser.slice(0, 3).map((a, key) => (
                  <div
                    style={avatar(a.avatar)}
                    className="chat__avatar chat__avatars"
                    key={key}
                  ></div>
                ))}
              </div>
              <div className="chat__counts">{alluser.length}</div>
              <div className="chat__tooltip">
                {alluser.map((a, key) => (
                  <div
                    className="chat__point chat__point-users"
                    id={"user_" + a.id}
                    key={key}
                  >
                    <div
                      style={avatar(a.avatar)}
                      className="chat__avatar"
                    ></div>{" "}
                    {a.first_name} {a.surname}
                  </div>
                ))}
              </div>
            </div>
          ) : params2.split("_")[0] === "group" ? (
            <div className="chat__users chat__users--flex">
              <div className="chat__users--flex">
                {groups_users.slice(0, 3).map((a, key) => (
                  <div
                    style={avatar(a.avatar)}
                    className="chat__avatar chat__avatars"
                    key={key}
                  ></div>
                ))}
              </div>
              <div className="chat__counts">{groups_users.length}</div>
              <div className="chat__tooltip">
                {groups_users.map((a, key) => (
                  <div
                    className="chat__point chat__point-users"
                    id={"user_" + a.id}
                    key={key}
                  >
                    <div
                      style={avatar(a.avatar)}
                      className="chat__avatar"
                    ></div>{" "}
                    {a.first_name} {a.surname}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="chat__body">
          <div className="messages">
            {send.map((a, key) => (
              <div key={key} className="message message-my">
                <div className="message-my__time">{a.now}</div>
                <div className="message-my__inside">{a.tex}</div>
              </div>
            ))}
          </div>
          <div className="messages-input">
            <div className="messages-input__field">
              <div
                data-placeholder="Введите сообщение"
                className="messages-input__input"
                contentEditable
                id="messages-input"
              ></div>
              <div className="messages-input--flex">
                <div className="messages-input__at"></div>
                <FormControl type="file" id="button--load" />
                <label
                  className="messages-input__attach"
                  htmlFor="button--load"
                ></label>
              </div>
            </div>
            <div
              className="messages-input__send"
              onClick={() => sendMessage()}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export { Chat };
