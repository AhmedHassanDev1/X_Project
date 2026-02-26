import { IsNotEmpty } from "class-validator";


export class CreateConversationDto{
    @IsNotEmpty()
    participants:string[] 
    
    @IsNotEmpty()
    type:"group" | "dm"

}