import { Box, AppBar, Toolbar, IconButton, Typography } from "@mui/material";

import { Menu, AccountCircle } from "@mui/icons-material";


import styles from "../../styled/GlassEffectWhite.module.css"

function NavigationBar(){
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
        </>
    )
}

export default NavigationBar;