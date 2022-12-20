import { Box, AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Avatar, Divider, ListItemIcon} from "@mui/material";

import { AccountCircle, PersonAdd, Settings, Logout } from "@mui/icons-material";
import MenuIcon from '@mui/icons-material/Menu';

import { Link } from "react-router-dom";


import styles from "../../styled/GlassEffectWhite.module.css"
import { useState, MouseEvent } from "react";

function NavigationBar(){

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl)

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }


    return (
        <>
        <Box sx={{
                    flexGrow: 1,
                    paddingX: 2,
                    paddingY: 1,
                    top: 0,
                    right: 0,
                    left: 0
                }}

                className={styles.glasseffect}

                >
                <AppBar position={"sticky"} sx={{borderRadius: 2}}>
                    <Toolbar>
                        <Box marginRight={2}>
                            <IconButton>
                                <MenuIcon sx={{color: "white"}}/>
                            </IconButton>
                        </Box>
                        <Typography>Repository App</Typography>
                        <Box marginLeft={"auto"}>
                            <IconButton onClick={handleClick}>
                            <AccountCircle sx={{color: "white"}}/>
                            </IconButton>
                        </Box>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClick={handleClose}
                            PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                                },
                                '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.thesis',
                                transform: 'translateY(-50%) rotate(45deg)',
                                },
                            },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <Link to="/profile" style={{textDecoration: "none"}}>
                                <MenuItem>
                                    <ListItemIcon><AccountCircle/></ListItemIcon>
                                    <Typography variant="body2" color={"black"}>Profil Saya</Typography>
                                </MenuItem>
                            </Link>
                            <MenuItem sx={{
                                display: {
                                    sm: 'none'
                                }
                            }}>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            <Typography variant="body2">Settings</Typography>
                            </MenuItem>
                            <MenuItem sx={{
                                display: {
                                    sm: "none"
                                }
                            }}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            <Typography variant="body2">Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}

export default NavigationBar;