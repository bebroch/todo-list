import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Task } from "./task.entity"

@Entity("tag")
export class Tag {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", unique: true })
    name: string

    @ManyToMany(() => Task, (task) => task.tags, { onDelete: "CASCADE" })
    @JoinTable()
    task: Task[]
}
