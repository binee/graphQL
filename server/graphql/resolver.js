import Joi from "Joi";
import bcrypt from "bcrypt";
import Book from "../models/books.js";
import User from "../models/users.js";
import getAuthToken from '../utility/genAuthToken.js';

export const resolvers = {
  Query: {
    users: async () => await User.find({}),
    user:async (_,{_id})=> await User.findOne({_id}),
    books: async()=>await Book.find({}).populate("userId", "_id username"),
    userBook: async(_,{userId})=>{ console.log(userId); const book = await Book.find({userId}); return book},
    bookByID: async(_,{_id}) => await Book.findOne({_id})
  },
  User:{
    books:async (user)=>  await Book.find({userId : user._id})
},
  Mutation: {
    registerUser: async (_, { userInput }) => {
      const schema = Joi.object({
        username: Joi.string().min(3).max(30).required(),
        email: Joi.string().min(6).max(30).required().email(),
        password: Joi.string().min(6).max(15).required(),
      });
      const { error } = schema.validate(userInput);
      if (error) throw new Error(`Error in creating New User ${error.details[0].message}` );
      let user = await User.findOne({ email: userInput.email });
      if (user) {
        throw new Error("User already exists with that email");
      }
      const newUser = new User({
        ...userInput,
        password: await bcrypt.hash(userInput.password, 10),
      });
      console.log(newUser)
      return await newUser.save();
    },

    loginUser: async(_, {userSignin}) => {
      const schema = Joi.object({
        email: Joi.string().min(6).max(30).required().email(),
        password: Joi.string().min(6).max(15).required(),
      });
      const { error } = schema.validate(userSignin);
      if (error) throw new Error(`Error in Login` );
      let user = await User.findOne({ email: userSignin.email });
      console.log(user);
      if (!user) {
        throw new Error("Invalid User");
      }
      const isMatchBcrypt = await bcrypt.compare(userSignin.password,user.password);
      if(!isMatchBcrypt){
        throw new Error("Invalid Password");
      }
      const token = getAuthToken(user);
      //console.log(user , token)
      return {token, user};
    },

    createBook: async(_,{bookInput},{userId}) => {
      const schema = Joi.object({
        bookName: Joi.string().min(6).max(70).required(),
        description: Joi.string().max(300).required(),
        userId: Joi.required()
      });
      const { error } = schema.validate(bookInput);
      // if(!userId){
      //   throw new Error("You must be logged in. Please Log in")  
      // }
      if (error) throw new Error(`Error in Book Creating ${error.details[0].message}` );
      const newBook = new Bok({
        ...bookInput,
      });
      console.log(newBook)
     return await newBook.save();
    },

    /**
     * Update the Book
     * @param {*} _id
     * @param {*} input 
     * @returns  updated Record
     */

    updateBook: async(_, { _id, input }) => { 
      const schema = Joi.object({
        bookName: Joi.string().min(6).max(70).required(),
        description: Joi.string().max(300).required(),
      });
      const { error } = schema.validate(input);
      if (error) throw new Error(`Error in Book Updating ${error.details[0].message}` );
      const updatedInfo = await Book.findOneAndUpdate(
        { _id:_id },
        {bookName: input.bookName, description: input.description },  
        { new: true}
      );
      console.log(updatedInfo)
      return updatedInfo;
    },

    deleteBook : async(_, {_id}) => {
      console.log(_id, 'hsdjashdjhgsadhs')
      if(!_id){
        throw new Error("ID missing")  
      }
      const deletedStudent = await Book.findByIdAndDelete({ _id: _id });
      console.log(deletedStudent)
      if (!deletedStudent) {
        throw new Error(`Student with ID ${id} not found`);
      }
      return deletedStudent;
    }
  },
};
