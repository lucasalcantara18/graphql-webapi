import { Field, ID, ObjectType } from "@nestjs/graphql";
import { LessonType } from "./lessonType";

@ObjectType('Student')
export class StudentType{
    @Field(type => ID)
    id:string;

    @Field()
    name:string;

    @Field()
    sexo:string;
    
    @Field()
    idade: number;

    @Field(type => [LessonType])
    lessons: string[]
}