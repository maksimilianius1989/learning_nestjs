import { ReviewEntity } from "src/review/entity/review.entity";
import { Column, CreateDateColumn, Entity, Generated, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum Genre {
    ACTION = 'action',
    COMEDY = 'comedy',
    DRAMA = 'drama',
    HORROR = 'horror',
}

@Entity({ name: 'movies' })
export class MovieEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({
        type: 'varchar',
        length: 128,
    })
    title!: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    descripiton!: string;

    @Column({
        name: 'release_year',
        type: 'int',
        unsigned: true,
    })
    releaseYear!: number;

    @Column({
        type: 'decimal',
        precision: 3,
        scale: 1,
        default: 0.0,
    })
    rating!: number;

    @Column({
        name: 'is_available',
        type: 'boolean',
        default: false,
    })
    isAvailable!: boolean;

    @Column({
        type: 'enum',
        enum: Genre,
        default: Genre.DRAMA,
    })
    genre!: Genre;

    @OneToMany(
        () => ReviewEntity,
        (review) => review.movie,
    )
    reviews!: ReviewEntity[]

    @CreateDateColumn({
        name: 'created_at',
    })
    createdAt!: Date;

    @UpdateDateColumn({
        name: 'updated_at',
    })
    updatedAt!: Date;
} 