import { Box, Grid, TextField, Typography, Button } from "@mui/material";

function LoginPage(){
    return (
        <>
            <Box sx={{
                justifyContent: "center",
                display: "grid",
                marginTop: "15rem"
                }}>
                <Typography fontWeight={500} textAlign={"center"} marginBottom={5}>Sign In Repository App</Typography>
                <TextField label="Email Address*" InputProps={{disableUnderline: true}}  variant="filled" size="small" sx={{
                    width: 300,
                    marginBottom: 3,
                    [`& fieldset`]: {}
                }}/>
                <TextField label="Password" InputProps={{disableUnderline: true}} variant="filled" type={"password"} sx={{
                    marginBottom: 3
                }}/>
                <Button variant="contained">Submit</Button>
                <form>



                </form>
                
            </Box>
        </>
    )
}

export default LoginPage;