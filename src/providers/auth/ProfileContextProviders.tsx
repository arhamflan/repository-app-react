import { createContext, Dispatch, useReducer } from "react";
import { IProfile } from "../../entity/interface/IProfile";
import { IActions } from "../../entity/interface/IActions";
import { TActionProfile } from "../../entity/type/TActionProfile";


export const ProfileContext = createContext<IProfile | any>(null);

export const profileReducer = (state: IProfile, action: TActionProfile) => {
    
    switch(action.types){
        case "GET_PROFILE":
            console.log(action.payload)
    }

}


export const ProfileContextProvider = ({children} : any) => {
    const [state, dispatch] = useReducer<any>(profileReducer, {profile: {}})

    function getProfile(profile: IProfile){
        // @ts-ignore
        dispatch({
            types: "GET_PROFILE",
            payload: profile
        })
    }

    return (
        <ProfileContext.Provider value={{state, getProfile}}>
            {children}
        </ProfileContext.Provider>
    )
}
