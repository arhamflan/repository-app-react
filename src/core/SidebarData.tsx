import { AutoStoriesSharp, GridView, LocalLibrary, Style, ManageAccounts, SettingsAccessibility } from "@mui/icons-material"

export const SidebarData = [
    {
        title: 'Dashboard',
        path: '/',
        icon: <GridView/>
    },
    {
        title: 'Skripsi',
        path: '/thesis',
        icon: <Style/>
    },
    {
        title: 'Mahasiswa',
        path: '/user',
        icon: <LocalLibrary/>
    },
    {
        title: 'Jurnal',
        path: '/journal',
        icon: <AutoStoriesSharp/>
    },
    {
        title: 'Pengaturan Akses',
        path: '/accessbility',
        icon: <SettingsAccessibility/>
    },
    {
        title: 'Pengaturan Akun',
        path: '/manage-account',
        icon: <ManageAccounts/>
    }
]