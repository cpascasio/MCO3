const User = require("../models/userModels")
const Post = require("../models/postModel")
const Store = require("../models/storeModel")

const getStores = async (req, res) => {
    const stores = await Store.find({})
    return res.status(200).json(stores)
}

const get_singleStore = async (req, res) => {
  

    try{
      const { id } = req.params
  
      const store = await Store.find({ "_id": id }).select({})
    if (!store) {
        return res.status(404).json({ error: 'This store does not exist!' })
    }
    res.status(200).json(store)
  
    }catch(e){
      return res.status(500).json({
        message: "Encountered an error!",
        state: "error",
    })
  
    }
  
    
  }

const createStore = async (req, res) => {
    try {
        const { ownerID, storeName, icon, description, rating, price, priceRange, image, location, schedule, contact } = req.body

        await Store.create({
            ownerID,
            storeName,
            icon,
            description,
            rating,
            price,
            priceRange,
            image,  
            location,
            schedule,
            contact,
        })

        return res.status(200).json({
            message: "Stored successfully!",
            state: "success",
        })

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Encountered an error!",
            state: "error",
        })
    }

}

module.exports = { getStores, get_singleStore, createStore }
