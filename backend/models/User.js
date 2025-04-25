import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true,   },
    address: { type: String, required: true },
    apartment: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    productsPurchased: [
      {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: { type: String },
        quantity: { type: Number },
        price: { type: Number },
        imageSrc: { type: String },
      },
    ],
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
