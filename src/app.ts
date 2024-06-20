import express from 'express';
import bodyParser from 'body-parser';
import submissionRoutes from './routes/submissionRoutes';
import connectDB from './services/db';

const app = express();
app.use(bodyParser.json());

connectDB();

app.use('/', submissionRoutes);

export default app;
