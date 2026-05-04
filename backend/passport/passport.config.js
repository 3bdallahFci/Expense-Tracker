import passport from "passport";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { GraphQLLocalStrategy } from "graphql-passport";
export const passportConfig = async() => {

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });

    passport.use(new GraphQLLocalStrategy(async (username, password, done) => {
        try {
            const user = await User.findOne({ username });
          
            if (!user) {
                return done(null, false, { message: "Invalid credentials" });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: "Invalid credentials" });
            }

            done(null, user);
        } catch (err) {
            console.error("Error in GraphQLLocalStrategy:", err);
            done(err, null);
        }
    })) ;
}
