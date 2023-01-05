import {Article, GridView, Style} from "@mui/icons-material";


let menuItemUser: any[] = [
    {
        name: 'Dashboard',
        link: '/dashboard-user/index',
        icon: <GridView/>,
        items : []
    },
    {
        name: 'Data Jurnal',
        link: '#',
        icon: <Style/>,
        items: [
            {
                name: 'Jurnal Saya',
                link: '/dashboard-user/list-paper-user'
            },
            {
                name: 'Upload Jurnal',
                link: '/dashboard-user/upload-paper-user'
            }
        ]
    },
    {
        name: 'Data Skripsi',
        link: '#',
        icon: <Article/>,
        items : [
            {
                name: 'Skripsi',
                link: '/dashboard-user/thesis-data',
                type: ["student", "civitas"]
            },
            {
                name: 'Upload Skripsi',
                link: '/dashboard-user/upload-thesis',
                type: ["student"]
            }
        ]
    }
]

export default menuItemUser;