import {useState} from "react";
import axios from "axios";


export default function editProfileHooks(data: object): any{

    const token = localStorage.getItem("token")

    const editProfile = axios.put("http://167.172.64.153:3000/api/change-profile", data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((result) => {
        console.log(result)
        return true
    }).catch((error) => {
        return false
    })


    return editProfile
}