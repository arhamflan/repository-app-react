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
            const dataDetail = state.departmentDetail
            dataDetail.field = action.payload
            return {
                ...state.departmentDetail,
                departmentDetail: dataDetail
            }


        case "DELETE_DEPARTMENT_DATA":
            const dataFilter = state.department
            const afterFilter = dataFilter.filter((data, index) => data.id !== action.payload)
            return {
                ...state.department,
                department: afterFilter
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

    function deleteDepartment(id: any){
        // @ts-ignore
        dispatch({
            types: "DELETE_DEPARTMENT_DATA",
            payload: id
        })
    }

    return (
        <DepartmentContext.Provider value={{state, setDepartment, setDepartmentDetail, editDepartmentDetail, deleteDepartment}}>
            {children}
        </DepartmentContext.Provider>
    )
}