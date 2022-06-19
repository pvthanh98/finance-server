import { IsUUID } from 'class-validator';

export class UnAndAddFriendDto {
  @IsUUID()
  friendId: string;
}