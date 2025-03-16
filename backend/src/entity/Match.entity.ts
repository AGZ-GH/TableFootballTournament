import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Team } from "./Team.entity"
import { Tournament } from "./Tournament.entity"

@Entity()
export class Match {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    date!: Date

    @Column({ default: 0 })
    scoreTeam1: number = 0

    @Column({ default: 0 })
    scoreTeam2: number = 0

    @ManyToOne(() => Team, { eager: true })
    team1!: Team

    @ManyToOne(() => Team, { eager: true })
    team2!: Team

    @ManyToOne(() => Tournament, (tournament) => tournament.matches)
    tournament!: Tournament
}       