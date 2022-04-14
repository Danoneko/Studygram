import { Link } from "react-router-dom";

const Courses = (props) => {
  // console.log("coures", props.pop);
  // const value = props.pop;
  return(
    <div>
      <h1 className="title-m">{props.name}</h1>
      <Link to="./other"> Страница отдельного курса </Link>
      {/* {value.map((user, index) => (
        <p key={index}>{user.name} {user.surname}</p>
      ))} */}
    </div>
  )
}

export {Courses}
  