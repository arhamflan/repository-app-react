import { Paper, MenuList, MenuItem, ListItemIcon, Typography, Divider, Box, ListItem } from "@mui/material";

import {
    GridView,
    Style,
    LocalLibrary,
    AutoStoriesSharp,
    Logout,
    SettingsAccessibility,
    ManageAccounts,
    Cookie,
    SchoolOutlined
} from "@mui/icons-material";
import {useNavigate, Link, useLocation} from "react-router-dom";
import checkTokenHooks from "../../use-case/auth/checkTokenHooks";
import {useEffect} from "react";
import {logoutHooks} from "../../use-case/auth/logoutHooks";


function Sidebar(){

    const {role} = checkTokenHooks()

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("token")
        
        navigate('/login')
    }

    useEffect(() => {
        const {expiredToken} = checkTokenHooks()

        if(expiredToken === true){
            logoutHooks()
            navigate("/login")
        } else {
            console.log("token is available to use")
        }
    })

    return (
        <>
            <Paper elevation={0} variant="outlined" sx={{ border: 2, bgcolor:"#fff", height: "78vh", borderRadius: 4, borderStyle: "dashed", borderColor: "rgba(184, 184, 184, 0.21)"}}>
                {role.includes("admin") ?
                    <MenuList sx={{height: "100%", paddingTop: 2}}>
                        <Link to={"/"} style={{textDecoration: "none"}}>
                            <MenuItem selected={location.pathname === "/"}>
                                <ListItemIcon><GridView/></ListItemIcon>
                                <Typography variant="body2" color={"black"} >Dashboard</Typography>
                            </MenuItem>
                        </Link>
                        <MenuItem>
                            <ListItemIcon><Style/></ListItemIcon>
                            <Typography variant="body2">Data Pengunjung</Typography>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon><LocalLibrary/></ListItemIcon>
                            <Typography variant="body2">Data Mahasiswa</Typography>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon><AutoStoriesSharp/></ListItemIcon>
                            <Typography variant="body2">Data Pengajuan Jurnal</Typography>
                        </MenuItem>
                        <Link to={"/major"} style={{textDecoration: "none"}}>
                            <MenuItem selected={location.pathname === "/major"}>
                                <ListItemIcon><SchoolOutlined/></ListItemIcon>
                                <Typography variant="body2" color={"black"}>Data Jurusan</Typography>
                            </MenuItem>
                        </Link>
                        <MenuItem>
                            <ListItemIcon><SettingsAccessibility/></ListItemIcon>
                            <Typography variant="body2">Pengaturan Akses User</Typography>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon><ManageAccounts/></ListItemIcon>
                            <Typography variant="body2">Pengaturan Akun</Typography>
                        </MenuItem>
                        <Box sx={{position: "absolute", right: 0, left: 0, bottom: 50}}>
                            <MenuItem onClick={handleLogout}>
                                <ListItemIcon><Logout/></ListItemIcon>
                                <Typography variant="body2">Logout</Typography>
                            </MenuItem>
                        </Box>
                    </MenuList> :
                    <MenuList sx={{height: "100%", paddingTop: 2}}>
                        <Box sx={{position: "absolute", right: 0, left: 0, bottom: 50}}>
                            <MenuItem onClick={handleLogout}>
                                <ListItemIcon><Logout/></ListItemIcon>
                                <Typography variant="body2">Logout</Typography>
                            </MenuItem>
                        </Box>
                    </MenuList>
                }
            </Paper> 
        </>
    )
}

export default Sidebar;