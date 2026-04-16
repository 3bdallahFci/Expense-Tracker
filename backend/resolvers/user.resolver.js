import bcrypt from "bcrypt";
import User from "../models/user.model.js";

const userResolvers = {
  Query: {
    authUser: async (_, __, context) => {
      try {
        const user = await context.getUser();
        return user;
      } catch (err) {
        console.error("Error in authUser: ", err);
        throw new Error("Internal server error");
      }
    },

    user: async (_, { userId }) => {
      try {
        const user = await User.findById(userId);
        return user;
      } catch (err) {
        console.error("Error in user query:", err);
        throw new Error(err.message || "Error getting user");
      }
    },
  },

  Mutation: {
    signUp: async (_, { input }, context) => {
      try {
        const { username, name, password, profilePicture, gender } = input;

        if (!username || !name || !password || !gender) {
          throw new Error("All fields are required");
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
          throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const boyProfilePicture =
          "https://cdn-icons-png.flaticon.com/512/147/147144.png";
        const girlProfilePicture =
          "https://cdn-icons-png.flaticon.com/512/147/147141.png";

        const newUser = new User({
          username,
          name,
          password: hashedPassword,
          profilePicture:
            gender === "male" ? boyProfilePicture : girlProfilePicture,
          gender,
        });

        await newUser.save();
        await context.login(newUser);
        return newUser;
      } catch (error) {
        console.error("Error in signUp:", error);
        throw new Error(error.message || "Internal server error");
      }
    },
    login: async (_, { input }, context) => {
      try {
        const { username, password } = input;
        if (!username || !password) {
          throw new Error("All fields are required");
        }

        const { user } = await context.authenticate("graphql-local", {
          username,
          password,
        });

        if (!user) {
          throw new Error("Invalid credentials");
        }

        await context.login(user);
        return user;
      } catch (err) {
        console.error("Error in login:", err);
        throw new Error(err.message || "Internal server error");
      }
    },
    logout: async (_, __, context) => {
      try {
        await context.logout();
        context.req.session.destroy((err) => {
          if (err) throw err;
        });
        context.res.clearCookie("connect.sid");

        return { message: "Logged out successfully" };
      } catch (err) {
        console.error("Error in logout:", err);
        throw new Error(err.message || "Internal server error");
      }
    },
  },
};

export default userResolvers;
