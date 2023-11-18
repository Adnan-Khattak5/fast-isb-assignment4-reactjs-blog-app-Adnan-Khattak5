import React, { useState } from 'react';
import Addtask from './AddTask';
import Todo from './Todo';

function Main() {
  const [todoList, setTodoList] = useState([]);
  const addTasktoList = (task) => {
    setTodoList((prev) => [...prev, task]);
  };

  const deleteTask = (index) => {
    const updatedList = [...todoList];
    updatedList.splice(index, 1);
    setTodoList(updatedList);
  };

  return (
    <>
      <Addtask addTasktoList={addTasktoList} />
      <div>
        {todoList.map((task, index) => (
          <div key={index}>
            <Todo todo={task} deleteTask={() => deleteTask(index)} />
          </div>
        ))}
      </div>
    </>
  );
}

export default Main;