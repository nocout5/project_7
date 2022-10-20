const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer_config");

const messagesCtrl = require("../controllers/messages");

router.post("/", auth, multer, messagesCtrl.createMessage);
router.get("/", auth, messagesCtrl.getAllMessages);
router.delete("/:id", auth, messagesCtrl.deleteMessage);
router.post("/:id/like", auth, messagesCtrl.likesMessage);
router.put("/:id", auth, multer, messagesCtrl.updateMessage);

module.exports = router;
