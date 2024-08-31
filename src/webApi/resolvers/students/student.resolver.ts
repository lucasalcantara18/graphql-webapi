import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { StudentService } from "src/application/services/student/student.service";
import { CreateStudentInput } from "src/domain/inputs/student/student.input";
import { Lesson } from "src/domain/models/entities/lesson.entity";
import { Student } from "src/domain/models/entities/student.entity";
import { StudentType } from "src/domain/models/types/studentType";

@Resolver(of => StudentType)
export class StudentResolver{

    readonly _studentService: StudentService;

    constructor(lessonService: StudentService){
        this._studentService = lessonService;
    }

    @Query(returns => StudentType)
    public async student(@Args('id') id: string): Promise<Student> {
        return await this._studentService.getLEssonById(id);
    }

    @Query(returns => [StudentType])
    public async getAllStudents(): Promise<Student[]> {
        return await this._studentService.getAllLessons();
    }


    @Mutation(returns => StudentType)
    public async createStudent(@Args('input') input: CreateStudentInput): Promise<Student>{
        return await this._studentService.createStudent(input);
    }

    @ResolveField()
    public async lessons(@Parent() student: Student){
        return this._studentService.getLessonsFromStudent(student.lessons);
    }
}