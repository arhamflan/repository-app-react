import { isExpired, decodeToken } from "react-jwt"

export default function checkTokenHooks(){
    const token = localStorage.getItem("token") || ""
    const expiredToken = isExpired(token)
    const decodeTokenAuth = decodeToken(token)

    // @ts-ignore
    const role = decodeTokenAuth.roles

    return {expiredToken, role}
}