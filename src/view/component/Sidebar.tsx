import { Paper, MenuList, MenuItem, ListItemIcon, Typography, Divider, Box, Link, ListItem } from "@mui/material";

import { GridView, Style, LocalLibrary, AutoStoriesSharp, Logout, SettingsAccessibility, ManageAccounts } from "@mui/icons-material";


function Sidebar(){
    return (
        <>
            <Paper elevation={0} variant="outlined" sx={{ border: 0, bgcolor:"#eceff1", height: "80vh", borderRadius: 5, boxShadow: 5, position: "sticky", top: 98 , marginY: "auto"}}>
                <MenuList sx={{height: "100%", paddingTop: 2}}>
                    <MenuItem color="primary">
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
                    <MenuItem>
                        <ListItemIcon><SettingsAccessibility/></ListItemIcon>
                        <Typography variant="body2">Pengaturan Akses User</Typography>
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon><ManageAccounts/></ListItemIcon>
                        <Typography variant="body2">Pengaturan Akun</Typography>
                    </MenuItem>
                    <Box sx={{position: "absolute", right: 0, left: 0, bottom: 50}}>
                    <Link underline="none" color={"inherit"} href="/login">
                    <MenuItem>
                        <ListItemIcon><Logout/></ListItemIcon>
                        <Typography variant="body2">Logout</Typography>
                    </MenuItem>
                    </Link>
                    </Box>
                </MenuList>
            </Paper> 
        </>
    )
}

export default Sidebar;