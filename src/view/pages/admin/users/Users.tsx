import NavigationBar from "../../../component/NavigationBar";
import {Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Typography} from "@mui/material";
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
import {endpointParent} from "../../../../config/api-url";


export default function Users(){

    const navigate = useNavigate()

    const token = localStorage.getItem("token")

    const [usersData, setUsersData] = useState([])
    const [isOpenDialog, setIsOpenDialog] = useState(false)
    const [dialogContent, setDialogContent] = useState({
        title: null,
        description: null,
        deletedId: null
    })


    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: "ID",
        },
        {
            field: "fullname",
            headerName: "Nama",
            width: 200
        },
        {
            field: "email",
            headerName: "email",
            width: 500
        },
        {
            field: "roles",
            headerName: "Role",
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

                function isDeleteContent(){
                    setDialogContent({
                        title: 'Hapus Data',
                        description: `Apakah kamu akan menghapus data dengan id ${thisRow.id}`,
                        deletedId: thisRow.id
                    })

                    setIsOpenDialog(true)
                }


                return <Box sx={{
                    flexDirection: 'row',
                    display: 'flex'
                }}>
                    <IconButton>
                        <Edit/>
                    </IconButton>
                </Box>;
            },
        },
    ]

    const handleDelete = async(e) => {
        e.stopPropagation();

        axios.delete(`${endpointParent}/api/delete-thesis/${dialogContent.deletedId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
        }).catch((error) => {
            console.log(error)
        })
    }


    useEffect(() => {
        const {expiredToken} = checkTokenHooks()

        if(expiredToken === true){
            logoutHooks()
            navigate("/login")
        } else {
            axios.get(`${endpointParent}/api/users`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                setUsersData(response.data.data)
            }).catch((error) => {
                console.log(error)
            })
        }
    }, [])

    // @ts-ignore
    return (
        <>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                width: "auto",
                height: "auto",
                justifyContent: "space-between",
                marginTop: 1
            }}>
                <Typography variant={"h6"}>Data User</Typography>
            </Box>
            {usersData ?
                <DataGrid columns={columns} rows={usersData} sx={{
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

            <Dialog open={isOpenDialog} onClose={() => setIsOpenDialog(false)}>
                <DialogTitle>{dialogContent.title}</DialogTitle>
                <DialogContent><Typography>{dialogContent.description}</Typography></DialogContent>
                <DialogActions>
                    <Button sx={{
                        textTransform: "capitalize"
                    }} variant={"outlined"} onClick={() => setIsOpenDialog(false)}>
                        Batalkan
                    </Button>
                    <Button sx={{
                        textTransform: "capitalize"
                    }} variant={"contained"} color={"error"} onClick={handleDelete}>
                        Hapus
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )

}
