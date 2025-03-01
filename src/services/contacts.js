import { Contact } from "../models/contact.js";

export async function getAllContacts() {
  return Contact.find();
  // return {
  //   status: 200,
  //   message: "Successfully found contacts!",
  //   data: contacts
  // };
}

export async function getContactById(id) {
  return Contact.findById(id);
  // if (!contact) {
  //   return {
  //     status: 404,
  //     message: "Contact not found"
  //   };
  // }
  // return {
  //   status: 200,
  //   message: `Successfully found contact with id ${id}!`,
  //   data: contact
  // };
}
