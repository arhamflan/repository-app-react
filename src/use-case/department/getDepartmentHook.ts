import axios from "axios";
import {useDepartmentContext} from "../../providers/use/useDepartmentContext";
import {endpointParent} from "../../config/api-url";


function getDepartmentHook(){

    const {setDepartment} = useDepartmentContext()

    const getData = async() => {
        await axios.get(`${endpointParent}/api/fields`)
            .then((response) => {
                setDepartment(response.data.data)
            }).catch((error) => {
            console.log(error)
        })
    }

    return {getData}
}

export default getDepartmentHook;