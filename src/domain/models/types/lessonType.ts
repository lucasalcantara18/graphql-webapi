import { Field, ID, ObjectType } from "@nestjs/graphql";
import { StudentType } from "./studentType";

@ObjectType('Lesson')
export class LessonType {
    @Field(type => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    starDate: string;

    @Field()
    endDate: string;

    @Field(type => [StudentType])
    students: string[]
}