export const markLessonComplete = async (req, res, next) => {
  try {
    const user = req.user;
    const { courseId, lessonId } = req.body;

    // ensure user is enrolled
    const enrollment = await Enrollment.findOne({
      user: user.userId,
      course: courseId,
    });
    if (!enrollment) {
      return res
        .status(400)
        .json({ message: "User not enrolled in the course" });
    }

    // optionally ensure the lesson is part of that course
    const lesson = await Lesson.findOne({ _id: lessonId, course: courseId });
    if (!lesson) {
      return res
        .status(400)
        .json({ message: "Lesson not found in this course" });
    }

    const progress = await Progress.findOneAndUpdate(
      { user: user.userId, course: courseId, lesson: lessonId },
      { completed: true, completedAt: new Date(), updatedAt: new Date() },
      { upsert: true, new: true }
    );

    res.json(progress);
  } catch (err) {
    next(err);
  }
};

export const getCourseProgress = async (req, res, next) => {
  try {
    const user = req.user;
    const { courseId } = req.params;

    // ensure enrollment exists
    const enrollment = await Enrollment.findOne({
      user: user.userId,
      course: courseId,
    });
    if (!enrollment) {
      return res
        .status(400)
        .json({ message: "User not enrolled in the course" });
    }

    // fetch all lessons for that course
    const lessons = await Lesson.find({ course: courseId }).sort("order");

    // fetch progress entries for this user+course
    const progresses = await Progress.find({
      user: user.userId,
      course: courseId,
    });

    // map progress by lessonId
    const progMap = new Map();
    progresses.forEach((p) => {
      progMap.set(p.lesson.toString(), p);
    });

    // build result list
    const result = lessons.map((les) => {
      const p = progMap.get(les._id.toString());
      return {
        lessonId: les._id,
        title: les.title,
        completed: p ? p.completed : false,
        completedAt: p ? p.completedAt : null,
      };
    });

    res.json({
      courseId,
      lessons: result,
    });
  } catch (err) {
    next(err);
  }
};
