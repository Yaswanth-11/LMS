import mongoose from "mongoose";

const Schema = mongoose.Schema;

const challengeSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["debug", "theory", "career", "logic", "coding"],
    },
    difficulty: {
      type: String,
      required: true,
      enum: ["Easy", "Medium", "Hard"],
    },
    points: { type: Number, required: true },
    date: { type: Date, required: true, unique: true },
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswerIndex: { type: Number, required: true },
    codeSnippet: { type: String },
    language: { type: String, default: "javascript" },
    hint: { type: String },
    explanation: { type: String },
  },
  { timestamps: true }
);

// Tech Story Schema
const storySchema = new Schema(
  {
    title: { type: String, required: true },
    summary: { type: String, required: true },
    type: { type: String, enum: ["past", "future"], required: true },
    readTime: { type: String, required: true },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

export const Challenge = mongoose.model("Challenge", challengeSchema);
export const Story = mongoose.model("Story", storySchema);
