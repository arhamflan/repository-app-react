import { createContext, Reducer, useReducer } from "react";
import { IProfile } from "../../entity/interface/IProfile";
import { IActions } from "../../entity/interface/IActions";
import { ReducerProfileAction } from "../../entity/type/TActionProfile";


export const ProfileContext = createContext<IProfile | any>(null);

export const profileReducer = (state: IProfile, action: IActions) => {
    
    return state

}


export const ProfileContextProvider = ({children} : any) => {
    const [profile, dispatch] = useReducer<any>(profileReducer, null)

    function getProfile(profile: IProfile): void{
        dispatch({
            type: "GET_WAREHOUSE",
            payload: profile
        })

    }

    return (
        <ProfileContext.Provider value={{profile, getProfile}}>
            {children}
        </ProfileContext.Provider>
    )
}
