import { ProfileContext } from "../auth/ProfileContextProviders";
import { useContext } from "react";

export const useProfileContext = () => {
    const context = useContext(ProfileContext)

    if(!context){
        throw Error('Profile Context must be use inside ProfileContextProvider')
    }

    return context
}