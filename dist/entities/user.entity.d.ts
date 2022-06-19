import { Friend } from './friend.entity';
export declare class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
    isActive: boolean;
    isAdmin: boolean;
    password: string;
    friends: Friend[];
    createdAt: string;
    updatedAt: string;
}
