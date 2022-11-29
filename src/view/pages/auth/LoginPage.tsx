import { Box, TextField, Typography, Button, FormGroup, Divider, Card } from "@mui/material";

import {Link} from "@mui/material";

import { GoogleLogin } from "@react-oauth/google";
import { loginHooks } from "../../../use-case/auth/loginHooks";

import { useNavigate } from "react-router-dom";

import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';


import umLogo from "../../../assets/logo-um.png"
import illustrationLogin from "../../../assets/illustration-login.png"
import { useEffect } from "react";

function LoginPage(){

    const navigate: any = useNavigate()

    const handleGoogleLogin = async(data: any) => {
        const useLoginHooks = await loginHooks(data)
        if(useLoginHooks == true){
            navigate('/')
        }
    }

    useEffect(() => {
        if(localStorage.getItem("token") !== null){
            console.log(localStorage.getItem("token"))
            navigate("/")
        }
    }, [])

    return (
        <>
            <Box sx={{
                position: 'relative',
                height:"100vh",
                overflow: "hidden",
                background : "#FFFDF4",
                zIndex: 10
            }}>

                

                <Box sx={{
                    justifyContent: "center",
                    display: {
                        xs: "grid",
                    },
                    alignItems: "center",
                    height: "100vh",
                    position: "relative",
                    zIndex: 50
                    }}>
                    
                    <Box>
                        <Box sx={{marginBottom: 5, width: "full", alignContent:"center", justifyContent:"center", alignItems:"center", display: "flex"}}>
                            <img src={umLogo}/>
                        </Box>

                        <Card sx={{ 
                            minWidth: {
                                md: 200,
                                xl: 400
                            },
                            minHeight: 300,
                            borderRadius: 7 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 25, textAlign: "center", fontWeight: 900,  }} gutterBottom>
                                Masuk Perpus
                            </Typography>
                            <Typography color={"#656565"} textAlign={"center"}>
                            Hai kamu, Ayo bergabung banyak keseruan
                            <br/>
                            menantimu
                            </Typography>
                            <Box sx={{width: "full", alignContent: "center", display: "flex", justifyContent: "center"}}>
                                <img src={illustrationLogin} width="200"/>
                            </Box>
                        </CardContent>
                        <CardActions>
                            <Box sx={{alignContent:"center", marginX: "auto", marginBottom: 2}}>
                            <GoogleLogin
                                onSuccess={handleGoogleLogin}
                                width="300px"
                            />
                            </Box>
                        </CardActions>
                    </Card>
                    </Box>

                    

                </Box>

                <Box
                    sx={{
                        width: 870,
                        height: 950,
                        backgroundColor: '#F8C815',
                        position: 'absolute',
                        bottom: -150,
                        left: -200,
                        top: 200,
                        borderRadius: 50,
                        animation: "spin 2s linear infinite",
                        transform: "rotate(50deg)",
                        display: {
                            xs: "none",
                            md: "block"
                        },
                        zIndex: "30"
                    }}
                />


            </Box>  
            
            {/* <GoogleLogin
                        onSuccess={handleGoogleLogin}
                        width="1000px"
                    /> */}
        </>
    )
}

export default LoginPage;