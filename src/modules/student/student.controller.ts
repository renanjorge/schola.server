import express, { Request, Response } from 'express';
import { StudentService } from './student.service';
import { BaseController } from '../../core/base-controller';

import '../student/dto/student.dto';

export default class StudentController extends BaseController {

    private path = '/students';
    private router = express();
    private service: StudentService;

    constructor() {
        super();
        this.initializeRoutes();
        this.service = new StudentService;
    }
    
    public initializeRoutes() {
        this.router.get(this.path, this.index);
    }

    public index = async (request: Request, response: Response) => {
        const students = await this.service.findAll();
        
        if (students.isEmpty()) {
            return this.notFound(response);
        }

        return this.ok<StudentDTO[]>(response, students);
    }
} 