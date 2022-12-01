import { useState } from "react";
import axios from "axios";

export default function getProfileHooks(){
    const [loading, setLoading] = useState<boolean>(false)

    const token = localStorage.getItem("token")
    const getUser = () => {
        axios.get('http://167.172.64.153:3000/api/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setTimeout(() => {
                setLoading(false)
            }, 2000)
        }).catch((error) => {
            console.log(error)
            setLoading(false)
        })
    }

    return {loading, setLoading, getUser}
}