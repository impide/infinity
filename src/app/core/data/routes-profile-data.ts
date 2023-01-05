export const ProfileRoutesData: ProfileRoutes[] = [
  {
    profileName: 'My Publication',
    routePath: 'profile-publication'
  },
  {
    profileName: 'My Friends-Lists',
    routePath: ''
  }];


export interface ProfileRoutes {
  profileName: string;
  routePath: string;
};
