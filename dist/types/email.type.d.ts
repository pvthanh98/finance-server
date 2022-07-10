export interface LogInteface {
    message?: string;
    from?: string;
    type?: string;
}
export interface MessageType {
    to: string;
    body: string;
    subject: string;
    title: string;
    expenses: Array<any>;
}
export interface MessageTypeDto {
    to: string;
    body: string;
    subject: string;
    title: string;
}
