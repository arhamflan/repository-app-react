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
import Layout from "../../../layouts/Layout";


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
            <Layout>
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
                        border: 2,
                        borderColor: "rgba(184, 184, 184, 0.21)",
                        borderStyle: "dashed",
                        background: "white",
                        '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
                            border: 1,
                            borderColor: "rgba(184, 184, 184, 0.21)",
                            borderStyle: "dashed",
                        },
                        height: 500,
                        marginTop: 2,
                    }}/> : <Typography>Loading....</Typography>
                }
            </Layout>
        </>
    )

}