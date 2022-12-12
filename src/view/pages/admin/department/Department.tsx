import NavigationBar from "../../../component/NavigationBar";
import {Box, Grid, Typography} from "@mui/material";
import Sidebar from "../../../component/Sidebar";
import {DataGrid, GridApi, GridCellValue, GridColDef} from "@mui/x-data-grid";
import {Button} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import checkTokenHooks from "../../../../use-case/auth/checkTokenHooks";
import {logoutHooks} from "../../../../use-case/auth/logoutHooks";
import axios from "axios";


export default function Department(){
    const [fields, setFields] = useState();

    const navigate = useNavigate()


    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: "ID",
        },
        {
            field: "field",
            headerName: "Jurusan",
            width: 1000
        },
        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            renderCell: (params) => {
                const onClick = (e) => {
                    e.stopPropagation(); // don't select this row after clicking

                    const api: GridApi = params.api;
                    const thisRow: Record<string, GridCellValue> = {};

                    api
                        .getAllColumns()
                        .filter((c) => c.field !== '__check__' && !!c)
                        .forEach(
                            (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
                        );

                    alert(JSON.stringify(thisRow.id, null, 4));

                    navigate("/")
                };

                return <Button onClick={onClick} sx={{textTransform: "capitalize"}}>Click</Button>;
            },
        },
    ]

    const rows = [
        {id: 1, field: "Informatika"},
        {id: 2, field: "Sistem Informasi"},
        {id: 3, field: "Informatika"},
        {id: 4, field: "Sistem Informasi"},
        {id: 5, field: "Informatika"},
        {id: 6, field: "Sistem Informasi"},
        {id: 7, field: "Informatika"},
        {id: 8, field: "Sistem Informasi"},
        {id: 9, field: "Informatika"},
        {id: 10, field: "Sistem Informasi"}
    ]

    useEffect(() => {
        const {expiredToken} = checkTokenHooks()

        if(expiredToken === true){
            logoutHooks()
            navigate("/login")
        } else {
            console.log("Token is available to use")
        }


        axios.get('http://167.172.64.153:3000/api/fields')
            .then((response) => {
                setFields(response.data.data)
            }).catch((error) => {
                console.log(error)
        })
    }, [])

    return (
        <>
            <NavigationBar/>

            <Grid container spacing={2} paddingX={2} marginTop={0.1}>
                <Grid item xs={12} sm={4} lg={2.5} position={"relative"} sx={{
                    display: {
                        xs: "none",
                        sm: "block"
                    }
                }}>
                    <Sidebar/>
                </Grid>

                <Grid item xs={12} md={8} lg={9}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        width: "auto",
                        height: "auto",
                        justifyContent: "space-between",
                        marginTop: 5
                    }}>
                        <Typography variant={"h6"}>Data Jurusan</Typography>
                        <Link to={"/"} style={{textDecoration: "none"}}>
                            <Button variant={"contained"} sx={{
                                textTransform: "capitalize"
                            }}>Tambah Data</Button>
                        </Link>
                    </Box>
                    {fields ?
                        <DataGrid columns={columns} rows={fields} sx={{
                            '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
                                border: `1px solid #f0f0f0`
                            },
                            height: 500,
                            marginTop: 2,
                        }}/> : ''
                    }
                </Grid>
            </Grid>
        </>
    )

}