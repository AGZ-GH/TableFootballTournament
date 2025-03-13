import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Match } from "./Match.entity"

@Entity()
export class Tournament {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    description: string = ""

    @Column()
    startingDate!: Date

    @Column()
    endDate!: Date

    @OneToMany(() => Match, (match) => match.tournament)
    matches?: Match
}       