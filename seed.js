import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { UserCollection as User } from "./models/User.js";
import { College } from "./models/College.js";
import { CourseCollection as Course } from "./models/Course.js";
import { ModuleCollection as Module } from "./models/Module.js";
import { LessonCollection as Lesson } from "./models/Lesson.js";
import { EnrollmentCollection as Enrollment } from "./models/Enrollment.js";
import { Challenge, Story } from "./models/Challenge.js";
import { ProgressCollection as Progress } from "./models/Progress.js";

dotenv.config();

const mongoUri =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/techspark";

async function seed() {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected...");

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      College.deleteMany({}),
      Course.deleteMany({}),
      Module.deleteMany({}),
      Lesson.deleteMany({}),
      Enrollment.deleteMany({}),
      Challenge.deleteMany({}),
      Story.deleteMany({}),
      Progress.deleteMany({}),
    ]);

    console.log("🧹 Existing collections cleared.");

    // --- COLLEGES ---
    const college = await College.create({ name: "TechSpark University" });

    // --- USERS ---
    const instructorPwd = await bcrypt.hash("Instructor@123", 10);
    const userPwd = await bcrypt.hash("User@123", 10);

    const [instructor, student] = await User.create([
      {
        name: "John Instructor",
        email: "instructor@techspark.com",
        password: instructorPwd,
        role: "instructor",
        isVerified: true,
        college: college._id,
      },
      {
        name: "Alice Student",
        email: "student@techspark.com",
        password: userPwd,
        role: "user",
        isVerified: true,
        college: college._id,
      },
    ]);

    console.log("👨‍🏫 Users and College seeded.");

    // --- COURSES ---
    const course = await Course.create({
      title: "Full Stack Web Development",
      description: "Learn to build web apps using React, Node.js, and MongoDB.",
      category: "Web Development",
      price: 1499,
      duration: "8 weeks",
      level: "Intermediate",
      instructor: instructor._id,
      tags: ["javascript", "react", "node", "mongodb"],
      overview: {
        objectives: ["Build web apps", "Understand APIs", "Deploy to cloud"],
      },
      status: "published",
    });

    // --- MODULES ---
    const [module1, module2] = await Module.create([
      { title: "Frontend Basics", course: course._id, order: 1 },
      { title: "Backend APIs", course: course._id, order: 2 },
    ]);

    // --- LESSONS ---
    const [lesson1, lesson2, lesson3] = await Lesson.create([
      {
        title: "HTML & CSS Introduction",
        module: module1._id,
        contentType: "video",
        contentUrl: "https://example.com/html-css",
        duration: 30,
        order: 1,
      },
      {
        title: "JavaScript Fundamentals",
        module: module1._id,
        contentType: "content",
        contentText: "JavaScript is the backbone of dynamic web applications.",
        duration: 40,
        order: 2,
      },
      {
        title: "Building REST APIs with Express",
        module: module2._id,
        contentType: "video",
        contentUrl: "https://example.com/express-api",
        duration: 50,
        order: 1,
      },
    ]);

    // Attach lessons to modules
    module1.lessons = [lesson1._id, lesson2._id];
    module2.lessons = [lesson3._id];
    await module1.save();
    await module2.save();

    // Attach modules to course
    course.modules = [module1._id, module2._id];
    await course.save();

    console.log("📚 Course, Modules & Lessons seeded.");

    // --- ENROLLMENT ---
    const enrollment = await Enrollment.create({
      user: student._id,
      course: course._id,
      totalLessonsCount: 3,
      completedLessonsCount: 1,
      progress: [
        { lesson: lesson1._id, completed: true, completedAt: new Date() },
        { lesson: lesson2._id, completed: false },
        { lesson: lesson3._id, completed: false },
      ],
    });

    console.log("🎓 Enrollment seeded.");

    // --- CHALLENGES ---
    await Challenge.create([
      {
        title: "Find the Bug",
        description: "Debug a JavaScript snippet.",
        category: "debug",
        difficulty: "Medium",
        points: 50,
        date: new Date(),
        question: "What is wrong with this code snippet?",
        options: ["Syntax error", "Logical error", "Performance issue", "None"],
        correctAnswerIndex: 1,
        codeSnippet: "for (let i = 0; i <= 5; i--){ console.log(i); }",
        hint: "Check the loop condition.",
        explanation:
          "The loop never terminates because `i--` decreases instead of increasing.",
      },
    ]);

    // --- STORIES ---
    await Story.create([
      {
        title: "The Rise of AI in Software Development",
        summary: "How AI tools are transforming developer productivity.",
        type: "future",
        readTime: "5 min",
        date: "2025-10-01",
      },
    ]);

    console.log("💡 Challenges & Stories seeded.");

    console.log("✅ Seeding completed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error during seeding:", err);
    process.exit(1);
  }
}

seed();
