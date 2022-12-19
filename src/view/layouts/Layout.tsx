import NavigationBar from "../component/NavigationBar";
import {Box, Grid, Typography} from "@mui/material";
import Sidebar from "../component/Sidebar";


export default function Layout(props: any){
    return (
        <>


            <Box sx={{
                backgroundColor: "#FFFDF4",
                height: "100vh"
            }}>
                <NavigationBar/>

                {/* computer view */}
                <Grid container spacing={2} paddingX={2} marginTop={0.1} >
                    <Grid xs={12} sm={4} item md={4} lg={2.5}  sx={{
                        display: {
                            xs: 'none',
                            sm: 'block'
                        },
                        zIndex: 10
                    }}>
                        <Sidebar/>
                    </Grid>
                    <Grid item xs={12} md={8} lg={9} sx={{
                        zIndex: 10
                    }}>
                        {props.children}
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}