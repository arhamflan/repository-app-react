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
import {useDepartmentContext} from "../../../../providers/use/useDepartmentContext";
import {endpointParent} from "../../../../config/api-url";
import {toast, Toaster} from "react-hot-toast";


export default function Paper(){

    const navigate = useNavigate()

    const token = localStorage.getItem("token")

    const [paperData, setPaperData] = useState([])

    const [isOpenDialog, setIsOpenDialog] = useState(false)
    const [dialogContent, setDialogContent] = useState({
        title: null,
        description: null,
        deletedId: null
    })

    // @ts-ignore


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

                const isDeleteContent = async(e) => {
                    e.stopPropagation();

                    console.log("Testing")

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
                        <Download/>
                    </IconButton>
                    <IconButton onClick={isDeleteContent}>
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


    const handleDelete = (e) => {
        e.stopPropagation();

        axios.delete(`${endpointParent}/api/delete-paper/${dialogContent.deletedId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setIsOpenDialog(false)
            setPaperData(paperData.filter(((data, index) => data.id !== dialogContent.deletedId)))
            toast.success('Berhasil Hapus Paper',{
                duration: 1000,
                position: 'bottom-center'
            })
        }).catch((error) => {
            console.log(error)
            setIsOpenDialog(false)
        })
    }


    useEffect(() => {
        const {expiredToken} = checkTokenHooks()

        if(expiredToken === true){
            logoutHooks()
            navigate("/login")
        } else {
            axios.get(`${endpointParent}/api/papers`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                setPaperData(response.data.data)
            }).catch((error) => {
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
                <Typography variant={"h6"}>Data Paper</Typography>
                <Link to={"/dashboard-admin/add-paper"} style={{textDecoration: "none"}}>
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

            <Toaster/>
        </>
    )

}
