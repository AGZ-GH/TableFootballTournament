import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Player {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    firstname!: string

    @Column()
    lastname!: string

    @Column()
    password!: string

    @Column('boolean', { default: false })
    isAdmin: boolean = false
}       