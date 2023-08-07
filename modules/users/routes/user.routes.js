const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
    getAllUsers,
    signUp,
    signIn,
    getUser,
    deleteUser,
    updateUser,
    removeReceived,
} = require("../controller/user.controller");

const validateRequest = require("../../../common/middleware/validateRequest");
const isAutoraized = require("../../../common/middleware/isAuthorized");
const { addUserSchema, signInSchema, UpdateUserSchema } = require("../joi/userValidation");
const uploads = require("../../../common/middleware/multer");
const {
    GET_ALL_USERS,
    GET_USER,
    SIGNUP,
    UPDATE_USER,
    DELETE_USER,
    SIGNIN,
    REMOVERECEIVED,
} = require("../endPoints");


// Start end Points

router.get(GET_ALL_USERS, isAutoraized(GET_ALL_USERS), getAllUsers);
router.get(GET_USER, isAutoraized(GET_USER), getUser);
router.post(
  SIGNUP,
  uploads.single("avatar"),
  validateRequest(addUserSchema),
  signUp
);
router.get(SIGNIN, validateRequest(signInSchema), signIn);
router.delete(DELETE_USER, isAutoraized(DELETE_USER), deleteUser);
router.delete(REMOVERECEIVED, isAutoraized(REMOVERECEIVED), removeReceived);
router.patch(
  UPDATE_USER,
  uploads.single("avatar"),
  isAutoraized(UPDATE_USER),
  validateRequest(UpdateUserSchema),
  updateUser
);

module.exports = router;


