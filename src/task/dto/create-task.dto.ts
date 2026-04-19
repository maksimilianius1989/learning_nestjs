import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, MaxLength, MinLength } from "class-validator";

export class CreateTaskDto {
   @IsString()
   @IsNotEmpty()
   @Length(2, 40)
   title!: string;

   @IsString({ message: "Опис повинен бути строкою" })
   @IsOptional()
   description!: string;

   @IsNumber({}, { message: "Приорітет повине бути числом" })
   @IsOptional()
   priority: number;
}   