const express = require("express")

const {  getStores, get_singleStore, createStore } = require("../controllers/storeController")

const router = express.Router()


const requireAuth = require("../middleware/requireAuth");


router.get("/", getStores);

router.get("/:id", get_singleStore);

router.use(requireAuth);

router.post("/create_store", createStore)

router.delete("/:id", (req, res) => {
    res.json({ message: "DELETE a single user" })
})

router.patch("/:id", (req, res) => {
    res.json({ message: "UPDATE a single user" })
})

module.exports = router
