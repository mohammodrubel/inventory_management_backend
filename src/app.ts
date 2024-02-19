import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './global/global_router';
import cookieParser from 'cookie-parser';
import globalError from './error/GLOBAL_ERROR';


const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 200,
    message: "inventory management typescripty for backend and frontend react js..."
  });
});

app.use('/api/v1', router);
app.use(globalError);

export default app;