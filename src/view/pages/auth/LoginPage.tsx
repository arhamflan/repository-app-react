import { Box, TextField, Typography, Button, FormGroup, Divider, Card, duration, Backdrop, CircularProgress } from "@mui/material";

import {Link} from "@mui/material";

import { GoogleLogin } from "@react-oauth/google";
import { loginHooks } from "../../../use-case/auth/loginHooks";

import { useNavigate } from "react-router-dom";

import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';


import umLogo from "../../../assets/logo-um.png"
import illustrationLogin from "../../../assets/illustration-login.png"
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import backdropHooks from "../../../use-case/component/backdropHooks";
import checkTokenHooks from "../../../use-case/auth/checkTokenHooks";
import {decodeToken} from "react-jwt";

function LoginPage(){

    const navigate: any = useNavigate()

    const {openBackdrop, setOpenBackdrop} = backdropHooks()

    const {role} = checkTokenHooks()

    const handleGoogleLogin = async(data: any) => {

        setOpenBackdrop(true)
        
        const useLoginHooks = await loginHooks(data)
        if(useLoginHooks === true){
            setOpenBackdrop(false)
            toast.success('Berhasil login',{
                duration: 2000,
                position: 'bottom-center'
            })
            setTimeout(() => {
                const token = localStorage.getItem("token")
                const decodeTokenAuth = decodeToken(token)
                // @ts-ignore
                if(decodeTokenAuth.roles.includes("admin")){
                    navigate("/dashboard-admin/index")
                } else {
                    navigate("/dashboard-user/index")
                }
            }, 2000)
        } else {
            toast.error('Gagal login', {
                duration: 2000
            })
            setOpenBackdrop(false)
        }
    }

    useEffect(() => {
        if(localStorage.getItem("token") !== null){
            console.log(localStorage.getItem("token"))
            if(role.includes("admin") && !role.includes("civitas")){
                navigate("/dashboard-admin/index")
            } else {
                navigate("/dashboard-student/index")
            }
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
                        <Box sx={{marginBottom: 1, width: "full", alignContent:"center", justifyContent:"center", alignItems:"center", display: "flex"}}>
                            <img src={umLogo}/>
                        </Box>

                        <Card sx={{ 
                            minWidth: {
                                md: 100,
                                xl: 100
                            },
                            maxWidth: 400,
                            maxHeight: 360,
                            borderRadius: 7 ,
                            padding: 3
                        }}>
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
                        backgroundColor: '#1369BA',
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
            <Backdrop 
                open={openBackdrop}
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
            >

                <CircularProgress color="inherit"/>

            </Backdrop>
            
            <Toaster/>
        </>
    )
}

export default LoginPage;