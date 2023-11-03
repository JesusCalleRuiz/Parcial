import { Request, Response } from "npm:express@4.18.2";
import ContactoModel from "../db/contactos.ts";

const updateContacto = async (req: Request, res: Response) => {
  try {
    const { dni } = req.params;
    const { name,email,postalCode,iso} = req.body;

    const updatedContacto = await ContactoModel.findOneAndUpdate(
      { dni },
      { name, email,postalCode,iso},
      { new: true }
    ).exec();

    if (!updateContacto) {
      res.status(404).send("Person not found");
      return;
    }

    res.status(200).send({
      name: updatedContacto.name,
      email: updatedContacto.age,
      dni: updatedContacto.dni,
      postalCode: updatedContacto.postalCode,
      iso: upatedContacto.iso,
      id: updatedConatcto._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default updateContacto;
