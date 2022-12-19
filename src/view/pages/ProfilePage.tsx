import NavigationBar from "../component/NavigationBar";

import { Avatar, Button, Grid, Skeleton, Typography } from "@mui/material";
import Sidebar from "../component/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/system";
import { LocalDining } from "@mui/icons-material";
import checkTokenHooks from "../../use-case/auth/checkTokenHooks";
import {Link, useNavigate} from "react-router-dom";
import { logoutHooks } from "../../use-case/auth/logoutHooks";
import getProfileHooks from "../../use-case/auth/getProfileHooks";
import {useProfileContext} from "../../providers/use/useProfileContext";
import Layout from "../layouts/Layout";



function ProfilePage(){

    const {loading, getUser, setLoading} = getProfileHooks()

    const navigate = useNavigate()

    const {state} = useProfileContext()


    useEffect(() => {
        
        setLoading(true)

        const {expiredToken} = checkTokenHooks()
        


        if(expiredToken === true){
            logoutHooks()
            navigate('/login')
            setLoading(false)
        } else {
            getUser()
        }
    }, [])

    return (
        <>
            <Layout>
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
                                <Typography sx={{marginRight: 1}}>Alamat : </Typography>

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
                                        state.profile.address || "None"
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
                                <Typography marginRight={1}>Telepon : </Typography>
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
                                        state.profile.phone || "None"
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
                                <Link to={"/edit-profile-admin"} style={{textDecoration: "none"}}>
                                    <Button variant={"contained"} sx={{
                                        textTransform: "capitalize"
                                    }}>Edit Profile</Button>
                                </Link>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Layout>

        </>
    )
}

export default ProfilePage;