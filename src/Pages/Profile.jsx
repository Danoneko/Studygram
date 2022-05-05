import React from 'react';
import { Container } from "react-bootstrap";

const Profile = (props) => {
    return(
      <Container className="external-container">
        <h1 className="title-m">{props.titlePage}</h1>
      </Container>
    )
  }
  
  export { Profile }