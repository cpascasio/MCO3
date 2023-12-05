const User = require("../models/userModels")
const Post = require("../models/postModel")
const Store = require("../models/storeModel")
const Comment = require("../models/commentModel");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");
const Schema = require("mongoose").Schema;

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({})
        return res.status(200).json(posts)
    } catch {
        console.log(e)
        return res.status(500).json({
            message: "Encountered an error!",
            state: "error",
        })
    }
}

const getAmountPosts = async (req, res) => {
    try {
        const numPosts = await Post.countDocuments({})
        const postPerPage = 9

        const amtPages = Math.ceil(numPosts / 9)
        return res.status(200).send({ numberPages: amtPages })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: "SERVER ERROR!",
            state: "error",
        })
    }
}

const searchPosts = async (req, res) => {
    try {
        const { keywords } = req.query

        if (!keywords) {
            return res
                .status(400)
                .json({ message: "no keywords found", state: "error" })
        }
        const arrayKeywords = keywords.split(" ")

        const pattern = arrayKeywords
            .map((keyword) => `(?=.*\\b${keyword}\\b)`)
            .join("")

        const posts = await Post.find({
            $or: [
                {
                    title: {
                        $regex: pattern,
                        $options: "i",
                    },
                    body: {
                        $regex: pattern,
                        $options: "i",
                    },
                },
            ],
        })

        const storeIDs = posts.map((post) => post.storeID)
        const posters = posts.map((post) => post.userID)
        const users = await User.find({
            _id: {
                $in: posters,
            },
        })
        const stores = await Store.find({
            _id: {
                $in: storeIDs,
            },
        })
        const newPosts = posts.map((post) => {
            const user = users.filter(
                (user) => user._id.toString() === post.userID
            )
            const store = stores.filter(
                (store) => store._id.toString() === post.storeID
            )
            const name = user[0].username
            const image = user[0].image
            const storeImage = store[0].icon
            const storeName = store[0].storeName

            const reviewImages = post.media
            const upvotes = post.helpful
            const downvotes = post.notHelpful
            return {
                ...post._doc,
                name,
                image,
                storeImage,
                storeName,
                reviewImages,
                downvotes,
                upvotes,
            }
        })
        return res.status(200).json(posts)
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: "SERVER ERROR!",
            state: "error",
        })
    }
}

const modifiedGetPosts = async (req, res) => {
    try {
        const { keywords } = req.query
        const page = req.query.page || 0
        const postPerPage = 9
        let posts
        if (keywords || keywords === "") {
            console.log(keywords)
            escapeRegExp = (text) => {
                return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
            }
            const arrayKeywords = keywords.split(" ")

            const pattern = arrayKeywords.map((keyword) => new RegExp(escapeRegExp(keyword), 'i'));

    console.log(pattern.map((pattern) => pattern.toString()));

    posts = await Post.find({
        $or: [
            {
                title: {
                    $regex: new RegExp(pattern.map(p => `(${p.source})`).join('|'), 'i'),
                },
            },
            {
                body: {
                    $regex: new RegExp(pattern.map(p => `(${p.source})`).join('|'), 'i'),
                },
            },
        ],
    })
    .sort({ title: -1 })
                .skip(page * postPerPage)
                .limit(postPerPage)

            console.log(posts)
        } else {
            posts = await Post.find({})
                .sort({ title: -1 })
                .skip(page * postPerPage)
                .limit(postPerPage)
        }
        const storeIDs = posts.map((post) => post.storeID)
        const posters = posts.map((post) => post.userID)
        const users = await User.find({
            _id: {
                $in: posters,
            },
        })
        const stores = await Store.find({
            _id: {
                $in: storeIDs,
            },
        })
        const newPosts = posts.map((post) => {
            const user = users.filter(
                (user) => user._id.toString() === post.userID
            )
            const store = stores.filter(
                (store) => store._id.toString() === post.storeID
            )
            const name = user[0].username
            const image = user[0].image
            const storeImage = store[0].icon
            const storeName = store[0].storeName

            const reviewImages = post.media
            const upvotes = post.helpful
            const downvotes = post.notHelpful
            const storeID = post.storeID
            const date = post.date
            return {
                ...post._doc,
                name,
                image,
                storeImage,
                storeName,
                reviewImages,
                downvotes,
                upvotes,
                date
            }
        })
        return res.status(200).json(newPosts)
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: "Encountered an error!",
            state: "error",
        })
    }
}

const getStorePosts = async (req, res) => {
    try {
        const { storeID } = req.params
        const posts = await Post.find({storeID});
        return res.status(200).json(posts);

    }catch{
        console.log(e);
    return res.status(500).json({
      message: "Encountered an error!",
      state: "error",
    });
    }
 
};


