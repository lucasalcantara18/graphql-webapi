import { Field, ID, InputType } from "@nestjs/graphql";
import { IsDateString, MinLength, MaxLength, IsNumberString} from "class-validator";


@InputType()
export class CreateStudentInput {

    @MinLength(1)
    @Field()
    name: string;

    @MinLength(1)
    @MaxLength(1)
    @Field()
    sexo:string;

    @IsNumberString()
    @Field()
    idade:string;

    @Field(() => [ID], { defaultValue: [] })
    lessons: string[];
}