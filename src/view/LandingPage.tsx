import { AppBar, Button, Grid, IconButton, MenuItem, MenuList, Paper, Toolbar, Typography, Divider } from "@mui/material";
import { Box } from "@mui/system";

import MenuIcon from '@mui/icons-material/Menu'

function LandingPage(){
    return (
        <>
            <Box sx={{flexGrow: 1, paddingX: 2, paddingY: 1}}>
                <AppBar position="static" sx={{borderRadius: 2}} color="primary">
                    <Toolbar>
                        <Typography>Repository App</Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <Grid container spacing={2} paddingX={2}>
                <Grid item md={3} lg={2} xl={2} position="relative">
                    <Paper elevation={0} variant="outlined" sx={{ border: 0, bgcolor:"#eceff1", height: "80vh"}}>
                        <MenuList sx={{height: "100%"}}>
                            <MenuItem>
                                <Typography variant="subtitle1">Dashboard</Typography>
                            </MenuItem>
                            <MenuItem>
                                <Typography>Data Skripsi</Typography>
                            </MenuItem>
                            <MenuItem>
                                <Typography>Data Mahasiswa</Typography>
                            </MenuItem>
                            <Box marginY={2}>
                            <MenuItem>
                                <Typography>Data Pengajuan Buku</Typography>
                            </MenuItem>
                            <MenuItem sx={{bottom: 0}}>
                                <Typography>Logout</Typography>
                            </MenuItem>
                            </Box>
                        </MenuList>
                    </Paper>
                </Grid>
                <Grid item md={9} lg={10} xl={10}>
                    <Typography variant="h1">Hello World</Typography>
                    <Typography variant="h1">Hello World</Typography>
                    <Typography variant="h1">Hello World</Typography>
                    <Typography variant="h1">Hello World</Typography>
                    <Typography variant="h1">Hello World</Typography>
                    <Typography variant="h1">Hello World</Typography>
                    <Typography variant="h1">Hello World</Typography>
                    <Typography variant="h1">Hello World</Typography>
                    <Typography variant="h1">Hello World</Typography>
                    <Typography variant="h1">Hello World</Typography>
                    <Typography variant="h1">Hello World</Typography>
                    <Typography variant="h1">Hello World</Typography>
                    <Typography variant="h1">Hello World</Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default LandingPage;