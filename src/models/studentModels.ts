const students: StudentManager = {};

function calculateAverage(weights: CourseGrades): number {
  let totalWeights = 0;
  for (let i: number = 0; i < weights.assignmentWeights.length; i++) {
    totalWeights +=
      (weights.assignmentWeights[i].weight / 100) * weights.assignmentWeights[i].grade;
  }
  return totalWeights / weights.assignmentWeights.length;
}

function getStudentData(studentName: string): Student | undefined {
  if (studentName in students) {
    return students[studentName];
  }

  return undefined;
}

function addStudent(newStudentData: NewStudentRequest): boolean {
  // Destructure the name and weights
  const { name, weights } = newStudentData;

  if (name in students) {
    return false;
  }

  const currentAverage: number = calculateAverage(newStudentData.weights); // Calculate the student's current average (use the function previously defined)

  const newStudent: Student = { name, weights, currentAverage }; // Create a `Student` object using the `name`, `weights` and `currentAverage`

  students[name] = newStudent; // Add the new Student to the `students` object. The student's name is the key

  return true; // Finally, return true since the student was added
}

function calculateFinalExamScores( // Prettier code formatted it this way
  currentAverage: number,
  finalExamWeight: number,
  targetScore: number
): number {
  const finalWeightPercent: number = finalExamWeight / 100;
  const averageWeightPercent: number = 1 - finalWeightPercent;
  const weightedCurrent: number = averageWeightPercent * currentAverage;
  const finalPercentNeeded: number = (targetScore - weightedCurrent) / finalExamWeight;
  return finalPercentNeeded;
}

function getStudent(studentName: string): Student | undefined {
  if (!(studentName in students)) {
    return undefined; // student name not in dataset
  }

  // Student in dataset
  return students[studentName];
}

function getLetterGrade(score: number): string {
  if (score >= 90) {
    return 'A';
  }
  if (score < 90 && score >= 80) {
    return 'B';
  }
  if (score < 80 && score >= 70) {
    return 'C';
  }
  if (score < 70 && score >= 60) {
    return 'D';
  }
  return 'F';
}

function updateStudentGrade(
  studentName: string,
  assignmentName: string,
  newGrade: number
): boolean {
  const student = getStudentData(studentName);

  if (!student) {
    return false;
  }
  const assignment = student.weights.assignmentWeights.find(
    (element) => element.name === assignmentName
  );
  if (!assignment) {
    return false;
  }
  assignment.grade = newGrade;
  student.currentAverage = calculateAverage(student.weights);
  return true;
}

export {
  students,
  getStudentData,
  addStudent,
  calculateFinalExamScores,
  getStudent,
  getLetterGrade,
  updateStudentGrade,
};
