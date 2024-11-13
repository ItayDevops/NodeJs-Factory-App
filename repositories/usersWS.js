const URL = 'https://jsonplaceholder.typicode.com/users'
const axios = require('axios')

//getAll
const getAllUsers = async()=>{
    const {data :users} = await axios.get(URL)
    return users
}

module.exports = {getAllUsers}
