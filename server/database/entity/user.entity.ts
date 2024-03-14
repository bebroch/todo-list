import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Task } from "./task.entity"

@Entity("user")
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", unique: true })
    login: string

    @ManyToMany(() => Task)
    @JoinTable()
    tasks: Task[]

    @Column("varchar")
    password: string

    @Column("date")
    created_date: Date

    @Column("date")
    updated_date: Date
}
