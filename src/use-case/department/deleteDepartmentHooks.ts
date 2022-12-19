import axios from "axios";


export default async function deleteDepartmentHooks(id: string){

    const token = localStorage.getItem("token")

    const deleteData = await axios.delete(`http://167.172.64.153:3000/api/field/${id}`, {
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