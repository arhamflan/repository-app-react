import { CombineComponents } from "../utils/CombineComponents";

//providers
import CreateThemeProvider from "./CreateThemeProvider";
import GoogleAuthProvider from "./GoogleAuthProvider";

const providers: any = [
    CreateThemeProvider,
    GoogleAuthProvider
]

const AppContextProvider = CombineComponents(...providers);

export default AppContextProvider