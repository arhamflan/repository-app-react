import { useContext, useState } from "react";
import axios from "axios";
import { ProfileContextProvider } from "../../providers/auth/ProfileContextProviders";
import { useProfileContext } from "../../providers/use/useProfileContext";

export default function getProfileHooks(){
    const [loading, setLoading] = useState<boolean>(false)

    const {getProfile} = useProfileContext()

    const token = localStorage.getItem("token")
    const getUser = async() => {
        await axios.get('http://167.172.64.153:3000/api/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            getProfile(response.data.data)
            setTimeout(() => {
                setLoading(false)
            }, 2000)
            return true
        }).catch((error) => {
            console.log(error)
            setLoading(false)
            return false
        })
    }

    return {loading, setLoading, getUser}
}