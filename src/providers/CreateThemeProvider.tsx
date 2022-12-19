import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#1369BA",
            contrastText: "white",
            light: "#fff"
        },
        secondary: {
            main: "#F6FAFF",
            contrastText: "black"
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