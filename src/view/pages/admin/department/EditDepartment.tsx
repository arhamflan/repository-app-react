import {useEffect, useState} from "react";
import checkTokenHooks from "../../../../use-case/auth/checkTokenHooks";
import {logoutHooks} from "../../../../use-case/auth/logoutHooks";
import {useNavigate, useParams} from "react-router-dom";
import {Box, Button, FormControl, FormGroup, Grid, Input, InputLabel, TextField, Typography} from "@mui/material";
import ButtonSubmit from "../../../component/ButtonSubmit";
import NavigationBar from "../../../component/NavigationBar";
import Sidebar from "../../../component/Sidebar";
import axios from "axios";
import {endpointField} from "../../../../config/api-url";
import {useDepartmentContext} from "../../../../providers/use/useDepartmentContext";
import editDepartmentHooks from "../../../../use-case/department/editDepartmentHooks";


function AddDepartment(){

    const {id} = useParams()
    const {state, setDepartmentDetail, editDepartmentDetail} = useDepartmentContext()

    const [major, setMajor] = useState({
        field: ""
    })

    const navigate = useNavigate()

    const token = localStorage.getItem("token")
    async function handleSubmit(e){
        e.preventDefault()
        const data = await editDepartmentHooks({
            id: id,
            field: state.departmentDetail.field
        })
        if(data === true){
            navigate("/major")
        } else {
            console.log(data)
        }
    }

    useEffect(() => {
        const {expiredToken} = checkTokenHooks()

        if(expiredToken === true){
            logoutHooks();
            navigate("/login")
        }

        axios.get(`${endpointField}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setDepartmentDetail(response.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])


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
                        <Typography variant={"h6"}>Edit Data Jurusan</Typography>
                    </Box>
                    <Box sx={{
                        width: "50%"
                    }}>
                        {state.departmentDetail ?
                            <form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <FormControl>
                                        <TextField label={"Jurusan"} variant={"outlined"} required={true} size={"small"}
                                                   value={state.departmentDetail.field ? state.departmentDetail.field : ""}
                                                   onChange={(e) => {
                                                       editDepartmentDetail(e.target.value)
                                                   }}
                                        />
                                    </FormControl>
                                </FormGroup>
                                <FormControl fullWidth>
                                    <ButtonSubmit name={"Submit"}/>
                                </FormControl>
                            </form> : ""
                        }

                    </Box>
                </Grid>
            </Grid>



        </>
    )

}

export default AddDepartment;