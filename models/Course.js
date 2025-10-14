import mongoose from "mongoose";

const { Schema } = mongoose;

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 120,
    },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true, default: 0, min: 0 },
    duration: { type: String, required: true },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    instructor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    thumbnail: { type: String, default: "default-thumbnail.jpg" },

    tags: [{ type: String }],
    learnersCount: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["draft", "under_review", "published"],
      default: "draft",
    },

    // Soft delete + rating system
    isArchived: { type: Boolean, default: false, index: true },
    averageRating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },

    overview: { objectives: [String] },

    // Store module references (for quick lookup)
    modules: [{ type: Schema.Types.ObjectId, ref: "Module" }],
  },
  { timestamps: true }
);

// Indexes for optimized queries
courseSchema.index({ title: "text", description: "text" });
courseSchema.index({ category: 1, price: 1, level: 1, isArchived: 1 });

export const CourseCollection = mongoose.model("Course", courseSchema);
