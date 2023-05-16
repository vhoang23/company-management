var express = require("express");
var router = express.Router();
const auth = require("../auth/auth");
const DocumentController = require("../app/controllers/DocumentController");
const { uploadDocument } = require("../uploadModal/uploadModal");

router.get("/", auth, DocumentController.getAllDocument);
router.post(
  "/",
  auth,
  uploadDocument.single("document"),
  DocumentController.postDocument
);

router.delete("/:docId", auth, DocumentController.deleteDocument);

module.exports = router;
