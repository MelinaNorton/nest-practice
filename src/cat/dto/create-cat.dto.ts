import { IsString, IsInt, Min, Max, IsOptional, IsBoolean} from "class-validator";
import {Type} from 'class-transformer';

//here we will practice using TS dtos to define tghe expected shape of POST/PATCHed "cats"
export class CreateCatDto {

    //this verifies that the unchangeable value of name is a string
    @IsString()
    readonly name: string;

    //this, along with its decorators, ensures that the age is 1)between 0 & 20, 2)is a number, and 3) is converted
    //to a number if the input is a string (ie "5"->5). The last part is performed by @Type
    @Type(() => Number)
    @IsInt()
    @Min(0)
    @Max(20)
    readonly age: number;

    //this, similarly to above, defines the isNice field as optional, is a boolean, and converts a string to a t/f value
    //as needed
    @Type(() => Boolean)
    @IsOptional()
    @IsBoolean()
    readonly isNice: boolean;
}
