import NavigationBar from "../component/NavigationBar";

import { Avatar, Button, Grid, Skeleton, Typography } from "@mui/material";
import Sidebar from "../component/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/system";
import { LocalDining } from "@mui/icons-material";



function ProfilePage(){

    const [page, setPage] = useState("Profile")
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<any>()

    const token = localStorage.getItem("token")

    const handleChangePage = () => {
        setPage("Testing")
    }

    useEffect(() => {

        setLoading(true)

        axios.get('http://167.172.64.153:3000/api/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setUser(response.data.data)
            console.log(response.data.data)
            setTimeout(() => {
                setLoading(false)
            }, 3000)
        }).catch((error) => {
            console.log(error)
        })
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
                {/* {loading && <Typography>Loading data....</Typography>} */}
                {/* {user && 
                    
                } */}
                <Grid item xs={12} md={8} lg={9}>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            width: "auto",
                            height: "100%",
                        }}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Box>
                                        {loading && 
                                            <Skeleton
                                                variant="circular"
                                                width={80}
                                                height={80}
                                            />
                                        }
                                        {user && !loading ? 
                                            <Avatar sx={{
                                                height: 80,
                                                width: 80,
                                                justifyContent: "center",
                                                alignItems: "center"
                                            }} src={user.picture}/>
                                            : 
                                            <></>
                                        }
                                    </Box>

                                    <Box>
                                        <Typography align="center">
                                            {loading && 
                                                <Skeleton
                                                    variant="rectangular"
                                                    width={150}
                                                    height={30}
                                                    sx={{marginX: "auto"}}
                                                />
                                            }
                                            {user && !loading ?  
                                                user.fullname 
                                                : 
                                                <></>
                                            }
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    {/* <Box>
                                        <Avatar sx={{
                                            height: 80,
                                            width: 80,
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }} src={user.picture}/>
                                    </Box> */}

                                    <Box>
                                        <Typography align="center">Name</Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
            </Grid>

        </>
    )
}

export default ProfilePage;