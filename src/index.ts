import express, {Express} from 'express';
import { notImplemented } from './controllers/NotImplementedController';
const app: Express = express();

const PORT = 3636;

app.post('/api/students', notImplemented);
app.get('/api/students', notImplemented);
app.get('/api/students/:studentName/finalExam', notImplemented);
app.post('/api/students/:studentname/finalExam', notImplemented);
app.post('/api/students/:studentname/grades/:assignmentName', notImplemented);

app.listen(PORT, () => {
  console.log(`Listening on port: http://localhost:${PORT}`);
})
