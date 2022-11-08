import { GoogleOAuthProvider } from "@react-oauth/google";

function GoogleAuthProvider(props: any){
    return (
        <>
            <GoogleOAuthProvider clientId="505131379635-23s9k8278cga20o49mlgha5jharndlos.apps.googleusercontent.com">
                {props.children}
            </GoogleOAuthProvider>
        </>
    )
}

export default GoogleAuthProvider;