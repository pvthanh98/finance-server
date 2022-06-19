import { IsString, IsUUID } from 'class-validator';

export class HandleFriendRequestDto {
  @IsUUID()
  friendShipId: string; // ID in friend table.

  @IsString()
  action: "accept" | "denied"
}