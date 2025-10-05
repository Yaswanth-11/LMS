import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin", "instructor"],
      default: "user",
    },
    isVerified: { type: Boolean, default: false },
    emailVerificationToken: { type: String },
    emailVerificationTokenExpires: { type: Date },
    college: { type: Schema.Types.ObjectId, ref: "College" },
    streak: { type: Number, default: 0 },
    totalPoints: { type: Number, default: 0 },
    completedChallengeIds: [{ type: Schema.Types.ObjectId, ref: "Challenge" }],
    // Add a reference to courses the user has registered for
    registeredCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  },
  { timestamps: true }
);

// Password hashing middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Password comparison method
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const UserCollection = mongoose.model("User", userSchema);
