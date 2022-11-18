export class PostModel {
    _id: string;
    content: string;
    image: string;
    creator: string;
    avatarCreator: string;
    userId: string;
    likes: string[];
    createdAt: Date;
}

export class CommentModel {
    creator: string;
    comment: string;
    userId: string;
    postId: string;
    createdAt: Date;
}

export class LikeModel {
    userId: string;
}