const User = require('../models/usersModel')


//getAll
const getAllUsers = async()=>{
    return await User.find()
}
//findByEmail
const findByEmail = async (email) =>{
    try {
        return await User.findOne({email})
    }
    catch (error) {
        return "Wrong Email" + error.message 
    }
    
}

//findByUsername
const findByUsername = async (fullname) =>{
    try {
        return await User.findOne({fullname})
    }
    catch (error) {
        return "Wrong username" + error.message 
    }
}

const getById = async (userId) => {
    const user = await User.findOne({ userId: userId }); 
    return user;
};


module.exports = {getAllUsers,getById,findByEmail,findByUsername}
