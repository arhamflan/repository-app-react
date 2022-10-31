import { AppBar, Button, Grid, IconButton, MenuItem, MenuList, Paper, Toolbar, Typography, Divider, ListItemIcon } from "@mui/material";
import { Box } from "@mui/system";

import { AccountCircle, GridView, Logout, Menu } from "@mui/icons-material";

function LandingPage(){
    return (
        <>
            <Box sx={{flexGrow: 1, paddingX: 2, paddingY: 1}}>
                <AppBar position="sticky" sx={{borderRadius: 2}} color="primary">
                    <Toolbar>
                        <IconButton>
                            <Menu sx={{color: "white", marginRight: 5}}/>
                        </IconButton>
                        <Typography>Repository App</Typography>
                        <Box marginLeft={"auto"}>
                            <IconButton>
                            <AccountCircle sx={{color: "white"}}/>
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            <Grid container spacing={2} paddingX={2} marginTop={1}>
                <Grid item md={3} lg={2} xl={2} position="relative">
                    <Paper elevation={0} variant="outlined" sx={{ border: 0, bgcolor:"#eceff1", height: "80vh", borderRadius: 5, boxShadow: 5, position: "sticky", top:0 , marginY: "auto"}}>
                        <MenuList sx={{height: "100%", paddingTop: 2}}>
                            <MenuItem>
                                <ListItemIcon><GridView/></ListItemIcon>
                                <Typography variant="subtitle1">Dashboard</Typography>
                            </MenuItem>
                            <MenuItem>
                                <Typography>Data Skripsi</Typography>
                            </MenuItem>
                            <MenuItem>
                                <Typography>Data Mahasiswa</Typography>
                            </MenuItem>
                            <MenuItem>
                                <Typography>Data Pengajuan Buku</Typography>
                            </MenuItem>
                            <Box sx={{position: "absolute", right: 0, left: 0, bottom: 50}}>
                            <MenuItem sx={{bottom: 0}}>
                                <ListItemIcon><Logout/></ListItemIcon>
                                <Typography>Logout</Typography>
                            </MenuItem>
                            </Box>
                        </MenuList>
                    </Paper>
                </Grid>
                <Grid item md={9} lg={10} xl={10}>
                    <Typography variant="h6">Dashboard Main Page</Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default LandingPage;