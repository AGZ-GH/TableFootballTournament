import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm"
import { Match } from "./Match.entity"
import { Team } from "./Team.entity"

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

    @OneToMany(() => Match, (match) => match.tournament, { onDelete: "CASCADE" })
    matches!: Match[]

    @ManyToMany(() => Team)
    @JoinTable()
    teams!: Team[]
}       