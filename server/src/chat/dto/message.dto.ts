import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";

export type senderType = {
    sender_id: string
}


export class SendMessageDTO {
    @IsNotEmpty()
    @IsString()
    chat_id: string

    @IsOptional()
    @IsString()
    text?: string

    @IsOptional()
    @IsMongoId()
    reply?: string

    @IsOptional()
    @IsString()
    type?: string
}