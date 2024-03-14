import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("tag")
export class Tag {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", unique: true })
    name: string
}
