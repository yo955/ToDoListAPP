import {v4 as uuidv4} from 'uuid';
export default function Reducer(currentTodos,action) {
    switch(action.type){
        case "added":{
            const newTodo =
    {
      id:uuidv4(),
      title:action.payload.newTitle, 
      details:"",
      isCompleted:false
    };
   
    const updatedtodos = [...currentTodos,newTodo]
  
    localStorage.setItem("todos",JSON.stringify(updatedtodos))
  
    return updatedtodos;

        }

        case "deleted":{
            const updatedtodos = currentTodos.filter((t)=>{
                return t.id !== action.payload.id;
              })

              localStorage.setItem("todos",JSON.stringify(updatedtodos));
              

              return updatedtodos;
        }
        case "updated":{
         
          const updatedTodos = currentTodos.map((t)=>{
            if(t.id ===action.payload.id){
             return {...t,title:action.payload.title,details:action.payload.details}
            }else{
             return t;
            }
           })
           localStorage.setItem("todos",JSON.stringify(updatedTodos));
           return updatedTodos
           
        }
        case "get":{
          const storagetodos = JSON.parse(localStorage.getItem("todos")) ??[];
          return storagetodos
        }
        case "check":{
          const updatedTodos = currentTodos.map((t)=>{
            if(t.id === action.payload.id){
              const updatedTodo = {
                ...t,isCompleted: !t.isCompleted
              }
              return updatedTodo
              
            }
            return t;
           
          })
          localStorage.setItem("todos",JSON.stringify(updatedTodos));
          return updatedTodos;
      
        }

        default:{
            throw Error("UnKnown Action " + action.type)
        }
    }
  // eslint-disable-next-line no-unreachable
  return [];
}
