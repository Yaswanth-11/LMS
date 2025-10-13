import mongoose from "mongoose";

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: { type: String, required: true, trim: true },
  description: String,

  // Instructor reference
  instructor: { type: Schema.Types.ObjectId, ref: "User", required: true },

  // optional metadata
  category: String,
  tags: [{ type: String }],

  thumbnailUrl: String,
  price: { type: Number, default: 0 },
  published: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

courseSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export const CourseCollection = mongoose.model("Course", courseSchema);
