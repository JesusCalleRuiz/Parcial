import { Request, Response } from "npm:express@4.18.2";
import ContactoModel from "../db/contactos.ts";

const getContacto = async (req: Request, res: Response) => {
  try {
    const { dni} = req.params;
    const contacto = await ContactoModel.findOne({ dni }).exec();
    if (!contacto) {
      res.status(404).send("contacto not found");
      return;
    }

    res.status(200).send({
      dni: contacto.dni,
      name: contacto.name,
      email: contacto.email,
      postalCode: contacto.postalCode,
      iso: contacto.iso,
      id: contacto._id.toString(),
      //hour: 
      //climate:
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default getContacto;
