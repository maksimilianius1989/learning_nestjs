import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, Min, Max, IsArray, IsUUID } from "class-validator";

export class MovieDto {
    @ApiProperty({
        description: 'Назва фільму',
        example: 'Fight Club',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    title!: string;

    @ApiProperty({
        description: 'Рік релізу',
        example: 1999,
        type: Number,
    })
    @IsNotEmpty()
    @IsInt()
    @Min(1888)
    @Max(new Date().getFullYear())
    releaseYear!: number;

    @ApiPropertyOptional({
        description: 'Ссилка на постер фільму',
        example: 'https://some.com',
        type: String,
    })
    @IsString()
    imageUrl!: string;

    @ApiPropertyOptional({
        description: 'ID актьорів',
        example: ['123456', '7891011'],
        type: [String],
    })
    @IsArray()
    @IsUUID('4', { each: true })
    actorIds!: string[];
}