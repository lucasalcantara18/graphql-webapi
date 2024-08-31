import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { LessonService } from "src/application/services/lesson/lesson.service";
import { AssignStudentsInput } from "src/domain/inputs/lesson/assignStudents.input";
import { CreateLessonInput } from "src/domain/inputs/lesson/lesson.input";
import { Lesson } from "src/domain/models/entities/lesson.entity";
import { LessonType } from "src/domain/models/types/lessonType";

@Resolver(of => LessonType)
export class LessonResolver{

    readonly _lessonService: LessonService;

    constructor(lessonService: LessonService){
        this._lessonService = lessonService;
    }

    @Query(returns => LessonType)
    public async lesson(@Args('id') id: string): Promise<Lesson> {
        return await this._lessonService.getLEssonById(id);
    }

    @Query(returns => [LessonType])
    public async getAlllessons(): Promise<Lesson[]> {
        return await this._lessonService.getAllLessons();
    }


    @Mutation(returns => LessonType)
    public async createLesson(@Args('input') input: CreateLessonInput): Promise<Lesson>{
        const { name, startDate, endDate, students } = input;
        return await this._lessonService.createLesson(name, startDate, endDate, students);
    }

    @Mutation(returns => LessonType)
    public async assignStudent(@Args('input') input: AssignStudentsInput): Promise<Lesson>{
        return this._lessonService.assignStudent(input.lessonId, input.studentsIds);
    }

    @ResolveField()
    public async students(@Parent() lesson: Lesson){
        return this._lessonService.getStudentsFromLesson(lesson.students);
    }    
}