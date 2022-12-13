import {useEffect, useState} from "react";
import checkTokenHooks from "../../../../use-case/auth/checkTokenHooks";
import {logoutHooks} from "../../../../use-case/auth/logoutHooks";
import {useNavigate} from "react-router-dom";
import {Box, Button, FormControl, FormGroup, Grid, Input, InputLabel, TextField, Typography} from "@mui/material";
import ButtonSubmit from "../../../component/ButtonSubmit";
import NavigationBar from "../../../component/NavigationBar";
import Sidebar from "../../../component/Sidebar";
import axios from "axios";


function AddDepartment(){

    const [major, setMajor] = useState({
        field: ""
    })

    const navigate = useNavigate()

    const token = localStorage.getItem("token")
    function handleSubmit(e): void{
        e.preventDefault()
        axios.post('http://167.172.64.153:3000/api/field', major, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response)
            navigate("/major")
        }).catch((error) => {
            console.log(error)
        })
        // alert(major.field)
    }

    useEffect(() => {
        const {expiredToken} = checkTokenHooks()

        if(expiredToken === true){
            logoutHooks();
            navigate("/login")
        }
    })


    return (
        <>
            <NavigationBar/>

            <Grid container spacing={2} paddingX={2} marginTop={0.1}>
                <Grid item xs={12} sm={4} lg={2.5} position={"relative"} sx={{
                    display: {
                        xs: "none",
                        sm: "block"
                    }
                }}>
                    <Sidebar/>
                </Grid>

                <Grid item xs={12} md={8} lg={9}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        width: "auto",
                        height: "auto",
                        justifyContent: "space-between",
                        marginTop: 5,
                        marginBottom: 5
                    }}>
                        <Typography variant={"h6"}>Input Data Jurusan</Typography>
                    </Box>
                    <Box sx={{
                        width: "50%"
                    }}>
                        <form onSubmit={handleSubmit}>
                            <FormGroup>
                                <FormControl>
                                    <TextField label={"Jurusan"} variant={"outlined"} required={true} size={"small"}
                                               onChange={(e) => {
                                                   setMajor({...major, field: e.target.value})
                                               }}
                                    />
                                </FormControl>
                            </FormGroup>
                            <FormControl fullWidth>
                                <ButtonSubmit name={"Submit"}/>
                            </FormControl>
                        </form>

                    </Box>
                </Grid>
            </Grid>



        </>
    )

}

export default AddDepartment;