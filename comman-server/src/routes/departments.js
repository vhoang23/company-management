var express = require("express");
var router = express.Router();
const auth = require("../auth/auth");

const DepartmentController = require("../app/controllers/DepartmentController");

router.get("/", auth, DepartmentController.getAllDepartment);

module.exports = router;
