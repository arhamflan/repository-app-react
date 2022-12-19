import axios from "axios";
import {useDepartmentContext} from "../../providers/use/useDepartmentContext";


function getDepartmentHook(){

    const {setDepartment} = useDepartmentContext()

    const getData = async() => {
        await axios.get('http://167.172.64.153:3000/api/fields')
            .then((response) => {
                setDepartment(response.data.data)
            }).catch((error) => {
            console.log(error)
        })
    }

    return {getData}
}

export default getDepartmentHook;