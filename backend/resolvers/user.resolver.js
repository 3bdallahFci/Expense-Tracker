import { users } from '../dummyData/data.js';


const userResolvers = {
    Query: {
        users: () => {
            // Fetch users from the database
            return users;
        },
        user: (_, { _id }) => {
            // Fetch a single user by ID from the database
            return users.find((user) => user._id === _id);
        },
    },

}


export default userResolvers;