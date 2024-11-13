const axios = require('axios');
const User = require('./models/usersModel'); 



const saveUsersFromWS = async () => {
    try {
        const {data} = await axios.get('https://jsonplaceholder.typicode.com/users');
        const users = data

        const filteredUsers = users.map(user => ({
            userId: user.id,
            fullname: user.name,
            actions: 5
        }));

        await User.insertMany(filteredUsers);
        console.log("Users saved successfully!");

    } catch (error) {
        console.error("Error saving users:", error.message);
    }
};


saveUsersFromWS();
