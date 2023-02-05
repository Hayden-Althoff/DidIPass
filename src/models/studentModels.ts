
const students: StudentManager = {};

function calculateAverage(weights: CourseGrades): number {
  let totalWeights = 0;
    for (let i: number = 0; i < weights.assignmentWeights.length; i++){
      totalWeights = totalWeights + weights.assignmentWeights[i].weight;
    }
    totalWeights = totalWeights + weights.finalExamWeight;
    return totalWeights / (weights.assignmentWeights.length + 1);
}

function getStudentData(): Student{
  let studentFound: Boolean = false;
  let i: number = 0;
  // while (!studentFound){
  //   if(students[i].name != )
  // }

}

export { getStudentData };
