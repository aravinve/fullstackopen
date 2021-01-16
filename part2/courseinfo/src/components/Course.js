import React from 'react';

const Header = ({course}) => {
    return (
      <h1>{course}</h1>
    )
  }
  
  const Part = ({part, exercises}) => {
    return(
      <p>
          {part} {exercises}
      </p>
    )
  }
  
  const Content = ({parts}) => {
    return (
      parts.map(part => (
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      ))
    )
  }
  
  const Total = ({parts}) => {
    const total = parts.map(part => part.exercises).reduce((acc,val) => acc + val)
    return (
      <p>
          Number of Exercises {total}
      </p>
    )
  }
  
  const Course = ({courses}) => {
    return(
      courses.map(course => (
        <div key={course.id}>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      ))
    )
  }

  export default Course;