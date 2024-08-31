import { Injectable } from "@nestjs/common";
import { Lesson } from "src/domain/models/entities/lesson.entity";
import { DataSource, In, Repository } from "typeorm";

@Injectable()
export class LessonRepository extends Repository<Lesson>{
    constructor(private dataSource: DataSource){
        super(Lesson, dataSource.createEntityManager())
    }

    public async FindRange(lessonIds: string[]):Promise<Lesson[]>{
        return await this.dataSource.getMongoRepository(Lesson).find({
            where: {
                id: {
                    $in: lessonIds
                }
            }
        });
    }
}