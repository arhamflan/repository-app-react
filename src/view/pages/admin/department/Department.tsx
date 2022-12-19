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
import {useDepartmentContext} from "../../../../providers/use/useDepartmentContext";
import getDepartmentHook from "../../../../use-case/department/getDepartmentHook";
import deleteDepartmentHooks from "../../../../use-case/department/deleteDepartmentHooks";


export default function Department(){
    const [fields, setFields] = useState();

    const navigate = useNavigate()

    const token = localStorage.getItem("token")

    const {state} = useDepartmentContext()

    // @ts-ignore
    const {getData} = getDepartmentHook()


    const {deleteDepartment} = useDepartmentContext()

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: "ID",
        },
        {
            field: "field",
            headerName: "Jurusan",
            width: 500
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

                const handleDelete = async(e) => {
                    e.stopPropagation();

                    const api: GridApi = params.api
                    const thisRow: Record<string, GridCellValue> = {};

                    api
                        .getAllColumns()
                        .filter((c) => c.field !== '__check__' && !!c)
                        .forEach(
                            (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
                        );


                    // @ts-ignore
                    const data = await deleteDepartmentHooks(thisRow.id)
                    if(data === true){
                        console.log(true)
                        // salahnya disini ke context
                        deleteDepartment(thisRow.id)
                    } else {
                        console.log("Failed to delete")
                    }
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
            getData()
        }
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
                    marginTop: 1
                }}>
                    <Typography variant={"h6"}>Data Jurusan</Typography>
                    <Link to={"/add-major"} style={{textDecoration: "none"}}>
                        <Button variant={"contained"} sx={{
                            textTransform: "capitalize"
                        }}>Tambah Data</Button>
                    </Link>
                </Box>
                {state.department ?
                    <DataGrid columns={columns} rows={state.department} sx={{
                        border: 2,
                        borderColor: "rgba(184, 184, 184, 0.21)",
                        borderStyle: "dashed",
                        background: "white",
                        '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
                            border: 1,
                            borderColor: "rgba(184, 184, 184, 0.21)",
                            borderStyle: "dashed",
                        },
                        height: 420,
                        marginTop: 2,
                    }}/> : <Typography>Loading....</Typography>
                }
            </Layout>
        </>
    )

}