const User = require("../models/userModels");
const Post = require("../models/postModel");
const mongoose = require("mongoose");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const { error } = require("console");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "21d",
  });
}


const createTokenOneDay = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
}

const getTokenExpirationDate = (token) => {
  const decoded = jwt.decode(token);
  if (!decoded.exp) {
    return null;
  }
  return new Date(decoded.exp * 1000);

}


const refreshTokens = async (req, res) => {

  const refreshToken = req.body.refreshToken;
  try{

  const decoded = jwt.decode(refreshToken);

  if (!decoded.exp) {
    return null;
  }
  const user = await User.findOne({ _id: decoded._id });
  if (!user) {
    return null;
  }
  
  const token = createToken(user._id);
  const tokenExpiration = getTokenExpirationDate(token);
  

  res.status(200).json({
    token,
    tokenExpiration,
  });


}catch(e){
  console.log(e)
  res.status(400).json({ error: e.message });

}
}



const getUsers = async (req, res) => {
  const users = await User.find({});
  return res.status(200).json(users);
};

const get_singleUser = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ "username": username }).select({});
    if (!user) {
      return res.status(404).json({ error: "This user does not exist!" });
    }
    res.status(200).json(user);
  } catch (e) {
    return res.status(500).json({
      message: "Encountered an error!",
      state: "error",
    });
  }
};


const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;


    if(!username || !password){
      return res.status(400).json({
        message: "Please fill all fields!",
        state: "error",
      });
    }

    if(!validator.isAlphanumeric(username)){
      return res.status(400).json({
        message: "Username must be alphanumeric!",
        state: "error",
      });
    }

    if(!validator.isStrongPassword(password)){
      return res.status(400).json({
        message: "Password must be strong!",
        state: "error",
      });
    }


    const checkUser = await User.findOne({ username });

    if (checkUser) {
      return res.status(400).json({
        message: "User already exists!",
        state: "error",
      });
    }


    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      password: hashedPassword,
    });

    console.log("USER: ");
    console.log(user);

    const token = createTokenOneDay(user._id);

    console.log("TOKEN: ");
    console.log(token);

    return res.status(200).json({
      message: "User created successfully!",
      state: "success",
      id: user._id,
        username: user.username,
        image: user.image,
        token: token,
        expires: getTokenExpirationDate(token),
        rememberMe: false,
    });

  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Encountered an error!",
      state: "error",
    });
  }
};

/*
const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const checkUser = await User.findOne({ username });

    if (checkUser) {
      return res.status(400).json({
        message: "User already exists!",
        state: "error",
      });
    }

    await User.create({
      username,
      password,
    });

    return res.status(200).json({
      message: "User created successfully!",
      state: "success",
    });
  } catch (e) {
    return res.status(500).json({
      message: "Encountered an error!",
      state: "error",
    });
  }
};

*/

const loginUser = async (req, res) => {

  try {
    const { username, password, rememberMe } = req.body;

    const users = await User.findOne({ username });

    let token, tokenExpiration;

    if (!users) {
      return res
        .status(400)
        .json({ message: "user not found", state: "error" });
    }


    const match = await bcrypt.compare(password, users.password);

    if (!match) {
      return res
        .status(400)
        .json({ message: "wrong password", state: "error" });
    }

    if(rememberMe){
    token = createToken(users._id);
    tokenExpiration = getTokenExpirationDate(token);
    }else{
    token = createTokenOneDay(users._id);
    tokenExpiration = getTokenExpirationDate(token);
    }



    delete users._doc.password;
    return res
      .status(200)
      .json({
        id: users._id,
        username: users.username,
        image: users.image,
        token: token,
        expires: tokenExpiration,
        rememberMe: rememberMe,
        message: "Login successful!",
        state: "success",

      });
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      message: "Encountered an error!",
      state: "error",
    });
  }


};

const updateUserImage = async (req, res) => {
  try {
    const fileExist = req.files
    const { userId, description } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found!",
        status: "error",
      });
    }
    if (fileExist) {
      const files = fileExist.img
      const result = await cloudinary.uploader.upload(files.tempFilePath, {
        public_id: Date.now(),
        folder: "APDEV-IMAGES",
        width: 200,
        height: 200,
        crop: "fill",
        withcredentials: false,
      });

      user.image = result.secure_url;
      fs.unlink(files.tempFilePath, (err) => {
        if (err) {
          console.log("ERror deleting temp file");
        } else {
          console.log("File successfully deleted");
        }
      });
    }
    user.description = description;
    user.save();

    // multipart/form-data (EXTRA COMMENT)
    res.status(200).json({
      message: "Image successfully uploaded!",
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

// EDIT user info



const updateUserDescription = async (req, res) => {
  try {
    const { id } = req.body;
    const { description } = req.body;

    const user = await User.findOneAndUpdate({ _id: id }, { description }, {
      new: true,
    });

    console.log(id);
    console.log(user);

    if (!user) {
      return res.status(404).json({ error: "This user does not exist!" });
    }

    console.log(user);
    res.status(200).json({
      message: "Description successfully updated!",
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

const get_by_id = async (req, res) => {
  try {
    const { userID } = req.params;

    const user = await User.findOne({ _id: userID }).select({});
    if (!user) {
      return res.status(404).json({ error: "This user does not exist!" });
    }
    res.status(200).json(user);
  } catch (e) {
    return res.status(500).json({
      message: "Encountered an error!",
      state: "error",
    });
  }
}

module.exports = {
  getUsers,
  createUser,
  loginUser,
  updateUserImage,
  updateUserDescription,
  get_singleUser,
  get_by_id,
  refreshTokens,
};
