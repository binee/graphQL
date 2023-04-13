import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    bookName: {
      type: String,
      trim: true,
      require: true,
    },
    description: {
      type: String,
      trim: true,
      require: true,

    },
    userId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  { timestamps: true }
);

 const Book = mongoose.model("book", bookSchema);
 export default Book;
 