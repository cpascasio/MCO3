const User = require("../models/userModels");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

const getComments = async (req, res) => {
    try{
        const comments = await Comment.find({});
        return res.status(200).json(comments);

    }catch{
        console.log(e);
    return res.status(500).json({
      message: "Encountered an error!",
      state: "error",
    });
    }
 
};



const getReviewComments = async (req, res) => {
    try{
        const { sourceID } = req.params
        const comments = await Comment.find({sourceID : sourceID});
        return res.status(200).json(comments);

    }catch{
        console.log(e);
    return res.status(500).json({
      message: "Encountered an error!",
      state: "error",
    });
    }
 
};

const createComment = async (req, res) => {
  try {

    const { userID, title, body, sourceID} = req.body;
    
    console.log(req.body);
    
    const comment = await Comment.create({
      userID,
      title,
      body,
      sourceID,
    });

    return res.status(200).json({
      message: "Posted successfully!",
      state: "success",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Encountered an error!",
      state: "error",
    });
  }
};

const updateComment = async (req, res) => {
    try {
      const { id } = req.params;
  
      console.log("update comment")
      console.log(req.body)
  
      const comment = await Comment.findOneAndUpdate({ _id: id }, { ...req.body, edited:true }, {
        new: true,
      });
  
      console.log(id);
      console.log(comment);
  
      if (!comment) {
        return res.status(404).json({ error: "This comment does not exist!" });
      }
  
      console.log(comment);
      res.status(200).json({
        message: "Comment successfully updated!",
        status: "success",
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Server Error!",
        statue: "error",
      });
    }
  };



  const deleteComment = async (req, res) => {
    try{
      const { id } = req.params;

    const comment = await Comment.findOneAndDelete({ _id: id })
    
    if (!comment) {
        return res.status(404).json({ error: 'This comment does not exist!' })
    }
    res.status(200).json(comment)
  
    }catch(e){
      console.log(e);
      return res.status(500).json({
        message: "Encountered an error!",
        state: "error",
      });
    }
    
  }

  const upVoteComment = async (req, res) => {
    try{
      const { commentID, userID } = req.params
  
    const post = await Comment.findOne({ _id: commentID })
    console.log(post)
  
    if (!post) {
        return res.status(404).json({ error: 'This post does not exist' })
    }
  
    const upVote = await Comment.findOneAndUpdate({ _id: commentID }, { $inc: { helpful: 1 } }, {
        new: true,
    });
  
    if (!upVote) {
        return res.status(404).json({ error: 'This post does not exist!' })
    }
  
    const user = await User.findOneAndUpdate({ _id: userID }, { $push: { upvotes: commentID } }, {
        new: true,
    });
    
  
    console.log(upVote)
  
    res.status(200).json({
      message: "Upvoted successfully!",
        state: "success",
    })
  
    }catch(e){
      console.log(e);
      return res.status(500).json({
        message: "Encountered an error!",
        state: "error",
      });
    }
    
  }
  
  const undoUpvoteComment = async (req, res) => {
    try{
      const { commentID, userID } = req.params
  
    const post = await Comment.findOne({ _id: commentID })
    console.log(post)
  
    if (!post) {
        return res.status(404).json({ error: 'This post does not exist' })
    }
  
    const upVote = await Comment.findOneAndUpdate({ _id: commentID }, { $inc: { helpful: -1 } }, {
        new: true,
    });
  
    if (!upVote) {
        return res.status(404).json({ error: 'This post does not exist!' })
    }
  
    const user = await User.findOneAndUpdate({ _id: userID }, { $pull: { upvotes: commentID } }, {
        new: true,
    });
    
  
    console.log(upVote)
  
    res.status(200).json({
      message: "Undoed upvote successfully!",
        state: "success",
    })
  
    }catch(e){
      console.log(e);
      return res.status(500).json({
        message: "Encountered an error!",
        state: "error",
      });
    }
  
  }
  
    
  const downVoteComment = async (req, res) => {
    try{
      const { commentID, userID } = req.params
  
    const post = await Comment.findOne({ _id: commentID })
    console.log(post)
  
    if (!post) {
        return res.status(404).json({ error: 'This post does not exist' })
    }
  
    const downVote = await Comment.findOneAndUpdate({ _id: commentID }, { $inc: { notHelpful: 1 } }, {
        new: true,
    });
  
    if (!downVote) {
        return res.status(404).json({ error: 'This post does not exist!' })
    }
  
    const user = await User.findOneAndUpdate({ _id: userID }, { $push: { downvotes: commentID } }, {
        new: true,
    });
    
  
    console.log(downVote)
  
    res.status(200).json({
      message: "Downvoted successfully!",
        state: "success",
    })
  
    }catch(e){
      console.log(e);
      return res.status(500).json({
        message: "Encountered an error!",
        state: "error",
      });
    }
    
  }
  
  const undoDownvoteComment = async (req, res) => {
    try{
      const { commentID, userID } = req.params
  
    const post = await Comment.findOne({ _id: commentID })
    console.log(post)
  
    if (!post) {
        return res.status(404).json({ error: 'This post does not exist' })
    }
  
    const downVote = await Comment.findOneAndUpdate({ _id: commentID }, { $inc: { notHelpful: -1 } }, {
        new: true,
    });
  
    if (!downVote) {
        return res.status(404).json({ error: 'This post does not exist!' })
    }
  
    const user = await User.findOneAndUpdate({ _id: userID }, { $pull: { downvotes: commentID } }, {
        new: true,
    });
  
    console.log(downVote)
  
    res.status(200).json({
      message: "Undoed downvote successfully!",
        state: "success",
    })
  
    }catch(e){
      console.log(e);
      return res.status(500).json({
        message: "Encountered an error!",
        state: "error",
      });
    }
  
  }


module.exports = { createComment, getComments, getReviewComments, updateComment, deleteComment, upVoteComment, undoUpvoteComment, downVoteComment, undoDownvoteComment };
