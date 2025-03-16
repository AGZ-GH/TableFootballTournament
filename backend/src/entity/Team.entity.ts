import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { Player } from "./Player.entity"

@Entity()
export class Team {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @OneToOne(() => Player, { onDelete: "CASCADE", eager: true })
    @JoinColumn([{ name: "p1_FK", referencedColumnName: "id" },])
    player1!: Player

    @OneToOne(() => Player, { onDelete: "CASCADE", eager: true })
    @JoinColumn([{ name: "p2_FK", referencedColumnName: "id" },])
    player2?: Player
}       