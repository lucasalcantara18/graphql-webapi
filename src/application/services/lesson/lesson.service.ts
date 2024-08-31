import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { log } from 'console';
import { Lesson } from 'src/domain/models/entities/lesson.entity';
import { Student } from 'src/domain/models/entities/student.entity';
import { LessonRepository } from 'src/infrastructure/dataAccess/repository/lesson.repository';
import { StudentRepository } from 'src/infrastructure/dataAccess/repository/student.repository';
import { ulid } from 'ulid';

@Injectable()
export class LessonService {
    
    private readonly _lessonRepository: LessonRepository;
    private readonly _studentRepository: StudentRepository;


    constructor(lessonRepository: LessonRepository, studentRepository: StudentRepository){
        this._lessonRepository = lessonRepository;
        this._studentRepository = studentRepository;
    }


    public async getLEssonById(id: string):Promise<Lesson>{
        const lesson = await this._lessonRepository.findOneBy({ id });

        if(lesson === null)
            throw new UnprocessableEntityException('Lesson not found');

        return lesson;
    }

    public async getAllLessons():Promise<Lesson[]>{
        const lesson = await this._lessonRepository.find();

        return lesson;
    }

    public async createLesson(name: string, starDate: string, endDate: string, students: string[]): Promise<Lesson> {
        const lesson = this._lessonRepository.create({
            name,
            starDate,
            endDate,
            id: ulid(),
            students
        });

        await this._lessonRepository.save(lesson);

        return lesson;
    }

    public async assignStudent(lessonId: string, studentsIds: string[]): Promise<Lesson> {

        const lesson = await this._lessonRepository.findOne({ where: { id: lessonId }});

        lesson.students = [...lesson.students, ...studentsIds];

        await this._lessonRepository.save(lesson);

        studentsIds.forEach(async studentId => {
            const student = await this._studentRepository.findOne({ where: { id: studentId }});
            student.lessons.push(lessonId);
            await this._studentRepository.save(student);
        });

        return lesson;
    }

    public async getStudentsFromLesson(studentIds: string[]): Promise<Student[]>{
        return await this._studentRepository.findRange(studentIds);
    }
}
