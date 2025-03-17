import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm"
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


    @ManyToOne(() => Match)
        nextMatch!: Match;

    @OneToOne(() => Match, { onDelete: "CASCADE" })
    @JoinColumn([{ name: "lm_FK", referencedColumnName: "id" },])
    leftMatch?: Match;

    @OneToOne(() => Match, { onDelete: "CASCADE" })
    @JoinColumn([{ name: "rm_FK", referencedColumnName: "id" },])
    rightMatch?: Match;

    @ManyToOne(() => Team, { eager: true })
    team1?: Team

    @ManyToOne(() => Team, { eager: true })
    team2?: Team

    @ManyToOne(() => Tournament, (tournament) => tournament.matches)
    tournament!: Tournament
}       