export const SettingRoutesData: SettingRoutes[] = [{
    settingName: 'Dashboard',
    settingClass: 'bi-window-stack',
    routePath: ''
},
{
    settingName: 'Notification',
    settingClass: 'bi-bell',
    routePath: ''
},
{
    settingName: 'Message',
    settingClass: 'bi-envelope',
    routePath: ''
},
{
    settingName: 'Account',
    settingClass: 'bi-person-check',
    routePath: ''
}]


export interface SettingRoutes {
    settingName: string;
    settingClass: string;
    routePath: string;
}