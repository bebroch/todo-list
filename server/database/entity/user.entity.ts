import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm"
import { Task } from "./task.entity"

@Entity("user")
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", unique: true })
    login: string

    @Column("varchar")
    password: string

    @Column("date")
    created_date: Date

    @Column("date")
    updated_date: Date

    @OneToMany(() => Task, (task) => task.user)
    tasks: Task[]

    @DeleteDateColumn()
    deletedAt?: Date

    @BeforeInsert()
    setCreatedDate() {
        this.created_date = new Date()
        this.updated_date = new Date()
    }

    @BeforeUpdate()
    setUpdatedDate() {
        this.updated_date = new Date()
    }
}
