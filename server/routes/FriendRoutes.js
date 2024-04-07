const express = require('express');
const router = express.Router();
const { DeleteFriend } = require('../controllers/FriendController');
const { UpdateFriend } = require('../controllers/FriendController');
const { AddFriend } = require('../controllers/FriendController');
const { getlistfriends } = require('../controllers/FriendController');



router.get('/get', getlistfriends);
router.get('/update', UpdateFriend);
router.get('/delete', DeleteFriend);
router.get('/Add', AddFriend);



module.exports = router;
