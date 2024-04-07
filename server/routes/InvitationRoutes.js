const express = require("express");
const router = express.Router();
const { Sentinvitchat } = require("../controllers/InvitationController");
const { getInvitations } = require("../controllers/InvitationController");
const { RejectInvit } = require("../controllers/InvitationController");
const { AcceptInvit } = require("../controllers/InvitationController");
const { sendGroupInvitation } = require("../controllers/InvitationController");
const { AcceptInvitGroupe } = require("../controllers/InvitationController");

router.post("/get", getInvitations);
router.post("/accept", AcceptInvit);
router.post("/reject", RejectInvit);
router.post("/Sentinvi", Sentinvitchat);
router.post("/Sentinvigroup", sendGroupInvitation);
router.get("/AcceptInvGroupe", AcceptInvitGroupe);

module.exports = router;
