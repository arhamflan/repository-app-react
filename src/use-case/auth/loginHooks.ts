import axios from "axios";

export function loginHooks(data: any): any{
    const login = axios.post('http://167.172.64.153:3000/api/authorize', {
        credential: data.credential
        }).then(response => {
            return true
        }).catch(e => {
            return false
        })
    
    return login;
}