import { IsArray, IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Length } from "class-validator";
import { StartsWith } from "../decorators/starts-with.decorator";

export enum TaskTag {
   WORK = 'work',
   STUDY = 'study',
   HOME = 'home',
}

export class CreateTaskDto {
   @IsString()
   @IsNotEmpty()
   @StartsWith('Task:', {message: "Не валідна назва"})
   @Length(2, 40)
   title!: string;
  
   @IsString({ message: "Опис повинен бути строкою" })
   @IsOptional()
   description!: string;

   @IsInt({ message: "Приорітет повине бути цілим числом" })
   @IsPositive({ message: "Приорітет повинен бути позитивним числом" })
   @IsOptional()
   priority!: number;

   @IsArray({ message: "Теги повинні бути масивом" })
   @IsEnum(TaskTag, { message: "Недопустимий тег", each: true })
   @IsOptional()
   tags!: TaskTag[];  
}