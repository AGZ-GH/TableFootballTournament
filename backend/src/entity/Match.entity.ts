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

    @OneToOne(() => Team)
    @JoinColumn([{ name: "t1_FK", referencedColumnName: "id" },])
    team1!: Team

    @OneToOne(() => Team)
    @JoinColumn([{ name: "t2_FK", referencedColumnName: "id" },])
    team2!: Team

    @ManyToOne(() => Tournament, (tournament) => tournament.matches)
    tournament!: Tournament
}       