// userRoutes.js
/*const express = require('express');
const router = express.Router();
const { getUsers } = require('../controllers/userController');

router.get('/users', getUsers);

module.exports = router;*/
// userRoutes.js
const express = require("express");
const router = express.Router();
const { getUsers } = require("../controllers/userController");
const { createUser } = require("../controllers/userController");

const { SignInUser } = require("../controllers/userController");
const { signOut } = require("../controllers/userController");
const { DeleteUser } = require("../controllers/userController");

router.get("/get", getUsers);
router.post("/Create", createUser);
router.post("/Signin", SignInUser);
router.post("/Signout", signOut);
router.post("/Delete", DeleteUser);

module.exports = router;
