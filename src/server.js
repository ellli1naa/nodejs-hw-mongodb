import express from "express";
import cors from "cors";
import pino from "pino";
import pinoHttp from "pino-http";
import { getAllContacts, getContactById } from "./services/contacts.js";
import { getEnvVar } from "./utils/getEnvVar.js";

const logger = pino();

export function setupServer() {
  const app = express();
  const PORT = getEnvVar("PORT");

  app.use(cors());
  app.use(pinoHttp({ logger }));
  app.use(express.json());

  app.get("/contacts", async (req, res) => {
    const result = await getAllContacts();
    res.status(result.status).json(result);
  });

  app.get("/contacts/:contactId", async (req, res) => {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    res.status(result.status).json(result);
  });

  app.use((req, res) => {
    res.status(404).json({ message: "Not found" });
  });

  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
}
