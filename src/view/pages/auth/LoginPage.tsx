import { Box, Grid, TextField, Typography, Button } from "@mui/material";

import {Link} from "@mui/material";

function LoginPage(){
    return (
        <>
            <Box sx={{
                justifyContent: "center",
                display: "grid",
                marginTop: "10rem"
                }}>
                <Typography fontWeight={500} textAlign={"center"} marginBottom={5}>Sign In Repository App</Typography>
                <TextField label="Email Address*" InputProps={{disableUnderline: true}} type={"email"}  variant="filled" size="small" sx={{
                    width: 300,
                    marginBottom: 3,
                    [`& fieldset`]: {}
                }}/>
                <TextField label="Password" InputProps={{disableUnderline: true}} variant="filled" size="small" type={"password"} sx={{
                    marginBottom: 3
                }}/>
                <Link href="/" underline="none">
                    <Button variant="contained" fullWidth>Submit</Button>
                </Link>
            </Box>
        </>
    )
}

export default LoginPage;