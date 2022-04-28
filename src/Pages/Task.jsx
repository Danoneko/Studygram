import React from 'react'
import { useLocation } from 'react-router-dom';

const Task = () => {
  return (
    <h3>YOU ARE HERE {useLocation().pathname}</h3>
  )
}
export { Task }