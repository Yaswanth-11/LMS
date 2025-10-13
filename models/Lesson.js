import mongoose from "mongoose";

const Schema = mongoose.Schema;

const lessonSchema = new Schema({
  course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  title: { type: String, required: true, trim: true },
  contentType: {
    type: String,
    enum: ["video", "text", "quiz", "other"],
    default: "text",
  },
  contentUrl: String, // for video or external content
  contentText: String, // for text content, if needed
  order: { type: Number, default: 0 }, // to sort lessons in a course
  duration: Number, // in seconds or minutes, if video etc

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

lessonSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export const LessonCollection = mongoose.model("Lesson", lessonSchema);
