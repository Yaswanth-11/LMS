const enroll = async (req, res, next) => {
  try {
    const user = req.user;
    const { courseId } = req.body;

    // check course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // check existing enrollment
    const existing = await Enrollment.findOne({
      user: user.userId,
      course: courseId,
    });
    if (existing) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    const enrollment = await Enrollment.create({
      user: user.userId,
      course: courseId,
    });
    res.status(201).json(enrollment);
  } catch (err) {
    next(err);
  }
};

const getMyCourses = async (req, res, next) => {
  try {
    const user = req.user;
    // get enrollments and populate course data
    const enrollments = await Enrollment.find({ user: user.userId }).populate({
      path: "course",
      populate: { path: "instructor", select: "name email" },
    });
    // you might want to return course + enrollment info
    const result = enrollments.map((enr) => {
      return {
        enrollmentId: enr._id,
        course: enr.course,
        enrolledAt: enr.enrolledAt,
        status: enr.status,
        lastAccessedAt: enr.lastAccessedAt,
      };
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export default {
  enroll,
  getMyCourses,
};
