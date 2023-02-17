type CourseGrade = {
  name: string;
  weight: number;
  grade: number;
};

type CourseGrades = {
  assignmentWeights: Array<CourseGrade>;
  finalExamWeight: number;
};

type Student = {
  name: string;
  weights: CourseGrades;
  currentAverage: number;
};

type AssignmentGrade = {
  grade: number;
};

type FinalGrade = {
  overallScore: number;
  letterGrade: string;
};

type FinalExamScores = {
  needForA: number;
  needForB: number;
  needForC: number;
  needForD: number;
};

type StudentManager = Record<string, Student>;

type NewStudentRequest = {
  name: string;
  weights: CourseGrades;
};

type StudentNameParam = {
  studentName: string;
};

type gradesNeeded = {
  A: number;
  B: number;
  C: number;
  D: number;
};

type OverallGrade = {
  overallGrade: number;
  letterGrade: string;
};

type StudentGradeParams = {
  studentName: string;
  assignmentName: string;
};
