import { Request, Response } from 'express';
import {getStudentData} from '../models/studentModels';
import {addStudent} from '../models/studentModels';

function getAllStudents (req: Request, res: Response): void{
  const {studentName} = req.params;
  const student = getStudentData(studentName);

  if (student === undefined){
    res.sendStatus(404);
    return;
  }

  res.json(student);

}

function validateWeights( weights: CourseGrades): boolean{
  let total: number = 0
  for (let i: number = 0; i < weights.assignmentWeights.length; i++){
    total += weights.assignmentWeights[i].weight;
  }
  total += weights.finalExamWeight;
  if (total === 100){
    return true;
  }
  else{
    return false;
  }
}

function createStudent (req: Request, res: Response): void{
  // res.json(addStudent);
  console.log(req.body);

  const { name, weights } = req.body as NewStudentRequest;
  if(!validateWeights(weights)){
    res.sendStatus(400); //weights dont add to 100
    return; //exit the function
  }

  const newStudent: NewStudentRequest = {name, weights}
  const didAddStudent = addStudent(newStudent);
  if(!didAddStudent){
    res.sendStatus(409);
    return;
  }

  res.sendStatus(201);
}
export default { getAllStudents, createStudent};
