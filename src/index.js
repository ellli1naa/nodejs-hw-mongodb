import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from "./server.js";

export const boostrap = async () => {
  await initMongoConnection();
  setupServer();
};

boostrap();
