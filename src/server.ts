import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import './database';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(8080, () => {
  console.log('✨ Server is running');
});
