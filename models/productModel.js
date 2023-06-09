import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Provide a Name for the product"],
    },
    description: {
      type: String,
      maxLength: 200,
    },
    image: {
      type: String,
      // required: [true, "Please upload a picture for the product"],
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    subCategory: [
      {
        type: Schema.Types.ObjectId,
        ref: "subCategory",
      },
    ],
  },
  {
    collection: "products",
  }
);
productSchema.plugin(mongoosePaginate);
productSchema.pre(["find", "findOne"], function () {
  this.populate("subCategory");
});

const productModel = model("products", productSchema);

export default productModel;
