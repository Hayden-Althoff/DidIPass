import { Request, Response } from 'express';
import {
  getStudentData,
  addStudent,
  calculateFinalExamScores,
  getLetterGrade,
} from '../models/studentModels';

function getAllStudents(req: Request, res: Response): void {
  const { studentName } = req.params;
  const student = getStudentData(studentName);

  if (student === undefined) {
    res.sendStatus(404);
    return;
  }

  res.json(student);
}

function validateWeights(weights: CourseGrades): boolean {
  let total: number = 0;
  for (let i: number = 0; i < weights.assignmentWeights.length; i++) {
    total += weights.assignmentWeights[i].weight;
  }
  total += weights.finalExamWeight;
  if (total === 100) {
    return true;
  }

  return false;
}

function createStudent(req: Request, res: Response): void {
  // res.json(addStudent);
  console.log(req.body);

  const { name, weights } = req.body as NewStudentRequest;
  if (!validateWeights(weights)) {
    res.sendStatus(400); // weights dont add to 100
    return; // exit the function
  }

  const newStudent: NewStudentRequest = { name, weights };
  const didAddStudent = addStudent(newStudent);
  if (!didAddStudent) {
    res.sendStatus(409);
    return;
  }

  res.sendStatus(201);
}

function getFinalExamScores(req: Request, res: Response): void {
  const { studentName } = req.params as StudentNameParam;
  const student = getStudentData(studentName);

  if (!student) {
    res.sendStatus(404);
    return;
  }

  const { weights, currentAverage } = student;

  // get grade for A
  const A: number = calculateFinalExamScores(currentAverage, weights.finalExamWeight, 90);
  const B: number = calculateFinalExamScores(currentAverage, weights.finalExamWeight, 80);
  const C: number = calculateFinalExamScores(currentAverage, weights.finalExamWeight, 70);
  const D: number = calculateFinalExamScores(currentAverage, weights.finalExamWeight, 60);
  const gradesNeededForFinal: gradesNeeded = { A, B, C, D };

  res.json(gradesNeededForFinal);
}

function calcFinalScore(req: Request, res: Response): void {
  const { studentName } = req.params as StudentNameParam;
  const student = getStudentData(studentName);

  if (!student) {
    res.sendStatus(404);
    return;
  }

  const grade: AssignmentGrade = req.body as AssignmentGrade;
  const { weights, currentAverage } = student;

  const overallGrade = currentAverage + grade.grade * (weights.finalExamWeight / 100);
  const letterGrade: string = getLetterGrade(overallGrade);
  const gradeFinal: OverallGrade = { overallGrade, letterGrade };
  res.json(gradeFinal);
}
export default { getAllStudents, createStudent, getFinalExamScores, calcFinalScore };
