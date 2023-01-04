import { isExpired, decodeToken } from "react-jwt"

export default function checkTokenHooks(){
    const token = localStorage.getItem("token")
    const expiredToken = isExpired(token)
    const decodeTokenAuth = decodeToken(token)

    if(decodeTokenAuth){
        // @ts-ignore
        const role = decodeTokenAuth.roles
        console.log(role)
        return {expiredToken, role, token}
    } else {
        return {expiredToken, token}
    }
}