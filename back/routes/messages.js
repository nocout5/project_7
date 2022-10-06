const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const messagesCtrl = require("../controllers/messages");

router.post("/", auth, messagesCtrl.createMessage);
router.get("/", auth, messagesCtrl.getAllMessages);
router.delete("/:id", auth, messagesCtrl.deleteMessage);
router.post("/:id/like", auth, messagesCtrl.likesMessage);

module.exports = router;
