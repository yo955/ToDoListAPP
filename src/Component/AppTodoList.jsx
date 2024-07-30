import React from 'react'
import TodoList from './TodoList'
import './Todo.css'
import { createTheme,ThemeProvider } from '@mui/material/styles';
import {v4 as uuidv4} from 'uuid';
import { useState } from 'react';
import TodosProvider from './Context/TodosContext';

const theme = createTheme({
  typography:{
    fontFamily:[
      "Alexandria"
    ]
  },
  palette:{
    primary:{
      main:"#004d40"
    }
  }
}); 
const initialtodos = [
  {
    id:uuidv4(),
    title:"قراءة كتاب",
    details:"sdadsadsa",
    isCompleted:false
  },
  {
    id:uuidv4(),
    title:"قراءة كتاب",
    details:"sdadsadsa",
    isCompleted:false
  },
  {
    id:uuidv4(),
    title:"قراءة كتاب",
    details:"sdadsadsa",
    isCompleted:false
  },
]
 function AppTodoList() {
  // const [todos,setTodos] = useState(initialtodos)
  return (
    <>
    
    <ThemeProvider theme={theme}>
    <TodosProvider>
      
    <div className='App' 
    style=
    {{display:"flex",
    justifyContent:"center"
    ,alignItems:"center"
    ,height:"100vh"
    ,background:"#191b1f",
    direction:"rtl",
    textAlign:"center"
    }}>
      
      <TodoList/>
    </div>
    </TodosProvider>
    </ThemeProvider>
    </>
    
  )
}
export default AppTodoList;
