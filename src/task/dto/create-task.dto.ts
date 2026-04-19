import { IsNotEmpty, IsString, Length, MaxLength, MinLength } from "class-validator";

export class CreateTaskDto {
   @IsString()
   @IsNotEmpty()
   @Length(2, 40)
   title!: string;
}