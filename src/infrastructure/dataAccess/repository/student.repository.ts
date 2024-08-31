import { Injectable } from "@nestjs/common";
import { Student } from "src/domain/models/entities/student.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class StudentRepository extends Repository<Student>{
    constructor(private dataSource: DataSource){
        super(Student, dataSource.createEntityManager())
    }

    public async findRange(studentIds: string[]): Promise<Student[]>{
        return await this.dataSource.getMongoRepository(Student).find({
            where: {
                id: {
                    $in: studentIds
                }
            }
        });
    }
}