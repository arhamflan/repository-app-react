import Layout from "../../../layouts/Layout";
import {
    Box, Button, Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormGroup,
    FormLabel,
    Input,
    TextField,
    Typography
} from "@mui/material";
import ButtonSubmit from "../../../component/ButtonSubmit";
import {useEffect, useState} from "react";
import checkTokenHooks from "../../../../use-case/auth/checkTokenHooks";
import {logoutHooks} from "../../../../use-case/auth/logoutHooks";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import FileUpload from "react-material-file-upload";
import {endpointParent} from "../../../../config/api-url";
import {LoadingButton} from "@mui/lab";
import {toast, Toaster} from "react-hot-toast";


export default function AddThesis(){

    const [thesisData, setThesisData] = useState({
        thesisTitle: '',
        studentId: '',
        thesisAuthor: ''
    })

    const [loading, setLoading] = useState(false)

    const [dialogContent, setDialogContent] = useState({
        title: '',
        description: ''
    })
    const [isOpenDialog, setIsOpenDialog] = useState(false)

    const [fileThesis, setFileThesis] = useState([])

    const navigate = useNavigate()

    const token = localStorage.getItem("token")

    const handleSubmit = (e) => {
        e.preventDefault()

        setLoading(true)

        if(fileThesis.length === 0){
            console.log("Harus ada file yang di upload")
            setDialogContent({
                title: "Perhatian",
                description: "Harus mengupload file"
            })
            setIsOpenDialog(true)
            setLoading(false)
        } else {
            const formData = new FormData();
            formData.append('thesisTitle', thesisData.thesisTitle)
            formData.append('studentId', thesisData.studentId)
            formData.append('thesisAuthor', thesisData.thesisAuthor)
            formData.append('thesis', fileThesis[0], fileThesis[0].name)

            axios.post(`${endpointParent}/api/admin-upload-thesis`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                setLoading(false)
                toast.success('Berhasil Upload Skripsi',{
                    duration: 1000,
                    position: 'bottom-center'
                })
                setTimeout(() => {
                    navigate("/dashboard-admin/thesis")
                }, 2000)
            }).catch((error) => {
                setLoading(false)
                setDialogContent({
                    title: "Perhatian",
                    description: error.response.data.message
                })
                setIsOpenDialog(true)
            })
        }
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
                <Typography variant={"h6"}>Input Data Skripsi</Typography>
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
                                           setThesisData({...thesisData, thesisTitle: e.target.value})
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
                                           setThesisData({...thesisData, studentId: e.target.value})
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
                                           setThesisData({...thesisData, thesisAuthor: e.target.value})
                                       }}
                            />
                        </FormControl>
                    </FormGroup>
                    <FormGroup sx={{
                        marginBottom: 2
                    }}>
                        <FormControl>
                            <FormLabel>File Skripsi</FormLabel>
                            {/*<Input*/}
                            {/*    type={"file"}*/}
                            {/*    onChange={(e) => {*/}
                            {/*        // @ts-ignore*/}
                            {/*        setThesisData({...thesisData, thesis: e.target.files[0]})*/}
                            {/*    }}*/}
                            {/*/>*/}

                            <FileUpload value={fileThesis}
                                // @ts-ignore
                                        onChange={setFileThesis} required={true}/>
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
                </form>

                <Dialog open={isOpenDialog}
                        onClose={() => setIsOpenDialog(false)}
                        fullWidth={true}
                        maxWidth={"sm"}
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

                <Toaster/>
            </Box>
        </>
    )
}