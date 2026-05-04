import { ApiProperty } from "@nestjs/swagger";

export class MovieResponse {
    @ApiProperty({
        description: 'ID фільма',
        type: String,
        example: '123456',
    })
    id!: string;

    @ApiProperty({
        description: 'Назва фільму',
        type: String,
        example: 'Люди в чорному',
    })
    title!: string;

    @ApiProperty({
        description: 'Рік випуску фільму',
        type: String,
        example: '1999',
    })
    releaseYear!: string;
}