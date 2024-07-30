import { createContext,useReducer,useContext} from "react";
import Reducer from "../reducers/Reducer";

export const TodosContext = createContext([]);
export const DispatchContext = createContext(null);

const TodosProvider = ({children}) => {
    const [todos,dispatch] = useReducer(Reducer,[])
    return(
        <TodosContext.Provider value={todos}>
            
            <DispatchContext.Provider value={dispatch}>
                 {children}
            </DispatchContext.Provider>
            
        </TodosContext.Provider>
    )
}
export const useTodos = ()=>{
    return useContext(TodosContext)
}
export const useTodosDispatch = ()=>{
    return useContext(DispatchContext)
}
export default TodosProvider;
// export const todosContext = createContext([])
