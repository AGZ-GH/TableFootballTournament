import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from "typeorm"
import { Player } from "./Player"

@Entity()
export class Team {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => Player)
    player1: Player
    
    @OneToOne(() => Player)
    player2: Player           
}       