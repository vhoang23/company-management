var express = require("express");
var router = express.Router();
const auth = require("../auth/auth");

const EmployeeController = require("../app/controllers/EmployeeController");
const { uploadUserAvatar } = require("../uploadModal/uploadModal");

router.get("/", EmployeeController.getAllEmployee);
router.get("/managers", auth, EmployeeController.getAllManager);
router.get(
  "/by-department/:depId",
  auth,
  EmployeeController.getEmployeeByDepartment
);
router.get("/:empId", auth, EmployeeController.getEmployeeInfo);
router.post(
  "/",
  auth,
  uploadUserAvatar.single("userAvatar"),
  EmployeeController.postEmployee
);

router.put(
  "/:empId",
  auth,
  uploadUserAvatar.single("userAvatar"),
  EmployeeController.updateEmployee
);

router.put(
  "/personal-profile/:empId",
  auth,
  uploadUserAvatar.single("userAvatar"),
  EmployeeController.updatePersonalProfile
);

router.delete("/:empId", auth, EmployeeController.deleteEmployee);

module.exports = router;
