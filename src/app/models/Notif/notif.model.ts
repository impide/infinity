export class NotifModel {
    _id: string;
    requestCreateBy: string;
    requestCreateById: string;
    requestCreateByAvatar: string;
    requestReceiverId: string;
    typeOfRequest: string;
    createdAt: Date;
}

export class RequestValidated {
    _id: string;
    requestCreatedById: string;
    requestCreatedByAvatar: string;
    requestCreatedByusername: string;
    requestReceiverId: string;
    requestReceiverAvatar: string;
    requestReceiverUsername: string;
}