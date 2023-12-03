const express = require("express");
const { createComment, getComments, getReviewComments, updateComment, deleteComment, upVoteComment, undoUpvoteComment, downVoteComment, undoDownvoteComment } = require("../controllers/commentController");
const commentRouter = express.Router();
const requireAuth = require("../middleware/requireAuth");



commentRouter.get("/get_comments", getComments);

commentRouter.get("/get_review_comments/:sourceID", getReviewComments);

commentRouter.use(requireAuth);

commentRouter.post("/create_comment", createComment);

commentRouter.patch("/update_comment/:id", updateComment);

commentRouter.delete("/delete_comment/:id", deleteComment);

commentRouter.patch("/upvote_comment/:commentID/:userID", upVoteComment);

commentRouter.patch("/undo_upvote_comment/:commentID/:userID", undoUpvoteComment);

commentRouter.patch("/downvote_comment/:commentID/:userID", downVoteComment);

commentRouter.patch("/undo_downvote_comment/:commentID/:userID", undoDownvoteComment);

module.exports = commentRouter;

