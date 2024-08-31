import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { CreateStudentInput } from "src/domain/inputs/student/student.input";
import { Lesson } from "src/domain/models/entities/lesson.entity";
import { Student } from "src/domain/models/entities/student.entity";
import { LessonRepository } from "src/infrastructure/dataAccess/repository/lesson.repository";
import { StudentRepository } from "src/infrastructure/dataAccess/repository/student.repository";
import { ulid } from "ulid";


@Injectable()
export class StudentService{

    private readonly _studentRepository: StudentRepository;
    private readonly _lessonRepository: LessonRepository;

    constructor(studentRepository: StudentRepository, lessonRepository: LessonRepository){
        this._studentRepository = studentRepository;
        this._lessonRepository = lessonRepository;
    }

    public async getLEssonById(id: string):Promise<Student>{
        const student = await this._studentRepository.findOneBy({ id });

        if(student === null)
            throw new UnprocessableEntityException('Student not found');

        return student;
    }

    public async getAllLessons():Promise<Student[]>{
        const lesson = await this._studentRepository.find();

        return lesson;
    }

    public async createStudent(input: CreateStudentInput): Promise<Student> {
        const { name, sexo, idade, lessons } = input;

        const student = this._studentRepository.create({
            name,
            sexo,
            idade: parseInt(idade),
            id: ulid(),
            lessons
        });

        await this._studentRepository.save(student);

        return student;
    }

    public async getLessonsFromStudent(lessonsIds: string[]): Promise<Lesson[]>{
        return await this._lessonRepository.FindRange(lessonsIds);
    }

}