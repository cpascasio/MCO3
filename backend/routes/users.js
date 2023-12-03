const express = require("express")

const { getUsers, createUser, loginUser, updateUserImage, updateUserDescription, get_singleUser, get_by_id } = require("../controllers/userController")

const router = express.Router()

const requireAuth = require("../middleware/requireAuth");


// GET all users
router.get("/", getUsers)

router.get("/:username", get_singleUser);

router.get("/id/:userID", get_by_id)

router.post("/register", createUser)

router.post("/login", loginUser)


router.use(requireAuth);

// POST a single user

router.post("/update_image", updateUserImage)

router.post("/update_description", updateUserDescription)
// DELETE a single user
router.delete("/:id", (req, res) => {
    res.json({ message: "DELETE a single user" })
})

// UPDATE a single user
router.patch("/:id", (req, res) => {
    res.json({ message: "UPDATE a single user" })
})

module.exports = router
