import { Request, Response } from "npm:express@4.18.2";
import ContactoModel from "../db/contactos.ts";

const getContactos = async (req: Request, res: Response) => {
  try {
    const contactos = await ContactoModel.find().exec();
    if (!contactos) {
      res.status(404).send("Contactos not found");
    return;
    }

    const ContactoList = contactos.map((contacto) => ({
      name: contacto.name,
      dni: contacto.dni,
    }));

    res.status(200).send(ContactoList);
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default getContactos;