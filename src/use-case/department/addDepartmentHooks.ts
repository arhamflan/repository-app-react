import axios from "axios";

export default function addDepartmentHooks(data: object){

    const token = localStorage.getItem("token")

    const sendData = axios.post('http://167.172.64.153:3000/api/field', {
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