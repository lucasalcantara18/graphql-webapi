import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { LessonModule } from './webApi/modules/lesson/lesson.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './domain/models/entities/lesson.entity';
import { StudentModule } from './webApi/modules/student/student.module';
import { Student } from './domain/models/entities/student.entity';

const graphQlImport = GraphQLModule.forRoot<ApolloDriverConfig>({
  autoSchemaFile: true,
  driver: ApolloDriver
});

const typeorm = TypeOrmModule.forRoot({
  type: 'mongodb',
  url: 'mongodb://localhost:27017/school',
  synchronize: true,
  entities: [Lesson, Student]
});

@Module({
  imports: [typeorm, graphQlImport, LessonModule, StudentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
