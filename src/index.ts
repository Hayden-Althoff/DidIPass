import express, {Express} from 'express';
import { notImplemented } from './controllers/NotImplementedController';
import studentControllers from './controllers/studentControllers';
const app: Express = express();

const PORT = 3636;

app.post('/api/students', notImplemented);
app.get('/api/students/:studentName', studentControllers.getAllStudents);
app.get('/api/students/:studentName/finalExam', notImplemented);
app.post('/api/students/:studentname/finalExam', notImplemented);
app.post('/api/students/:studentname/grades/:assignmentName', notImplemented);

app.listen(PORT, () => {
  console.log(`Listening on port: http://localhost:${PORT}`);
})
