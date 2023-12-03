const express = require("express")
const postRouter = express.Router()
const {
    createPost,
    getPosts,
    getStorePosts,
    getUserPosts,
    modifiedGetPosts,
    getAmountPosts,
    searchPosts,
    updatePost,
    deletePost,
    upVotePost,
    undoUpvotePost,
    downVotePost,
    undoDownvotePost
} = require("../controllers/postController");

const requireAuth = require("../middleware/requireAuth");

postRouter.get("/get_posts", getPosts)

postRouter.get("/get_modified_posts", modifiedGetPosts)

postRouter.get("/get_store_posts/:storeID", getStorePosts)

postRouter.get("/get_user_posts/:username", getUserPosts)

postRouter.get("/get_amount_pages", getAmountPosts)

postRouter.get("/search", searchPosts)

postRouter.use(requireAuth);

postRouter.post("/create_post", createPost)

postRouter.patch("/update_post/:id", updatePost);

postRouter.delete("/delete_post/:id", deletePost);

postRouter.patch("/upvote_post/:reviewID/:userID", upVotePost);

postRouter.patch("/undo_upvote_post/:reviewID/:userID", undoUpvotePost);

postRouter.patch("/downvote_post/:reviewID/:userID", downVotePost);

postRouter.patch("/undo_downvote_post/:reviewID/:userID", undoDownvotePost);

module.exports = postRouter;
