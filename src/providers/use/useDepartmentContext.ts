import {DepartmentContext} from "../department/DepartmentContextProviders";
import {useContext} from "react";

export const useDepartmentContext = () => {
    const context = useContext(DepartmentContext)

    if(!context){
        throw Error('Department Context must be use inside DepartmentContextProvider')
    }

    return context
}