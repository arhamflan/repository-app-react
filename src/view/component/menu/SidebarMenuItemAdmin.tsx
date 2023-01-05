

// @ts-ignore
import {Article, GridView, ManageAccounts, SchoolOutlined, Style} from "@mui/icons-material";

let menuItemAdmin: any[] = [
    {
        name: 'Dashboard',
        link: '/dashboard-admin/index',
        icon: <GridView/>
    },
    {
        name: 'Data Jurnal',
        link: '/dashboard-admin/paper',
        icon: <Style/>
    },
    {
        name: 'Data Skripsi',
        link: '/dashboard-admin/thesis',
        icon: <Article/>,
        items: [
            {
                name: 'Mejority'
            },
            {
                name: 'Mandatory'
            }
        ]
    },
    {
        name: 'Data Jurusan',
        link: '/dashboard-admin/major',
        icon: <SchoolOutlined/>,
        items: [
            {
                name: 'Mejority'
            },
            {
                name: 'Mandatory'
            }
        ]
    },
    {
        name: 'Pengaturan Akun',
        link: '/dashboard-admin/users',
        icon: <ManageAccounts/>
    }
]

export default menuItemAdmin;

