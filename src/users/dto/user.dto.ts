import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class UserDto{
    @IsNotEmpty()
    @MinLength(4)
    username : string;

    @IsNotEmpty()
    @MinLength(3)
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string
}