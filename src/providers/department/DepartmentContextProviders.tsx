import {createContext, useReducer} from "react";
import {IDepartment} from "../../entity/interface/IDepartment";


export const DepartmentContext = createContext<IDepartment |any>(null);

export const departmentReducer = (state: IDepartment, action: any) => {

    switch(action.types){
        case "SET_DEPARTMENT":
            return {
                ...state.department,
                department: action.payload
            }


        case "SET_DEPARTMENT_DETAIL":
            return {
                ...state.departmentDetail,
                departmentDetail: action.payload
            }

        case "EDIT_DEPARTMENT_DETAIL":
            const data = state.departmentDetail
            data.field = action.payload
            return {
                ...state.departmentDetail,
                departmentDetail: data
            }
    }

}

export const DepartmentContextProvider = ({children}: any) => {
    const [state, dispatch] = useReducer<any>(departmentReducer, {
        department: [],
        departmentDetail: {}
    })

    function setDepartment(department: IDepartment){
        // @ts-ignore
        dispatch({
            types: "SET_DEPARTMENT",
            payload: department
        })
    }

    function setDepartmentDetail(department: IDepartment){
        // @ts-ignore
        dispatch({
            types: "SET_DEPARTMENT_DETAIL",
            payload: department
        })
    }

    function editDepartmentDetail(department: IDepartment){
        // @ts-ignore
        dispatch({
            types: "EDIT_DEPARTMENT_DETAIL",
            payload: department
        })
    }

    return (
        <DepartmentContext.Provider value={{state, setDepartment, setDepartmentDetail, editDepartmentDetail}}>
            {children}
        </DepartmentContext.Provider>
    )
}