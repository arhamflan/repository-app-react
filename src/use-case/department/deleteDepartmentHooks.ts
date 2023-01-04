import axios from "axios";
import {endpointParent} from "../../config/api-url";


export default async function deleteDepartmentHooks(id: string){

    const token = localStorage.getItem("token")

    const deleteData = await axios.delete(`${endpointParent}/api/field/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        return true
    }).catch((error) => {
        console.log(error)
        return error
    })

    return deleteData
}