import axios from "axios";
import {endpointParent} from "../../config/api-url";


export default function editDepartmentHooks(data: object){

    const token = localStorage.getItem("token")

    // @ts-ignore
    const sendData = axios.put(`${endpointParent}/api/field/${data.id}`, {
        // @ts-ignore
        field: data.field
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        return true
    }).catch((error) => {
        return error
    })

    return sendData
}