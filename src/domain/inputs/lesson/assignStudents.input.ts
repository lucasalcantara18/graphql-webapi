import { InputType, Field, ID } from "@nestjs/graphql";

@InputType()
export class AssignStudentsInput {

    @Field(type => ID)
    lessonId: string;

    @Field(type => [ID])
    studentsIds: string[];

}