import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from "typeorm"
import { Team } from "./Team"

@Entity()
export class Match {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    date: Date
    
    @Column()
    scoreTeam1: number
    
    @Column()
    scoreTeam2: number

    @OneToOne(() => Team)
    team1: Team

    @OneToOne(() => Team)
    team2: Team
}       