import {useParams} from "react-router-dom";
import {Typography} from "@mui/material";


function EditDepartment(){
    const {id} = useParams()

    return (
        <>
            <Typography>{id}</Typography>
        </>
    )
}

export default  EditDepartment;