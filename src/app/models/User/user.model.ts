export class UserModel {
    _id: string;
    username: string;
    email: string;
    avatar: string;
    friends: [{
        username: string;
        avatar: string;
        userId: string;
    }]
}