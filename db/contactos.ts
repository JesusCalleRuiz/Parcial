import mongoose from "npm:mongoose@7.6.3";
import { Contacto } from "../types.ts";

const Schema = mongoose.Schema;

const contactosSchema = new Schema(
  {
    name: { type: String, required: true },
    dni:{ type: String, required: true,unique: true },
    email:{type: String, required: true},
    postalCode:{type: Number, required: true},
    country:{type: String, required: false},
    hour:{type: String, required: false},
    climate:{type: String, required: false},
    iso:{type: String, required: true},
  },
  { timestamps: true }
);

export type contactoModelType = mongoose.Document & Omit<Contacto, "id">;

export default mongoose.model<contactoModelType>("Contacto", contactosSchema);
