import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';

import routes from './routes/index';
import * as middlewares from './middlewares';

dotenv.config();

const app: Application = express();

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use('/api/v1', routes);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;