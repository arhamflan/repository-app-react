import { AppBar, Button, Grid, IconButton, MenuItem, MenuList, Paper, Toolbar, Typography, Divider, ListItemIcon, Container, Link } from "@mui/material";
import { Box } from "@mui/system";

import { useEffect, useState } from "react";

import { GridView, Logout, Style, LocalLibrary, AutoStoriesSharp } from "@mui/icons-material";

import styles from "../../../styled/GlassEffectWhite.module.css"
import NavigationBar from "../../component/NavigationBar";
import Sidebar from "../../component/Sidebar";

import {decodeToken, isExpired} from "react-jwt";
import { logoutHooks } from "../../../use-case/auth/logoutHooks";
import { useNavigate } from "react-router-dom";
import checkTokenHooks from "../../../use-case/auth/checkTokenHooks";
import Layout from "../../layouts/Layout";




function DashboardPageAdmin(){

    const navigate = useNavigate()

    useEffect(() => {
    })

    return (
        <>
            <Typography>Testing</Typography>
        </>
    )
}

export default DashboardPageAdmin;