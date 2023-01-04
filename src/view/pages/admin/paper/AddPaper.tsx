import Layout from "../../../layouts/Layout";
import {Box, FormControl, FormGroup, FormLabel, Input, TextField, Typography} from "@mui/material";
import ButtonSubmit from "../../../component/ButtonSubmit";
import {useEffect, useState} from "react";
import checkTokenHooks from "../../../../use-case/auth/checkTokenHooks";
import {logoutHooks} from "../../../../use-case/auth/logoutHooks";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import FileUpload from "react-material-file-upload";
import {endpointParent} from "../../../../config/api-url";


export default function AddPaper(){

    const [paperData, setPaperData] = useState({
        paperTitle: '',
        studentId: '',
        paperAuthor: ''
    })

    const [filePaper, setFilePaper] = useState([])

    const navigate = useNavigate()

    const token = localStorage.getItem("token")

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append('paperTitle', paperData.paperTitle)
        formData.append('studentId', paperData.studentId)
        formData.append('paperAuthor', paperData.paperAuthor)
        formData.append('paper', filePaper[0], filePaper[0].name)

        axios.post(`${endpointParent}/api/admin-upload-paper`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            navigate("/dashboard-admin/paper")
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        const {expiredToken} = checkTokenHooks()

        if(expiredToken === true){
            logoutHooks();
            navigate("/login")
        }
    })


    // @ts-ignore
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
                <Typography variant={"h6"}>Input Data Paper</Typography>
            </Box>
            <Box sx={{
                width: "50%"
            }}>
                <form onSubmit={handleSubmit}>
                    <FormGroup sx={{
                        marginBottom: 2
                    }}>
                        <FormControl>
                            <TextField label={"Judul"} variant={"outlined"} size={"small"}
                                       onChange={(e) => {
                                           setPaperData({...paperData, paperTitle: e.target.value})
                                       }}
                            />
                        </FormControl>
                    </FormGroup>
                    <FormGroup
                        sx={{
                            marginBottom: 2
                        }}
                    >
                        <FormControl>
                            <TextField label={"ID Mahasiswa"} variant={"outlined"} size={"small"}
                                       onChange={(e) => {
                                           setPaperData({...paperData, studentId: e.target.value})
                                       }}
                            />
                        </FormControl>
                    </FormGroup>
                    <FormGroup
                        sx={{
                            marginBottom: 2
                        }}>
                        <FormControl>
                            <TextField label={"Nama Author"} variant={"outlined"} size={"small"}
                                       onChange={(e) => {
                                           setPaperData({...paperData, paperAuthor: e.target.value})
                                       }}
                            />
                        </FormControl>
                    </FormGroup>
                    <FormGroup sx={{
                        marginBottom: 2
                    }}>
                        <FormControl>
                            <FormLabel>File Paper</FormLabel>
                            {/*<Input*/}
                            {/*    type={"file"}*/}
                            {/*    onChange={(e) => {*/}
                            {/*        // @ts-ignore*/}
                            {/*        setThesisData({...thesisData, thesis: e.target.files[0]})*/}
                            {/*    }}*/}
                            {/*/>*/}

                            <FileUpload value={filePaper}
                                // @ts-ignore
                                        onChange={setFilePaper}/>
                        </FormControl>
                    </FormGroup>
                    <FormControl fullWidth>
                        <ButtonSubmit name={"Submit"}/>
                    </FormControl>
                </form>
            </Box>
        </>
    )
}