import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentService } from 'src/application/services/student/student.service';
import { Student } from 'src/domain/models/entities/student.entity';
import { StudentRepository } from 'src/infrastructure/dataAccess/repository/student.repository';
import { StudentResolver } from 'src/webApi/resolvers/students/student.resolver';
import { LessonModule } from '../lesson/lesson.module';

@Module({
    imports: [TypeOrmModule.forFeature([Student]), forwardRef(() => LessonModule)],
    providers: [StudentResolver, StudentRepository, StudentService],
    exports: [StudentRepository]
    
})
export class StudentModule {}
