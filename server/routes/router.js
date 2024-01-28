const express = require("express");
const {
  createCourse,
  createStudent,
  createStudents,
  addCourse,
  marksEntry,
  getStudents,
  getStudent,
  createAdmin,
  login,
  resetPasswordMail,
  resetPassword,
  get3rdSemStudents,
} = require("../controllers/adminController");

const router = express.Router();

// router.post("/create/course", createCourse);
// router.post('/create/student', createStudent);
// router.get("/create", createStudents);
// router.get("/join", addCourse);

router.post("/marks", marksEntry);
router.post("/get", getStudents);
router.post("/getone", getStudent);
router.post("/create/admin", createAdmin);

router.post("/login", login);

router.post("/restetpassword", resetPasswordMail);

router.post("/reset/:token", resetPassword);

router.get("/getstudents/:sem", get3rdSemStudents);

module.exports = router;
