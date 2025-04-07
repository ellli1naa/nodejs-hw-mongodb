import createHttpError from 'http-errors';
import swaggerUI from 'swagger-ui-express';
import fs from 'node:fs';

import { SWAGGER_PATH } from '../constants/index.js';

export const swaggerConfig = async () => {
  try {
    const swaggerJSON = JSON.parse(
      (await fs.readFile(SWAGGER_PATH)).toString(),
    );

    return [...swaggerUI.serve, swaggerUI.setup(swaggerJSON)];
  } catch {
    return (_req, _res, next) => {
      next(createHttpError(500, "Can't load swagger docs"));
    };
  }
};
