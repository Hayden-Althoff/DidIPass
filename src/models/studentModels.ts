
const students: StudentManager = {};

function calculateAverage(weights: CourseGrades): number {
  let totalWeights = 0;
    for (let i: number = 0; i < weights.assignmentWeights.length; i++){
      totalWeights = totalWeights + ((weights.assignmentWeights[i].weight / 100) * weights.assignmentWeights[i].grade);
    }
    return totalWeights / (weights.assignmentWeights.length);
}

function getStudentData(studentName: string): Student | undefined{
  if(studentName in students){
    return students[studentName];
  }

return undefined;
}

function addStudent(newStudentData: NewStudentRequest): Boolean {
  // Destructure the name and weights
  const { name, weights } = newStudentData;

  if (name in students){
    return false;
  }


  let currentAverage: number = calculateAverage(newStudentData.weights)// Calculate the student's current average (use the function previously defined)

  const newStudent: Student =  { name, weights, currentAverage}; // Create a `Student` object using the `name`, `weights` and `currentAverage`


  students[name] = newStudent;// Add the new Student to the `students` object. The student's name is the key

  return true;// Finally, return true since the student was added
}

export { students, getStudentData, addStudent};
