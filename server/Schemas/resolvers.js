const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User, BookInput } = require('../models');


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({_id: context.user._id})
                    .select('-__v -password')
                    .populate('savedBooks');
                return userData;
            }
            throw new AuthenticationError("Not Logged in")
        },
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user};
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError("Failed to loggin, incorrect username or password")
            }
            const passwordData = await user.isCorrectPassword(password);

            if (!passwordData) {
                throw new AuthenticationError("Failed to loggin, incorrect username or password")
            }
            const token = signToken(user);
            return { token, user};
        },
        saveBook: async (parent, args, context) => {
            if (context.user) {
                const updateUser = await User.findOneAndUpdate (
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: args.input }},
                    { new: true }
                )
                .populate('savedBooks')
                return updateUser;
            }
            throw new AuthenticationError("Not Logged in");
        },
        removeBook: async ( parent, args, context ) => {
            if (context.user) {
                const updateUser = await User.findOneAndUpdate (
                    { _id: context.user._id },
                    { $pull: { savedBooks:{ bookId: args.bookId }}},
                    { new: true }
                )
                .populate('savedBooks')
                return updateUser;
            }
            throw new AuthenticationError("Not Logged in");
        }
    }
};

module.exports = resolvers;