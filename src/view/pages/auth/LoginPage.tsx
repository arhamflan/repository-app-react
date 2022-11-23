import { Box, TextField, Typography, Button, FormGroup, Divider } from "@mui/material";

import {Link} from "@mui/material";

import { GoogleLogin } from "@react-oauth/google";
import { loginHooks } from "../../../use-case/auth/loginHooks";

import { useNavigate } from "react-router-dom";


function LoginPage(){

    const navigate: any = useNavigate()

    const handleGoogleLogin = async(data: any) => {
        const useLoginHooks = await loginHooks(data)
        console.log(useLoginHooks)
        if(useLoginHooks == true){
            navigate('/')
        }
    }

    return (
        <>
            <Box sx={{
                justifyContent: "center",
                display: {
                    xs: "grid",
                },
                alignItems: "center",
                height:"100vh",
                }}>

                <form>
                <Typography fontWeight={500} textAlign={"center"} marginBottom={5}>Sign In Repository App</Typography>
                <FormGroup>
                <TextField label="Email Address" InputProps={{disableUnderline: true}} type={"email"}  variant="filled" size="small" sx={{
                    marginBottom: 2,
                    width: {
                        xs: 300,
                        sm: 400
                    }
                }} required/>
                </FormGroup>
                <FormGroup>
                <TextField label="Password" InputProps={{disableUnderline: true}} variant="filled" size="small" type={"password"} sx={{
                    marginBottom: 2,
                    width: {
                        xs: 300,
                        sm: 400
                    }
                }}/>
                </FormGroup>
                <Link href="/" underline="none">
                    <Button variant="contained" fullWidth type="submit">Submit</Button>
                </Link>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginY: 1
                }}>
                    <Typography fontWeight={400}>Don't have account?</Typography>
                    <Typography fontWeight={400}>Login Using</Typography>
                </Box>
                <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    auto_select
                    width="1000px"
                />
                </form>
            </Box>
        </>
    )
}

export default LoginPage;