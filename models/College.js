import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CollegeSchema = new Schema({
  name: { type: String, required: true },
});

export const College = mongoose.model("College", CollegeSchema);
