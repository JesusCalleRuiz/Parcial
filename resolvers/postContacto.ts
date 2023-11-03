import { Request, Response } from "npm:express@4.18.2";
import ContactoModel from "../db/contactos.ts";

const addContacto = async (req: Request, res: Response) => {
  try {
    const { name, dni,email,postalCode,iso} = req.body;
    if (!name || !dni|| !email|| !postalCode|| !iso) {
      res.status(400).send("Name, dni, email, postalCode and iso are required");
      return;
    }

    const alreadyExists = await ContactoModel.findOne({ dni }).exec();
    if (alreadyExists) {
      res.status(400).send("Contacto already exists");
      return;
    }

    const BASE_URL = "https://zip-api.eu/api/v1";
    const url = `${BASE_URL}/info/${iso}-${postalCode}`;
     const response = await fetch(url);
    if (response.status !== 200) {
        throw new Error("Cannot fetch location");
    }

    const data = await response.json();
    
    const newContacto = new ContactoModel({ name, dni, email,postalCode,iso});
    await newContacto.save();

    res.status(200).send({
      name: newContacto.name,
      dni: newContacto.dni,
      email: newContacto.email,
      postalCode: newContacto.postalCode,
      country: data.state,
      iso: newContacto.iso,
      id: newContacto._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addContacto;