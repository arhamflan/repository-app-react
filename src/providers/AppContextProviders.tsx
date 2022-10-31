import { CombineComponents } from "../utils/CombineComponents";

//providers
import CreateThemeProvider from "./CreateThemeProvider";

const providers: any = [
    CreateThemeProvider
]

const AppContextProvider = CombineComponents(...providers);

export default AppContextProvider