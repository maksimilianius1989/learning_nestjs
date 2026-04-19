import { IsNotEmpty, IsString, Length, IsBoolean } from "class-validator";

export class UpdateTaskDto {
    @IsString({message: "Назва задачі повинно бути строкою"})
    @IsNotEmpty({message: "Назва задачі не може бути пустим"})
    @Length(2, 40, {message: "Назва задачі повинна бути від 2 до 40 символів"})
    title!: string;

    @IsBoolean({message: "Статус повинне бути в булевому виразі"})
    isCompleated!: boolean;
}  