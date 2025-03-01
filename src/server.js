import express from "express";
import cors from "cors";
import pino from "pino";
import pinoHttp from "pino-http";
import { getAllContacts, getContactById } from "./services/contacts.js";
import { getEnvVar } from "./utils/getEnvVar.js";

const PORT = Number(getEnvVar('PORT', '3000'));

export function setupServer() {
  const app = express();
  
  app.use(cors());
  app.use(express.json());
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

  app.get("/contacts", async (req, res) => {
    const result = await getAllContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts',
      data: contacts,
    });
  });

  app.get("/contacts/:contactId", async (req, res) => {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) {
        return res.status(404).json({
          status: 404,
          message: 'Contact not found',
        });
      }

      res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}`,
        data: contact,
      });
    } catch (error) {
      console.log(error);
    }
  });

  app.get('*', (req, res) => {
    res.status(404).json({
      status: 404,
      message: 'Unavailable',
   });

    app.use((err, req, res, next) => {
      res.status(500).json({
        status: 500,
        message: 'Something went wrong',
        error: err.message,
      });
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
