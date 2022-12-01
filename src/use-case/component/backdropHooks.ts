import { useState } from "react";


export default function backdropHooks(){
    const [openBackdrop, setOpenBackdrop] = useState<boolean>(false)

    return {openBackdrop, setOpenBackdrop}
}