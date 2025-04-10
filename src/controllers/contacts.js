import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const { sortBy, sortOrder } = parseSortParams(req.query);

  const result = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    userId: req.user._id,
  });
  res.json({
    status: 200,
    message: 'Successfully found contacts',
    data: result,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById({
    _id: req.params.contactId,
    userId: req.user._id,
  });

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const userId = req.user._id;
  const data = {
    ...req.body,
  };

  const photo = req.file;
  if (photo) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      data.photo = await saveFileToCloudinary(photo);
    } else {
      data.photo = await saveFileToUploadDir(photo);
    }
  }
  const contact = await createContact(data, userId);

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const data = { ...req.body };
  const photo = req.file;

  if (photo) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      data.photo = await saveFileToCloudinary(photo);
    } else {
      data.photo = await saveFileToUploadDir(photo);
    }
  }
  const result = await updateContact(contactId, data, userId);

  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const contact = await deleteContact(contactId, userId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};
