import mongoose from "mongoose";
const { Schema } = mongoose;

const lessonSchema = new Schema(
  {
    title: { type: String, required: true },
    module: { type: Schema.Types.ObjectId, ref: "Module", required: true },
    contentType: {
      type: String,
      enum: ["video", "quiz", "assignment", "content"],
      default: "content",
    },
    contentUrl: { type: String },
    contentText: { type: String },
    order: { type: Number, default: 0 },
    duration: { type: Number, default: 0 },
    quiz: [
      {
        question: String,
        options: [String],
        correctAnswerIndex: Number,
      },
    ],
  },
  { timestamps: true }
);

lessonSchema.index({ module: 1, order: 1 });

export const LessonCollection = mongoose.model("Lesson", lessonSchema);
