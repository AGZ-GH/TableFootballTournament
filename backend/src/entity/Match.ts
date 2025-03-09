import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from "typeorm"

@Entity()
export class Match {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    date: Date
    
    @Column()
    score: number
}       