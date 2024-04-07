const express = require("express");
const router = express.Router();

const { getChats } = require("../controllers/ChatController");

router.post("/get", getChats);
// router.post('/update', UpdateMesssage);
// router.post('/delete', DeleteMessage);
// router.post('/Add', Addmessage);

module.exports = router;
