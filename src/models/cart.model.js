import { mongoose, Schema } from "mongoose";

const CartSchema = Schema({
  products: {
    type: Array,
    required: true,
  },
});

const Cart = mongoose.model("Cart", CartSchema);

export default Cart;
