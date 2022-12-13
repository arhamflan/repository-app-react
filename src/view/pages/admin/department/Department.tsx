import NavigationBar from "../../../component/NavigationBar";
import {Box, Grid, IconButton, Typography} from "@mui/material";
import Sidebar from "../../../component/Sidebar";
import {DataGrid, GridApi, GridCellValue, GridColDef} from "@mui/x-data-grid";
import {Button} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import checkTokenHooks from "../../../../use-case/auth/checkTokenHooks";
import {logoutHooks} from "../../../../use-case/auth/logoutHooks";
import axios from "axios";
import {Delete, Edit} from "@mui/icons-material";


export default function Department(){
    const [fields, setFields] = useState();

    const navigate = useNavigate()

    const token = localStorage.getItem("token")

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

                    navigate(`/edit-major/${thisRow.id}`)
                };

                const handleDelete = (e) => {
                    e.stopPropagation();

                    const api: GridApi = params.api
                    const thisRow: Record<string, GridCellValue> = {};

                    api
                        .getAllColumns()
                        .filter((c) => c.field !== '__check__' && !!c)
                        .forEach(
                            (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
                        );

                    axios.delete(`http://167.172.64.153:3000/api/field/${thisRow.id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }).then((response) => {
                        // @ts-ignore
                        setFields(fields.filter((data, index) => data.id !== thisRow.id))
                    }).catch((error) => {
                        console.log(error.message)
                    })
                }

                return <Box sx={{
                    flexDirection: 'row',
                    display: 'flex'
                }}>
                    <IconButton onClick={onClick}>
                        <Edit/>
                    </IconButton>
                    <IconButton onClick={handleDelete}>
                        <Delete/>
                    </IconButton>
                </Box>;
            },
        },
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
                        <Link to={"/add-major"} style={{textDecoration: "none"}}>
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
                        }}/> : <Typography>Internet Anda Bermasalah</Typography>
                    }
                </Grid>
            </Grid>
        </>
    )

}