import mongoose from "mongoose";
const { Schema } = mongoose;

const moduleSchema = new Schema(
  {
    title: { type: String, required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    order: { type: Number, default: 0 },
    lessons: [{ type: Schema.Types.ObjectId, ref: "Lesson" }],
  },
  { timestamps: true }
);

moduleSchema.index({ course: 1, order: 1 });

export const ModuleCollection = mongoose.model("Module", moduleSchema);
