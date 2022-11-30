import axios from "axios";

export function loginHooks(data: any): any{
    const login = axios.post('http://167.172.64.153:3000/api/authorize', {
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