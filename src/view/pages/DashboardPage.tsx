import { AppBar, Button, Grid, IconButton, MenuItem, MenuList, Paper, Toolbar, Typography, Divider, ListItemIcon, Container, Link } from "@mui/material";
import { Box } from "@mui/system";

import { useEffect, useState } from "react";

import { GridView, Logout, Style, LocalLibrary, AutoStoriesSharp } from "@mui/icons-material";

import styles from "../../styled/GlassEffectWhite.module.css"
import NavigationBar from "../component/NavigationBar";
import Sidebar from "../component/Sidebar";

import { isExpired } from "react-jwt";
import { logoutHooks } from "../../use-case/auth/logoutHooks";
import { useNavigate } from "react-router-dom";
import checkTokenHooks from "../../use-case/auth/checkTokenHooks";




function DashboardPage(){

    const navigate = useNavigate()

    useEffect(() => {

        const {expiredToken} = checkTokenHooks()

        if(expiredToken === true){
            logoutHooks()
            navigate("/login")
        } else {
            console.log("Token is available to use")
        }
    })

    return (
        <>
            <NavigationBar/>
            
            {/* computer view */}
            <Grid container spacing={2} paddingX={2} marginTop={0.1}>
                <Grid xs={12} sm={4} item md={4} lg={2.5} position="relative" sx={{
                    display: {
                        xs: 'none',
                        sm: 'block'
                    }
                }}>
                    <Sidebar/>             
                </Grid>
                <Grid item xs={12} md={8} lg={9}>
                    <Typography>Dashboard Page</Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default DashboardPage;