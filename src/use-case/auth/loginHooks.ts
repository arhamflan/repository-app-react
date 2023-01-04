import axios from "axios";
import {endpointParent} from "../../config/api-url";

export function loginHooks(data: any): any{
    const login = axios.post(`${endpointParent}/api/authorize`, {
        credential: data.credential
        }).then(response => {
            console.log(response)
            localStorage.setItem("token", response.data.data)
            return true
        }).catch(e => {
            console.log(e)
            return false
        })
    
    return login;
}