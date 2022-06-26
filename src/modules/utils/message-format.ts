import { Message } from "src/entities/message";

export const FormatMessageOwner = (messages : Array<Message>, userId) =>{
    return messages.map(msg=>{
        const { fromUser,...otherAttr} = msg;
        return {
            ...otherAttr,
            fromUser:{
                ...fromUser,
                isMe: fromUser.id === userId
            }
        }
    })
}