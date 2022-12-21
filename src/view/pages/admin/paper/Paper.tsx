import NavigationBar from "../../../component/NavigationBar";
import {Box, Grid, IconButton, Typography} from "@mui/material";
import Sidebar from "../../../component/Sidebar";
import {DataGrid, GridApi, GridCellValue, GridColDef, GridToolbar} from "@mui/x-data-grid";
import {Button} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import checkTokenHooks from "../../../../use-case/auth/checkTokenHooks";
import {logoutHooks} from "../../../../use-case/auth/logoutHooks";
import axios from "axios";
import {Check, Delete, Download, Edit} from "@mui/icons-material";
import Layout from "../../../layouts/Layout";
import {useDepartmentContext} from "../../../../providers/use/useDepartmentContext";
import getDepartmentHook from "../../../../use-case/department/getDepartmentHook";
import deleteDepartmentHooks from "../../../../use-case/department/deleteDepartmentHooks";
import {endpointThesis} from "../../../../config/api-url";


export default function Paper(){

    const navigate = useNavigate()

    const token = localStorage.getItem("token")

    const [paperData, setPaperData] = useState([])

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
            field: "paperNameFile",
            headerName: "Penulis",
            width: 200
        },
        {
            field: "paperTitle",
            headerName: "Judul",
            width: 500
        },
        {
            field: "status",
            headerName: "Status",
            width: 100
        },
        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            width: 150,
            renderCell: (params) => {// don't select this row after clicking

                const api: GridApi = params.api;
                const thisRow: Record<string, GridCellValue> = {};

                api
                    .getAllColumns()
                    .filter((c) => c.field !== '__check__' && !!c)
                    .forEach(
                        (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
                    );

                const handleDelete = async(e) => {
                    e.stopPropagation();

                    axios.delete(`http://167.172.64.153:3000/api/delete-paper/${thisRow.id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }).then((response) => {
                        setPaperData(paperData.filter(((data, index) => data.id !== thisRow.id)))
                    }).catch((error) => {
                        console.log(error)
                    })
                }

                return <Box sx={{
                    flexDirection: 'row',
                    display: 'flex'
                }}>
                    <IconButton>
                        <Download/>
                    </IconButton>
                    <IconButton onClick={handleDelete}>
                        <Delete/>
                    </IconButton>
                    {thisRow.status[0] !== 'accepted' ?
                        <IconButton>
                            <Check/>
                        </IconButton> : <></>
                    }
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
            axios.get(`http://167.172.64.153:3000/api/papers`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                setPaperData(response.data.data)
            }).catch((error) => {
                console.log(error)
            })
        }
    }, [])

    // @ts-ignore
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
                    <Typography variant={"h6"}>Data Paper</Typography>
                    <Link to={"/add-paper"} style={{textDecoration: "none"}}>
                        <Button variant={"contained"} sx={{
                            textTransform: "capitalize"
                        }}>Tambah Data</Button>
                    </Link>
                </Box>
                {paperData ?
                    <DataGrid columns={columns} rows={paperData} sx={{
                        border: 2,
                        borderColor: "rgba(184, 184, 184, 0.21)",
                        borderStyle: "dashed",
                        background: "white",
                        '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
                            border: 1,
                            borderColor: "rgba(184, 184, 184, 0.21)",
                            borderStyle: "dashed",
                        },
                        height: {
                            lg: 420,
                            xl: 600
                        },
                        marginTop: 2,
                    }} components={{ Toolbar: GridToolbar }}/> : <Typography>Loading....</Typography>
                }
            </Layout>
        </>
    )

}
