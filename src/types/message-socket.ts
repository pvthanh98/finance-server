export interface MessageBroadcast {
    user: {
        id: string,
        name: string
    },
    body: string;
    createdAt: string;
}


export interface MessagePrivate {
    body: string;
    type: string;
    conversationId:string;
    fromUser: {
        id: string;
        image: string;
        lastName:string;
        firstName:string
    }
}

