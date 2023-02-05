import { Request, Response } from 'express';
import {getStudentData} from '../models/studentModels';

function getAllStudents (req: Request, res: Response): void{
  res.json(getStudentData());
}

export default { getAllStudents };
