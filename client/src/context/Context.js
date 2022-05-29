import {createContext, useEffect, useReducer } from 'react'
import Reducer from './Reducer'

const INITIAL_STATE = {//này k chỉ là của context mà là của useReducer nên có thể passs localStorage vào trước
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching:false,
    error:false
}

export const Context = createContext(INITIAL_STATE)

export const ContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(Reducer,INITIAL_STATE)

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user))
    },[state.user])

    return <Context.Provider value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch
    }}>{children}</Context.Provider>
}