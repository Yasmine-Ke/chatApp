const express = require("express");
const router = express.Router();
const { DeleteMessage } = require("../controllers/MessageController");
const { UpdateMesssage } = require("../controllers/MessageController");

const { getMessage } = require("../controllers/MessageController");
const { Addmessage } = require("../controllers/MessageController");

router.post("/get", getMessage);
router.post("/update", UpdateMesssage);
router.post("/delete", DeleteMessage);
router.post("/Add", Addmessage);

module.exports = router;
