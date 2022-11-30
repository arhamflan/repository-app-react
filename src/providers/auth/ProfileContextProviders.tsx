import { createContext, Reducer, useReducer } from "react";
import { IProfile } from "../../entity/interface/IProfile";
import { IActions } from "../../entity/interface/IActions";


export const ProfileContext = createContext<IProfile | any>(null);

export const profileReducer = (state: IProfile, action: IActions) => {
    
    return state

}


export const ProfileContextProvider = ({children} : any) => {
    const [profile, dispatch] = useReducer<any>(profileReducer, null)


    return (
        <ProfileContext.Provider value={profile}>
            {children}
        </ProfileContext.Provider>
    )
}
