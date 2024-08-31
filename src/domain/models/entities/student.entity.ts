import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export class Student{
    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    id:string;

    @Column()
    name:string;

    @Column()
    sexo:string;
    
    @Column()
    idade: number;

    @Column()
    lessons: string[]
}