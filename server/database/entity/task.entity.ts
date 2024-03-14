import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Tag } from "./tag.entity"

@Entity("task")
export class Task {
    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar")
    title: string

    @ManyToMany(() => Tag)
    @JoinTable()
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
}
