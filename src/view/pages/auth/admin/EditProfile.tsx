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
import Layout from "../../../layouts/Layout";

function EditProfile(){
    const {loading, getUser, setLoading} = getProfileHooks()
    const navigate = useNavigate()
    const {state, getProfile, setProfile} = useProfileContext()

    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false)

    const [formData, setFormData] = useState({
        address: "",
        phone: ""
    })

    async function handleSubmit() {
        setLoadingSubmit(true)
        console.log(state)
        const useEditProfileHooks = await editProfileHooks(state)
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
            <Layout>
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
                                    {(!loading) ?
                                        <TextField required label={"Alamat"} value={state.profile.address ? state.profile.address : ''} onChange={(e) => {
                                            setProfile({address : e.target.value, type: "address"})
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
                                    {(!loading) ?
                                        <TextField label={"Telepon"} value={state.profile.phone ? state.profile.phone : ''} onChange={(e) => {
                                            setProfile({phone : e.target.value, type: "phone"})
                                        }
                                        } />
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
            </Layout>

            <Toaster/>
        </>
    )
}

export default EditProfile;