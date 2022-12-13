import {createContext, useReducer} from "react";
import {IDepartment} from "../../entity/interface/IDepartment";


export const DepartmentContext = createContext<IDepartment |any>(null);

export const departmentReducer = (state: IDepartment, action: any) => {

    switch(action.types){
        case "GET_DEPARTMENT":
            return {
                ...state,
                department: action.payload
            }
    }

}

export const DepartmentContextProvider = ({children}: any) => {
    const [state, dispatch] = useReducer<any>(departmentReducer, {
        department: [],
        departmentDetail: {}
    })


    return (
        <DepartmentContext.Provider value={{state}}>
            {children}
        </DepartmentContext.Provider>
    )
}