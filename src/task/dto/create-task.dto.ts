import { IsArray, IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, IsUrl, Length, Matches, MinLength } from "class-validator";

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

   @IsArray({ message: "Теги повинні бути масивом" })
   @IsEnum(TaskTag, { message: "Недопустимий тег", each: true })
   @IsOptional()
   tags!: TaskTag[];

   @IsString({ message: "Пароль повинен бути строкою" })
   @MinLength(6, { message: "Мінімальна довжина паролю 6 символів" })
   @Matches(/^(?=.*[A-Z])(?=.*[0-9]).+$/, { message: "Пароль має мати хоча б одну велику букву і одну цифру" })
   password!: string;

   @IsString({ message: "URL повинен бути строкою" })
   @IsUrl(
      {
         protocols: ['https', 'wss'],
         require_valid_protocol: true,
         host_blacklist: ['someurl.com']
      },
      { message: "Не коректний адрес сайту" })
   websiteUrl!: string;
}