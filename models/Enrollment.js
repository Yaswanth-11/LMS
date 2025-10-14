import mongoose from "mongoose";
const { Schema } = mongoose;

const progressSchema = new Schema(
  {
    lesson: { type: Schema.Types.ObjectId, ref: "Lesson", required: true },
    completed: { type: Boolean, default: false },
    completedAt: { type: Date },
  },
  { _id: false }
);

const enrollmentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    enrolledAt: { type: Date, default: Date.now },

    // Optional metadata
    status: {
      type: String,
      enum: ["in_progress", "completed", "dropped"],
      default: "in_progress",
    },

    progress: [progressSchema],

    // Derived / helper fields
    completedLessonsCount: { type: Number, default: 0 },
    totalLessonsCount: { type: Number, default: 0 },
    completionPercentage: { type: Number, default: 0 },

    // Certificate, feedback, etc. can be added later
  },
  { timestamps: true }
);

// Prevent duplicate enrollments per course-user pair
enrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

// Auto-calculate completion percentage
enrollmentSchema.pre("save", function (next) {
  if (this.totalLessonsCount > 0) {
    this.completionPercentage = Math.round(
      (this.completedLessonsCount / this.totalLessonsCount) * 100
    );
  } else {
    this.completionPercentage = 0;
  }
  next();
});

export const EnrollmentCollection = mongoose.model(
  "Enrollment",
  enrollmentSchema
);
