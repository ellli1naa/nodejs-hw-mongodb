import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import cookieParser from 'cookie-parser';
import router from './routers/index.js';
import { getEnvVar } from './utils/getEnvVar.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const PORT = Number(getEnvVar('PORT', '3000'));

export function setupServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    pinoHttp({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello!',
    });
  });

  app.use(router);

  app.get('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
