import {useEffect, useState} from "react";
import checkTokenHooks from "../../../../use-case/auth/checkTokenHooks";
import {logoutHooks} from "../../../../use-case/auth/logoutHooks";
import {useNavigate, useParams} from "react-router-dom";
import {Box, Button, FormControl, FormGroup, Grid, Input, InputLabel, TextField, Typography} from "@mui/material";
import ButtonSubmit from "../../../component/ButtonSubmit";
import NavigationBar from "../../../component/NavigationBar";
import Sidebar from "../../../component/Sidebar";
import axios from "axios";
import {endpointParent} from "../../../../config/api-url";
import {useDepartmentContext} from "../../../../providers/use/useDepartmentContext";
import editDepartmentHooks from "../../../../use-case/department/editDepartmentHooks";
import {toast, Toaster} from "react-hot-toast";
import {LoadingButton} from "@mui/lab";


function EditDepartment(){

    const {id} = useParams()
    const {state, setDepartmentDetail, editDepartmentDetail} = useDepartmentContext()

    const [major, setMajor] = useState({
        field: ""
    })

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const token = localStorage.getItem("token")
    async function handleSubmit(e){
        e.preventDefault()

        setLoading(true)

        const data = await editDepartmentHooks({
            id: id,
            field: state.departmentDetail.field
        })
        if(data === true){
            setLoading(false)
            toast.success('Berhasil Edit Jurusan',{
                duration: 1000,
                position: 'bottom-center'
            })
            setTimeout(() => {
                navigate("/dashboard-admin/major")
            }, 2000)
        } else {
            setLoading(false)
            console.log(data)
        }
    }

    useEffect(() => {
        const {expiredToken} = checkTokenHooks()

        if(expiredToken === true){
            logoutHooks();
            navigate("/login")
        }

        axios.get(`${endpointParent}/api/field/${id}`, {
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
                            {!loading ?
                                <ButtonSubmit name={"Submit"}/> :
                                <LoadingButton loading={true} variant={"contained"} sx={{
                                    textTransform: "capitalize",
                                    marginLeft: "auto",
                                    marginY: 3,
                                }}>Send</LoadingButton>
                            }
                        </FormControl>
                    </form> : ""
                }

            </Box>

            <Toaster/>
        </>
    )

}

export default EditDepartment;