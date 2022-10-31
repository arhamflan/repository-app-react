import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#00695c",
            contrastText: "white",
        },
        secondary: {
            main: "#b0bec5",
            contrastText: "black",
        
        },
    }
})

function CreateThemeProvider(props: any){
    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    )
}

export default CreateThemeProvider;