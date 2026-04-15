import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    description : { type: String, required: true },
    amount: { type: Number, required: true },
    paymentType: { type: String, enum: ["cash", "card"], required: true },
    category: { type: String, required: true,enum:["saving", "expense","investment"] },
    amount : { type: Number, required: true },
    date: { type: Date,required: true },
    location: { type: String,default: "Unknown" },
    }
);