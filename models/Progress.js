import mongoose from "mongoose";

const Schema = mongoose.Schema;

const progressSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  lesson: { type: Schema.Types.ObjectId, ref: "Lesson", required: true },

  // progress data
  completed: { type: Boolean, default: false },
  completedAt: Date,

  // Could also track e.g. percent, time spent, attempts etc
  // percentWatched: Number,
  // attempts: Number,

  updatedAt: { type: Date, default: Date.now },
});

progressSchema.index({ user: 1, course: 1, lesson: 1 }, { unique: true });

export const ProgressCollection = mongoose.model("Progress", progressSchema);
