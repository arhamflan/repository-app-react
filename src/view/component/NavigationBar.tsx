import { Box, AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Avatar, Divider, ListItemIcon } from "@mui/material";

import { MenuBook, AccountCircle, PersonAdd, Settings, Logout } from "@mui/icons-material";


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
                                <MenuBook sx={{color: "white"}}/>
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
                            onClose={handleClose}
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
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                                },
                            },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem>
                            <Avatar /> Profile
                            </MenuItem>
                            <MenuItem>
                            <Avatar /> My account
                            </MenuItem>
                            <Divider />
                            <MenuItem>
                            <ListItemIcon>
                                <PersonAdd fontSize="small" />
                            </ListItemIcon>
                            Add another account
                            </MenuItem>
                            <MenuItem>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Settings
                            </MenuItem>
                            <MenuItem>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                            </MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}

export default NavigationBar;