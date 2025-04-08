import { IsString, Matches, MaxLength, Min, MinLength } from "class-validator";

export class AuthCredentialsDto {

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, { message: 'Password is too weak' })
    password: string;
}