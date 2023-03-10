import express, { Express } from 'express';
import { notImplemented } from './controllers/NotImplementedController';
import studentControllers from './controllers/studentControllers';

const app: Express = express();

const PORT = 3636;

// Enable JSON request body parsing
app.use(express.json());

app.post('/api/students', studentControllers.createStudent);
app.get('/api/students/:studentName', studentControllers.getAllStudents);
app.get('/api/students/:studentName/finalExam', studentControllers.getFinalExamScores);
app.post('/api/students/:studentName/finalExam', studentControllers.calcFinalScore);
app.post('/api/students/:studentName/grades/:assignmentName', studentControllers.updateGrade);

app.listen(PORT, () => {
  console.log(`Listening on port: http://localhost:${PORT}`);
});
