import { AppBar, Button, Grid, IconButton, MenuItem, MenuList, Paper, Toolbar, Typography, Divider, ListItemIcon, Container } from "@mui/material";
import { Box } from "@mui/system";

import { useState } from "react";

import { AccountCircle, GridView, Logout, Menu, Style, LocalLibrary, AutoStoriesSharp } from "@mui/icons-material";

import styles from "../../styled/GlassEffectWhite.module.css"

function LandingPage(){

    const [isActive, setIsActive] = useState(false)

    function ActiveMenu(){
        setIsActive(!isActive)
    }

    return (
        <>
            <Box sx={{
                flexGrow: 1, 
                paddingX: 2, 
                paddingY: 1, 
                position: "sticky",
                top: 0,
                right: 0,
                left: 0
                }}
                
                className={styles.glasseffect}

                >
                <AppBar position="sticky" sx={{borderRadius: 2}}>
                    <Toolbar>
                        <Box marginRight={2}>
                            <IconButton>
                                <Menu sx={{color: "white"}}/>
                            </IconButton>
                        </Box>
                        <Typography>Repository App</Typography>
                        <Box marginLeft={"auto"}>
                            <IconButton>
                            <AccountCircle sx={{color: "white"}}/>
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            
            {/* computer view */}
            <Grid container spacing={2} paddingX={2} marginTop={0.1}>
                <Grid xs={12} item md={3} lg={2.5} xl={2} position="relative" sx={{display : {
                    // xs: "none"

                }}}>
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
                            <MenuItem>
                                <ListItemIcon><Logout/></ListItemIcon>
                                <Typography variant="body2">Logout</Typography>
                            </MenuItem>
                            </Box>
                        </MenuList>
                    </Paper>
                    
                </Grid>
                <Grid item xs={12} sm={12} md={9} lg={10}>
                    <Typography align="left">aku</Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default LandingPage;