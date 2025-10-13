import mongoose from "mongoose";

const Schema = mongoose.Schema;

const enrollmentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  enrolledAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["in-progress", "completed", "cancelled"],
    default: "in-progress",
  },

  // maybe snapshot of some course info to avoid always fetching course title etc
  // courseTitle: String,
  // instructorName: String,

  lastAccessedAt: Date,
});

enrollmentSchema.index({ user: 1, course: 1 }, { unique: true });
// ensures one enrollment per user per course

export const EnrollmentCollection = mongoose.model(
  "Enrollment",
  enrollmentSchema
);
