import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from "typeorm"
import { Player } from "./Player"

@Entity()
export class Team {
    @PrimaryGeneratedColumn()
    id: number

    @Column
    name: String
    
    @OneToOne(() => Player)
    player1: Player
    
    @OneToOne(() => Player)
    player2: Player           
}       