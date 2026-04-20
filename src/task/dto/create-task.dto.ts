import { IsArray, IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Length } from "class-validator";

export enum TaskTag {
   WORK = 'work',
   STUDY = 'study',
   HOME = 'home',
}

export class CreateTaskDto {
   @IsString()
   @IsNotEmpty()
   @Length(2, 40)
   title!: string;

   @IsString({ message: "Опис повинен бути строкою" })
   @IsOptional()
   description!: string;

   @IsInt({ message: "Приорітет повине бути цілим числом" })
   @IsPositive({ message: "Приорітет повинен бути позитивним числом" })
   @IsOptional()
   priority!: number;

   @IsArray({message: "Теги повинні бути масивом"})
   @IsEnum(TaskTag, {message: "Недопустимий тег", each: true})
   @IsOptional()
   tags!: TaskTag[];
}