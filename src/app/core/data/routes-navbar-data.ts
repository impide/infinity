export const NavbarRoutesData: NavbarRoutes[] = [
    {
        navName: 'Story',
        routePath: '/main-space-story'
    },
    {
        navName: 'Discover',
        routePath: ''
    },
    {
        navName: 'Messenger',
        routePath: '/main-space-messenger'
    }
]

export interface NavbarRoutes {
    navName: string;
    routePath: string;
}