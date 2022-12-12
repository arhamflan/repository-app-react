import getProfileHooks from "../../../../use-case/auth/getProfileHooks";
import {Link, useNavigate} from "react-router-dom";
import {useProfileContext} from "../../../../providers/use/useProfileContext";
import {useEffect, useState} from "react";
import checkTokenHooks from "../../../../use-case/auth/checkTokenHooks";
import {logoutHooks} from "../../../../use-case/auth/logoutHooks";
import {Avatar, Button, FormControl, FormHelperText, Grid, Input, InputLabel, Skeleton, Typography} from "@mui/material";
import NavigationBar from "../../../component/NavigationBar";
import Sidebar from "../../../component/Sidebar";
import {Box} from "@mui/system";

import {TextField} from "@mui/material";
import { LoadingButton } from '@mui/lab';
import editProfileHooks from "../../../../use-case/auth/admin/editProfileHooks";
import {toast, Toaster} from "react-hot-toast";

function EditProfile(){
    const {loading, getUser, setLoading} = getProfileHooks()
    const navigate = useNavigate()
    const {state} = useProfileContext()

    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false)

    const [formData, setFormData] = useState({
        address: "",
        phone: ""
    })

    async function handleSubmit() {
        setLoadingSubmit(true)
        const useEditProfileHooks = await editProfileHooks(formData)
        toast.success("Berhasil", {
            position: "top-right"
        })
        setLoadingSubmit(false)
        setTimeout(() => {
            if(useEditProfileHooks === true){
                navigate("/profile")
            }
        }, 3000)
    }

    useEffect(() => {

        setLoading(true)

        const {expiredToken} = checkTokenHooks()

        if(expiredToken === true){
            logoutHooks()
            navigate("/login")
            setLoading(false)
        } else {
            getUser()
        }

    }, [])



    return (
        <>
            <NavigationBar/>

            <Grid container spacing={2} paddingX={2} marginTop={0.1}>
                <Grid item xs={12} sm={4} lg={2.5} position="relative" sx={{
                    display: {
                        xs: 'none',
                        sm: 'block'
                    }
                }}>
                    <Sidebar/>
                </Grid>
                <Grid item xs={12} md={8} lg={9}>
                    <Typography variant={"h6"} fontWeight={500}>Edit Profil</Typography>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        width: "auto",
                        height: "100%",
                        justifyContent: "center",
                    }}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Box marginBottom={5}>
                                    {loading &&
                                        <Skeleton
                                            variant="circular"
                                            width={80}
                                            height={80}
                                            sx={{marginX: "auto"}}
                                        />
                                    }
                                    {state && !loading ?
                                        <Avatar sx={{
                                            height: 80,
                                            width: 80,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginX: "auto"
                                        }} src={state.profile.picture}/>
                                        :
                                        <></>
                                    }
                                </Box>

                                <Box marginBottom={3} sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center"
                                }}>
                                    <Typography marginRight={1}>Nama : </Typography>
                                    <Typography align="center">
                                        {loading &&
                                            <Skeleton
                                                variant="rectangular"
                                                width={150}
                                                height={30}
                                                sx={{marginX: "auto"}}
                                            />
                                        }
                                        {state && !loading ?
                                            state.profile.fullname || "Tidak ada"
                                            :
                                            <></>
                                        }
                                    </Typography>
                                </Box>

                                <Box marginBottom={3} sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center"
                                }}>
                                    <Typography marginRight={1}>Email : </Typography>
                                    <Typography align="center">
                                        {loading &&
                                            <Skeleton
                                                variant="rectangular"
                                                width={150}
                                                height={30}
                                                sx={{marginX: "auto"}}
                                            />
                                        }
                                        {state && !loading ?
                                            state.profile.email || "Tidak ada"
                                            :
                                            <></>
                                        }
                                    </Typography>
                                </Box>

                                <Box marginBottom={3} sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center"
                                }}>
                                    <Typography sx={{marginRight: 1, marginY: "auto"}}>Alamat : </Typography>

                                    <Typography align="center">
                                        {loading &&
                                            <Skeleton
                                                variant="rectangular"
                                                width={150}
                                                height={30}
                                                sx={{marginX: "auto"}}
                                            />
                                        }
                                        {(state && !loading) ?
                                            <TextField required label={"Alamat"} defaultValue={state.profile.address} onChange={(e) => {
                                                    setFormData({...formData, address: e.target.value})
                                                }
                                            }/>
                                            :
                                            <></>
                                        }
                                    </Typography>
                                </Box>

                                <Box marginBottom={3} sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center"
                                }}>
                                    <Typography sx={{marginRight: 1, marginY: "auto"}}>Telepon : </Typography>

                                    <Typography align="center">
                                        {loading &&
                                            <Skeleton
                                                variant="rectangular"
                                                width={150}
                                                height={30}
                                                sx={{marginX: "auto"}}
                                            />
                                        }
                                        {(state && !loading) ?
                                            <TextField label={"Telepon"} defaultValue={state.profile.phone} onChange={(e) => {
                                                setFormData({...formData, phone: e.target.value})
                                                }
                                            } inputProps={{
                                                inputMode: 'numeric',
                                                pattern: '[0-9]*'
                                            }}/>
                                            :
                                            <></>
                                        }
                                    </Typography>
                                </Box>


                                <Box marginBottom={3} sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center"
                                }}>

                                    {!loadingSubmit ? <Button variant={"contained"} sx={{
                                        textTransform: "capitalize"
                                    }} onClick={handleSubmit} >Submit</Button> : <></>}

                                    {loadingSubmit ? <LoadingButton loading loadingIndicator={"...loading"} variant="contained" sx={{textTransform: "capitalize"}}>Loading</LoadingButton> : <></>}
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>

            <Toaster/>
        </>
    )
}

export default EditProfile;