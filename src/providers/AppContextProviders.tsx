import { CombineComponents } from "../utils/CombineComponents";
import { ProfileContextProvider } from "./auth/ProfileContextProviders";

//providers
import CreateThemeProvider from "./CreateThemeProvider";
import GoogleAuthProvider from "./GoogleAuthProvider";
import {DepartmentContextProvider} from "./department/DepartmentContextProviders";

const providers: any = [
    CreateThemeProvider,
    GoogleAuthProvider,
    ProfileContextProvider,
    DepartmentContextProvider
]

const AppContextProvider = CombineComponents(...providers);

export default AppContextProvider