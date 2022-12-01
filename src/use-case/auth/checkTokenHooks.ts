import { isExpired } from "react-jwt"


export default function checkTokenHooks(){
    const token = localStorage.getItem("token") || ""
    const expiredToken = isExpired(token)

    return {expiredToken}
}