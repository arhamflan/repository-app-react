import {Paper, MenuList, MenuItem, ListItemIcon, Typography, Divider, Box, ListItem, Collapse} from "@mui/material";

import {
    GridView,
    Style,
    LocalLibrary,
    AutoStoriesSharp,
    Logout,
    SettingsAccessibility,
    ManageAccounts,
    Cookie,
    SchoolOutlined, Article, ExpandLess, ExpandMore
} from "@mui/icons-material";
import {useNavigate, Link, useLocation} from "react-router-dom";
import checkTokenHooks from "../../use-case/auth/checkTokenHooks";
import {useEffect, useState} from "react";

import menuItemAdmin from "./menu/MenuItemAdmin";
import menuItemUser from "./menu/MenuItemUser";


function Sidebar(){

    const {role, token} = checkTokenHooks()

    const navigate = useNavigate()

    const [openCollapseIndex, setOpenCollapseIndex] = useState(null)

    const handleLogout = () => {
        localStorage.removeItem("token")
        
        navigate('/')
    }

    useEffect(() => {
        // const {expiredToken} = checkTokenHooks()
        //
        // if(expiredToken === true){
        //     logoutHooks()
        //     navigate("/login")
        // } else {
        //     console.log("token is available to use")
        // }
    })

    return (
        <>
            <Paper elevation={0} variant="outlined" sx={{ border: 2, bgcolor:"#fff", height: "78vh", borderRadius: 4, borderStyle: "dashed", borderColor: "rgba(184, 184, 184, 0.21)"}}>
                <MenuList sx={{height: "100%", paddingTop: 2}}>
                    {role.includes("admin") ?
                        menuItemAdmin.map((item, index) => {
                            return (
                                <Link to={item.link} style={{textDecoration: "none"}} key={index}>
                                    <MenuItem selected={location.pathname === item.link} onClick={() => {
                                        setOpenCollapseIndex(index)
                                        console.log(index)
                                    }}>
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <Typography variant="body2" color={"black"} >{item.name}</Typography>

                                    </MenuItem>
                                    {item.items ?
                                        <Collapse key={index} in={openCollapseIndex === index} unmountOnExit>
                                            <MenuList>
                                                {item.items ?
                                                    item.items.map((menuItems, index) => {
                                                        return (
                                                            <MenuItem>
                                                                <Typography>{menuItems.name}</Typography>
                                                            </MenuItem>
                                                        )
                                                    }) : <></>
                                                }
                                            </MenuList>
                                        </Collapse> : <></>
                                    }

                                </Link>
                            )
                        })
                        :
                        <>
                            {menuItemUser.map((item, index) => {
                                return (
                                    <Link to={item.link} style={{textDecoration: "none"}} key={index}>
                                        <MenuItem selected={location.pathname === item.link} onClick={() => {
                                            setOpenCollapseIndex(index)
                                            console.log(index)
                                        }}>
                                            <ListItemIcon>{item.icon}</ListItemIcon>
                                            <Typography variant="body2" color={"black"} >{item.name}</Typography>
                                            {item.items.length > 0 ?
                                                <>
                                                    {index === openCollapseIndex ?
                                                        <ExpandLess sx={{
                                                            marginLeft: "auto"
                                                        }}/> : <ExpandMore sx={{
                                                            marginLeft: "auto"
                                                        }}/>
                                                    }
                                                </>
                                                : <></>}
                                        </MenuItem>
                                        {item.items.length > 0 ?
                                            <Collapse key={index} in={openCollapseIndex === index} unmountOnExit>
                                                <MenuList>
                                                    {item.items ?
                                                        item.items.map((menuItems, index) => {
                                                            return (
                                                                <Link to={menuItems.link} style={{textDecoration: "none"}} key={index}>
                                                                    <MenuItem selected={location.pathname === menuItems.link}>
                                                                        <ListItemIcon></ListItemIcon>
                                                                        <Typography variant={"body2"} color={"black"}>{menuItems.name}</Typography>
                                                                    </MenuItem>
                                                                </Link>
                                                            )
                                                        }) : <></>
                                                    }
                                                </MenuList>
                                            </Collapse> : <></>
                                        }

                                    </Link>
                                )
                            })}
                        </>
                    }
                    <Box sx={{position: "absolute", right: 0, left: 0, bottom: 50}}>
                        <MenuItem onClick={handleLogout}>
                            <ListItemIcon><Logout/></ListItemIcon>
                            <Typography variant="body2">Logout</Typography>
                        </MenuItem>
                    </Box>
                </MenuList>
            </Paper> 
        </>
    )
}

export default Sidebar;