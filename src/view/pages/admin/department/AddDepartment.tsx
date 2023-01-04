import {useEffect, useState} from "react";
import checkTokenHooks from "../../../../use-case/auth/checkTokenHooks";
import {logoutHooks} from "../../../../use-case/auth/logoutHooks";
import {useNavigate} from "react-router-dom";
import {
    Box,
    Button,
    Dialog, DialogActions, DialogContent, DialogTitle,
    FormControl,
    FormGroup,
    Grid,
    Input,
    InputLabel,
    TextField,
    Typography
} from "@mui/material";
import ButtonSubmit from "../../../component/ButtonSubmit";
import NavigationBar from "../../../component/NavigationBar";
import Sidebar from "../../../component/Sidebar";
import axios from "axios";
import Layout from "../../../layouts/Layout";
import addDepartmentHooks from "../../../../use-case/department/addDepartmentHooks";



function AddDepartment(){

    const [major, setMajor] = useState({
        field: ""
    })

    const [isOpenDialog, setIsOpenDialog] = useState(false)
    const [dialogContent, setDialogContent] = useState({
        title: '',
        description: ''
    })

    const navigate = useNavigate()

    const token = localStorage.getItem("token")
    async function handleSubmit(e){
        e.preventDefault()

        const data = await addDepartmentHooks(major)
        if(data === true){
            console.log(data)
            navigate("/dashboard-admin/major")
        } else {
            setDialogContent({
                title: "Kesalahan Input",
                description: data.response.data.message
            })
            setIsOpenDialog(true)
            console.log(data.response.data.message)
        }
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

            <Dialog open={isOpenDialog}
                onClose={() => setIsOpenDialog(false)}
            >
                <DialogTitle>{dialogContent.title}</DialogTitle>
                <DialogContent>
                    {dialogContent.description}
                </DialogContent>
                <DialogActions>
                    <Button sx={{
                        textTransform: "capitalize"
                    }} variant={"contained"} onClick={() => setIsOpenDialog(false)} autoFocus>
                        Tutup
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    )

}

export default AddDepartment;