import { IsInt, IsNotEmpty, IsString, Min, Max } from "class-validator";

export class MovieDto {
    @IsNotEmpty()
    @IsString()
    title!: string;

    @IsNotEmpty()
    @IsInt()
    @Min(1888)
    @Max(new Date().getFullYear())
    releaseYear!: number;
}