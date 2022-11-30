import { CombineComponents } from "../utils/CombineComponents";
import { ProfileContextProvider } from "./auth/ProfileContextProviders";

//providers
import CreateThemeProvider from "./CreateThemeProvider";
import GoogleAuthProvider from "./GoogleAuthProvider";

const providers: any = [
    CreateThemeProvider,
    GoogleAuthProvider,
    ProfileContextProvider
]

const AppContextProvider = CombineComponents(...providers);

export default AppContextProvider