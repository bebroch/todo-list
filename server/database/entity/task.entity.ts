import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    DeleteDateColumn,
    Entity,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm"
import { Tag } from "./tag.entity"
import { User } from "./user.entity"

@Entity("task")
export class Task {
    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar")
    title: string

    @ManyToMany(() => Tag, (tag) => tag.task, { onDelete: "CASCADE" })
    tags: Tag[]

    @Column("varchar")
    description: string

    // @OneToOne(() => Status)
    // @Column("integer")
    // status_id: Status
    @Column("varchar")
    status: string

    @Column("date")
    created_date: Date

    @Column("date")
    updated_date: Date

    @DeleteDateColumn()
    deletedAt?: Date

    @BeforeInsert()
    updateDatesBeforeInsert() {
        this.created_date = new Date()
        this.updated_date = new Date()
    }

    @BeforeUpdate()
    updateDatesBeforeUpdate() {
        this.updated_date = new Date()
    }

    @ManyToOne(() => User, (user) => user.tasks)
    user: User
}
