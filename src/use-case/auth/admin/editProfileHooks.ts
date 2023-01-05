import {useState} from "react";
import axios from "axios";
import {endpointParent} from "../../../config/api-url";


export default function editProfileHooks(data: object): any{

    const token = localStorage.getItem("token")



    const editProfile = axios.put(`${endpointParent}/api/change-profile`, {
        // @ts-ignore
        phone: data.profile.phone,
        // @ts-ignore
        address: data.profile.address
    }, {
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