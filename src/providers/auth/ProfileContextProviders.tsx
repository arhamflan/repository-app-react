import { createContext, Dispatch, useReducer } from "react";
import { IProfile } from "../../entity/interface/IProfile";
import { IActions } from "../../entity/interface/IActions";
import { TActionProfile } from "../../entity/type/TActionProfile";


export const ProfileContext = createContext<IProfile | any>(null);

export const profileReducer = (state: IProfile, action: TActionProfile) => {

    switch(action.types){
        case "GET_PROFILE":
            return {
                ...state,
                profile: action.payload
            }

        case "SET_PROFILE" :
            const data = state.profile
            console.log(action.payload)

            if(action.payload.type === "phone"){
                data.phone = action.payload.phone
                return {
                    ...state,
                    profile: data
                }
            } else if(action.payload.type === "address"){
                data.address = action.payload.address
                return {
                    ...state,
                    profile: data
                }
            }
    }

}


export const ProfileContextProvider = ({children} : any) => {
    const [state, dispatch] = useReducer<any>(profileReducer, {
        profile: {}
    })

    function getProfile(profile: IProfile){
        // @ts-ignore
        dispatch({
            types: "GET_PROFILE",
            payload: profile
        })
    }

    function setProfile(profile: IProfile, propertiesData: any){
        // @ts-ignore
        dispatch({
            types: "SET_PROFILE",
            payload: profile
        })
    }

    return (
        <ProfileContext.Provider value={{state, getProfile, setProfile}}>
            {children}
        </ProfileContext.Provider>
    )
}
