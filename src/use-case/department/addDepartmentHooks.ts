import axios from "axios";
import {endpointParent} from "../../config/api-url";

export default function addDepartmentHooks(data: object){

    const token = localStorage.getItem("token")

    const sendData = axios.post(`${endpointParent}/api/field`, {
        // @ts-ignore
        field: data.field
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        console.log(response)
        return true
    }).catch((error) => {
        console.log(error)
        return error
    })

    return sendData
}