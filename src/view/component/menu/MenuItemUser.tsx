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
                name: 'Jurnal',
                link: '/dashboard-user/list-paper'
            },
            {
                name: 'Upload Jurnal',
                link: '/dashboard-user/upload-paper'
            }
        ]
    },
    {
        name: 'Data Skripsi',
        link: '/dashboard-user/thesis',
        icon: <Article/>,
        items : []
    }
]

export default menuItemUser;