import { AppBar, Button, Grid, IconButton, MenuItem, MenuList, Paper, Toolbar, Typography, Divider, ListItemIcon, Container, Link } from "@mui/material";
import { Box } from "@mui/system";

import { useState } from "react";

import { GridView, Logout, Style, LocalLibrary, AutoStoriesSharp } from "@mui/icons-material";

import styles from "../../styled/GlassEffectWhite.module.css"
import NavigationBar from "../component/NavigationBar";

function LandingPage(){

    const [isActive, setIsActive] = useState(false)

    function ActiveMenu(){
        setIsActive(!isActive)
    }

    return (
        <>
            <NavigationBar/>
            
            {/* computer view */}
            <Grid container spacing={2} paddingX={2} marginTop={0.1}>
                <Grid xs={12} item md={4} lg={2.5} position="relative">
                    <Paper elevation={0} variant="outlined" sx={{ border: 0, bgcolor:"#eceff1", height: "80vh", borderRadius: 5, boxShadow: 5, position: "sticky", top: 98 , marginY: "auto"}}>
                        <MenuList sx={{height: "100%", paddingTop: 2}}>
                            <MenuItem color="primary" selected={isActive} onClick={ActiveMenu}>
                                <ListItemIcon><GridView/></ListItemIcon>
                                <Typography variant="body2">Dashboard</Typography>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon><Style/></ListItemIcon>
                                <Typography variant="body2">Data Skripsi</Typography>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon><LocalLibrary/></ListItemIcon>
                                <Typography variant="body2">Data Mahasiswa</Typography>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon><AutoStoriesSharp/></ListItemIcon>
                                <Typography variant="body2">Data Pengajuan Buku</Typography>
                            </MenuItem>
                            <Divider/>
                            <Box sx={{position: "absolute", right: 0, left: 0, bottom: 50}}>
                            <Link underline="none" color={"inherit"} href="/login">
                            <MenuItem>
                                <ListItemIcon><Logout/></ListItemIcon>
                                <Typography variant="body2">Logout</Typography>
                            </MenuItem>
                            </Link>
                            </Box>
                        </MenuList>
                    </Paper>              
                </Grid>
                <Grid item xs={12} md={8} lg={9}>
                    <Typography>Testing</Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default LandingPage;