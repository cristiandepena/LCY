const express = require("express");
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require("../controllers/users");

const router = express.Router();

router.get("/", getUsers);
router.get("/:UserId", getUserById);
router.post("/", createUser);
router.patch("/:UserId", updateUser);
router.delete("/:UserId", deleteUser);

module.exports = router;