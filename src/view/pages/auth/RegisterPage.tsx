import { Box, Typography, FormGroup, TextField, Link, Button } from "@mui/material";


function RegisterPage(){
    return (
        <>
            <Box sx={{
                justifyContent: "center",
                display: "grid",
                marginTop: "10rem"
                }}>
                <form>
                <Typography fontWeight={500} textAlign={"center"} marginBottom={5}>Sign In Repository App</Typography>
                <FormGroup>
                <TextField label="Email Address*" InputProps={{disableUnderline: true}} type={"email"}  variant="filled" size="small" sx={{
                    width: 300,
                    marginBottom: 3,
                    [`& fieldset`]: {}
                }}/>
                </FormGroup>
                <FormGroup>
                <TextField label="Password" InputProps={{disableUnderline: true}} variant="filled" size="small" type={"password"} sx={{
                    marginBottom: 3
                }}/>
                </FormGroup>
                <Link href="/" underline="none">
                    <Button variant="contained" fullWidth type="submit">Submit</Button>
                </Link>
                <Box justifyContent={"between"}>
                
                </Box>
                </form>
            </Box>
        </>
    )
}

export default RegisterPage;