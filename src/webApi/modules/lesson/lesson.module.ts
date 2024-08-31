import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonService } from 'src/application/services/lesson/lesson.service';
import { Lesson } from 'src/domain/models/entities/lesson.entity';
import { LessonRepository } from 'src/infrastructure/dataAccess/repository/lesson.repository';
import { LessonResolver } from 'src/webApi/resolvers/lessons/lesson.resolver';
import { StudentModule } from '../student/student.module';

@Module({
    imports: [TypeOrmModule.forFeature([Lesson]), forwardRef(() => StudentModule)],
    providers: [LessonResolver, LessonService, LessonRepository],
    exports: [LessonRepository]
})
export class LessonModule {}