const updatePost = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("update post")
    console.log(req.body)

    const post = await Post.findOneAndUpdate({ _id: id }, { ...req.body, edited:true }, {
      new: true,
    });

    console.log(id);
    console.log(post);

    if (!post) {
      return res.status(404).json({ error: "This post does not exist!" });
    }

    console.log(post);
    res.status(200).json({
      message: "Review successfully updated!",
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

const createPost = async (req, res) => {
  try {
    const { userID, title, body, rating, storeID } = req.body;
    const fileExist = req.files
    console.log(req.body);
    let media = null;

    if (fileExist) {
      //upload photo
      const files = fileExist.img 
      const result = await cloudinary.uploader.upload(files.tempFilePath, {
        public_id: Date.now(),
        folder: "APDEV-IMAGES",
        crop: "fill",
        withcredentials: false,

    });

    media = result.secure_url;

    fs.unlink(files.tempFilePath, (err) => {
      if (err) {
        console.log("ERror deleting temp file");
      } else {
        console.log("File successfully deleted");
      }
    });
    }


    const post = await Post.create({
      userID,
      storeID,
      title,
      body,
      rating,
      media,
    });


    const compute = await Post.find({ storeID: storeID });

    const calculateAverageRating = (compute) => {
      if (!compute || compute.length === 0) {
        return 0; // Default to 0 if there are no reviews
      }
    
      const totalRating = compute.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalRating / compute.length;
    
      // only gets the whole number
      return Math.floor(averageRating);
    };

    const averageRating = calculateAverageRating(compute);

    console.log(averageRating);

    const store = await Store.findOneAndUpdate({ _id: storeID }, { rating: averageRating }, {
      new: true,

    });

        return res.status(200).json({
            message: "Posted successfully!",
            state: "success",
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: "Encountered an error!",
            state: "error",
        })
    }
}

// const getUserPosts = async (req, res) => {
//     try {
//         const { username } = req.params

//         const currentUser  = await User.findOne({ username: username })

//         console.log(currentUser);



//         const posts = await Post.find({ userID: currentUser._id })

//         console.log(posts)
//         return res.status(200).json(posts)
//     } catch (e){
//         console.log(e)
//         return res.status(500).json({
//             message: "Encountered an error!",
//             state: "error",
//         })
//     }
// }

const getUserPosts = async (req, res) => {
    try {
        const { username } = req.params;

        const currentUser  = await User.findOne({ username: username })

        const posts = await Post.find({ userID: currentUser._id });

        const postDetails = await Promise.all(
            posts.map(async (post) => {
                const store = await Store.findOne({ _id: post.storeID });
                const storeName = store ? store.storeName : 'Unknown Store';
                const storeImage = store ? store.icon : 'default-store-image-url';

                return {
                    ...post.toObject(),
                    storeName,
                    storeImage,
                };
            })
        );

        console.log(postDetails);
        return res.status(200).json(postDetails);
    } catch (e)  {
        console.log(e);
        return res.status(500).json({
            message: "Encountered an error!",
            state: "error",
        });
    }
};


const deletePost = async (req, res) => {
  try{
    const { id } = req.params

  const tempPost = await Post.findOne({ _id: id })
  console.log(tempPost)

  if (!tempPost) {
      return res.status(404).json({ error: 'This post does not exist' })
  }

  const comment = await Comment.deleteMany({ sourceID: id })
  console.log(comment)

  const post = await Post.findOneAndDelete({ _id: id })

  if (!post) {
      return res.status(404).json({ error: 'This post does not exist!' })
  }
  res.status(200).json(post)


  }catch(e){
    console.log(e);
    return res.status(500).json({
      message: "Encountered an error!",
      state: "error",
    });
  }
  
}

const upVotePost = async (req, res) => {
  try{
    const { reviewID, userID } = req.params

  const post = await Post.findOne({ _id: reviewID })
  console.log(post)

  if (!post) {
      return res.status(404).json({ error: 'This post does not exist' })
  }

  const upVote = await Post.findOneAndUpdate({ _id: reviewID }, { $inc: { helpful: 1 } }, {
      new: true,
  });

  if (!upVote) {
      return res.status(404).json({ error: 'This post does not exist!' })
  }

  const user = await User.findOneAndUpdate({ _id: userID }, { $push: { upvotes: reviewID } }, {
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

const undoUpvotePost = async (req, res) => {
  try{
    const { reviewID, userID } = req.params

  const post = await Post.findOne({ _id: reviewID })
  console.log(post)

  if (!post) {
      return res.status(404).json({ error: 'This post does not exist' })
  }

  const upVote = await Post.findOneAndUpdate({ _id: reviewID }, { $inc: { helpful: -1 } }, {
      new: true,
  });

  if (!upVote) {
      return res.status(404).json({ error: 'This post does not exist!' })
  }

  const user = await User.findOneAndUpdate({ _id: userID }, { $pull: { upvotes: reviewID } }, {
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

  
const downVotePost = async (req, res) => {
  try{
    const { reviewID, userID } = req.params

  const post = await Post.findOne({ _id: reviewID })
  console.log(post)

  if (!post) {
      return res.status(404).json({ error: 'This post does not exist' })
  }

  const downVote = await Post.findOneAndUpdate({ _id: reviewID }, { $inc: { notHelpful: 1 } }, {
      new: true,
  });

  if (!downVote) {
      return res.status(404).json({ error: 'This post does not exist!' })
  }

  const user = await User.findOneAndUpdate({ _id: userID }, { $push: { downvotes: reviewID } }, {
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

const undoDownvotePost = async (req, res) => {
  try{
    const { reviewID, userID } = req.params

  const post = await Post.findOne({ _id: reviewID })
  console.log(post)

  if (!post) {
      return res.status(404).json({ error: 'This post does not exist' })
  }

  const downVote = await Post.findOneAndUpdate({ _id: reviewID }, { $inc: { notHelpful: -1 } }, {
      new: true,
  });

  if (!downVote) {
      return res.status(404).json({ error: 'This post does not exist!' })
  }

  const user = await User.findOneAndUpdate({ _id: userID }, { $pull: { downvotes: reviewID } }, {
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


module.exports = { createPost, getPosts, getStorePosts, getUserPosts,
    modifiedGetPosts,
    getAmountPosts,
    searchPosts,updatePost, deletePost, upVotePost, undoUpvotePost, downVotePost, undoDownvotePost };
