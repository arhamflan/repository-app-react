import {Button} from "@mui/material";

export default function ButtonSubmit(props){
    return (
        <>
            <Button type={"submit"} sx={{
                textTransform: "capitalize",
                marginLeft: "auto",
                marginY: 3
            }} variant={"contained"}>{props.name}</Button>
        </>
    )
}